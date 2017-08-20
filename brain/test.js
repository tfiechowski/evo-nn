const synaptic = require('synaptic'); // this line is not needed in the browser
const EvoSynaptic = require('./evo-synaptic');
const Neuron = synaptic.Neuron,
  Layer = synaptic.Layer,
  Network = synaptic.Network,
  Trainer = synaptic.Trainer,
  Architect = synaptic.Architect;

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

const es = new EvoSynaptic(10, myNetwork, 0.4, 0.2);

console.log(es.activate(0, [200, 105, 46, 50, 13]));

es.train(500, output => Number.MAX_SAFE_INTEGER - (output[0] + output[1]), [
  200,
  105,
  46,
  50,
  13,
]);

console.log(es.activate(0, [200, 105, 46, 50, 13]));
// for (let i = 0; i < 200; i++) {
//   for (let j = 0; j < 10; j++) {
//     const nnresult = es.activate(j, [200, 105, 46, 50, 13]);
//     const score = Number.MAX_SAFE_INTEGER - (nnresult[0] + nnresult[1]);
//     es.genomes[j].setScore(score);
//   }
//   es.createNewGeneration();
// }

// console.log(es.activate(0, [1, 1]));
