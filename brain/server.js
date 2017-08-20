const express = require('express');
const math = require('mathjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const synaptic = require('synaptic'); // this line is not needed in the browser
const EvoSynaptic = require('./evo-synaptic');
const DB = require('./db');

const useDb = true;

const Neuron = synaptic.Neuron,
  Layer = synaptic.Layer,
  Network = synaptic.Network,
  Trainer = synaptic.Trainer,
  Architect = synaptic.Architect;

// ----- Server settings
const app = express();
app.use(cors());
app.use(bodyParser.json());

// ----- Setting up neural network
const generateNetwork = () => {
  const inputLayer = new Layer(5);
  const hiddenLayer1 = new Layer(7);
  const hiddenLayer2 = new Layer(7);
  const hiddenLayer3 = new Layer(7);
  const outputLayer = new Layer(2);

  inputLayer.project(hiddenLayer1);
  hiddenLayer1.project(hiddenLayer2);
  hiddenLayer2.project(hiddenLayer3);
  hiddenLayer3.project(outputLayer);

  const myNetwork = new Network({
    input: inputLayer,
    hidden: [hiddenLayer1, hiddenLayer2, hiddenLayer3],
    output: outputLayer,
  });

  return myNetwork;
};

// ----- Setting up evolutionary network

let es;
const genomeNumbers = 10;

let genomeCounter = 0;
let generationCounter = 1;

let currentSession;
let currentGeneration;

const saveGeneration = async () => {
  const genomeScores = es.genomes.map(genome => genome.score);
  const maxScore = math.max(genomeScores);
  const avgScore = math.mean(genomeScores);
  const medianScore = math.median(genomeScores);
  const stdDevScore = math.std(genomeScores);

  currentGeneration = await DB.Generation.create({
    sessionId: currentSession.id,
    number: generationCounter,
    maxScore,
    avgScore,
    medianScore,
    stdDevScore,
  });

  for (const genome of es.genomes) {
    await DB.Genome.create(
      Object.assign(genome.toJSON(), {
        generationId: currentGeneration.id,
      })
    );
  }

  console.log(
    '\tStats:',
    [maxScore, avgScore, medianScore, stdDevScore],
    '\t',
    genomeScores.join(', ')
  );
};

// ----- Server routes

// Initiating new run
app.post('/new-session', async (req, res) => {
  console.log('# Starting a new session.');
  if (useDb) {
    currentSession = await DB.Session.create();
    console.log('\tSessionID: ', currentSession.id);
  }

  es = new EvoSynaptic(genomeNumbers, generateNetwork(), 0.1, 0.05);

  genomeCounter = 0;
  generationCounter = 1;

  console.log(' |> Creating generation: ', generationCounter);
  es.printGenomes();

  res.send(true);
});

// Getting the data in real time
app.post('/activate', (req, res) => {
  // Normalization of inputs
  const normalizationValues = [200, 105, 46, 50, 13];
  const inputs = req.body.data.map(
    (input, index) => input / normalizationValues[index]
  );
  // console.log('inputs ', inputs.map(input => input.toFixed(8)).join(', '));

  res.send(es.activate(genomeCounter, inputs) || JSON.stringify(false));
});

app.post('/next-genome', async (req, res) => {
  // Switch to next genome, restart the game
  es.setGenomeScore(genomeCounter, req.body.score);

  genomeCounter += 1;

  if (genomeCounter >= genomeNumbers) {
    await saveGeneration();

    genomeCounter = 0;
    es.createNewGeneration();
    generationCounter += 1;
    console.log(' |> Creating generation: ', generationCounter);
    es.printGenomes();
  }

  res.send(true);
});

if (useDb) {
  DB.init().then(() => {
    app.listen(3000, async () => {
      console.log('# EvoNN listening on port 3000');

      const numSessions = await DB.Session.count();
      console.log('Sessions to date: ', numSessions);
    });
  });
} else {
  app.listen(3000, () => {
    console.log('# EvoNN listening on port 3000');
  });
}
