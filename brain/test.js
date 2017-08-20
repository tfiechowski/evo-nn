const synaptic = require('synaptic'); // this line is not needed in the browser
const EvoSynaptic = require('./evo-synaptic');
const Neuron = synaptic.Neuron,
  Layer = synaptic.Layer,
  Network = synaptic.Network,
  Trainer = synaptic.Trainer,
  Architect = synaptic.Architect;

const inputLayer = new Layer(2);
const hiddenLayer = new Layer(4);
const outputLayer = new Layer(2);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

const myNetwork = new Network({
  input: inputLayer,
  hidden: [hiddenLayer],
  output: outputLayer,
});

const es = new EvoSynaptic(10, myNetwork, 0.4, 0.2);
console.log(es.activate(0, [1, 1]));
for (let i = 0; i < 200; i++) {
  es.mutateAllGenomes();

  for (let j = 0; j < 10; j++) {
    const nnresult = es.activate(j, [1, 1]);
    const score = nnresult[0] + nnresult[1];
    es.genomes[j].setScore(score);
  }

  es.createNewGeneration();
}

console.log(es.activate(0, [1, 1]));
