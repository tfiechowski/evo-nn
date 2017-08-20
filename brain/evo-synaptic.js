const synaptic = require('synaptic'); // this line is not needed in the browser
const Network = synaptic.Network;

class Genome {
  constructor(network, score, mutationChance, mutationStrength) {
    this.network = Network.fromJSON(network.toJSON());
    this.score = score;
    this.mutationStrength = mutationStrength;
    this.mutationChance = mutationChance;
  }

  setScore(score) {
    this.score = score;
  }

  toJSON() {
    return Object.assign({}, this, {
      network: this.network.toJSON(),
      score: this['score'],
    });
  }

  mutate(gain = 1) {
    const _net = this.network.toJSON();

    for (const i in _net.connections) {
      if (Math.random() < this.mutationChance) {
        _net.connections[i].weight += this.getMutationValue() * gain;

        if (_net.connections[i].weight < 0) {
          _net.connections[i].weight = 0;
        } else if (_net.connections[i].weight > 1) {
          _net.connections[i].weight = 1;
        }
      }
    }

    this.network = null;
    this.network = Network.fromJSON(_net);
  }

  activate(input) {
    return this.network.activate(input);
  }

  getMutationValue() {
    return (
      (Math.random() > 0.5 ? -1 : 1) * Math.random() * this.mutationStrength
    );
  }
}

class EvoSynaptic {
  constructor(genomeNumber, network, mutationChance, mutationStrength) {
    this.genomeNumber = genomeNumber;
    this.networkPrototype = network;
    this.mutationChance = mutationChance;
    this.mutationStrength = mutationStrength;

    this.genomes = [];
    for (let i = 0; i < genomeNumber; i++) {
      this.genomes.push(
        new Genome(network, 0, this.mutationChance, this.mutationStrength)
      );
    }
    this.mutateAllGenomes(3);

    this.genomesToCrossover = 2;
  }

  mutateAllGenomes(gain = 1) {
    for (const i in this.genomes) {
      this.genomes[i].mutate(gain);
    }
  }

  createNewGeneration() {
    // Creating a new generation is about choosing the
    // best genomes from current generation, crossing
    // them over and creating the rest of genomes by
    // mutating them.

    const bestGenomes = this.getBestGenomes();
    const crossedOverGenomes = this.crossOverGenomes(bestGenomes);
    this.emptyGenomeList();
    this.addGenomes(crossedOverGenomes);

    this.createMutatedGenomes(crossedOverGenomes);
  }

  crossOverGenomes(genomeList) {
    const p1 = genomeList[0].network.toJSON();
    const p2 = genomeList[1].network.toJSON();

    const c1 = genomeList[0].network.toJSON();
    const c2 = genomeList[0].network.toJSON();

    // Randomly mixing connection weights
    for (let i = 0; i < p1.connections; i++) {
      if (Math.random() < 0.5) {
        c1.connections[i] = p1.connections[i];
        c2.connections[i] = p2.connections[i];
      } else {
        c1.connections[i] = p2.connections[i];
        c2.connections[i] = p1.connections[i];
      }
    }

    return [
      new Genome(
        Network.fromJSON(c1),
        0,
        this.mutationChance,
        this.mutationStrength
      ),
      new Genome(
        Network.fromJSON(c2),
        0,
        this.mutationChance,
        this.mutationStrength
      ),
    ];
  }

  removeGenome(ID) {
    this.genomes = this.genomes.filter(genome => genome.ID !== ID);
  }

  filterGenomes(genomesToKeep) {
    this.genomes = this.genomes.filter(
      (genome, index) => genomesToKeep.indexOf(index) !== -1
    );
  }

  createMutatedGenomes(crossedOverGenomes) {
    const genomesToCreate = Math.floor(
      (this.genomeNumber - this.genomesToCrossover) / 2
    );

    for (let i = 0; i < this.genomesToCrossover; i++) {
      for (let j = 0; j < genomesToCreate; j++) {
        const newGenome = new Genome(
          Network.fromJSON(crossedOverGenomes[i].network.toJSON()),
          0,
          this.mutationChance,
          this.mutationStrength
        );
        newGenome.mutate();
        this.addGenomes([newGenome]);
      }
    }
  }

  setGenomeScore(genomeIndex, score) {
    this.genomes[genomeIndex].setScore(score);
  }

  getBestGenomes() {
    return this.genomes
      .sort((a, b) => a.score < b.score)
      .slice(0, this.genomesToCrossover);
  }

  emptyGenomeList() {
    while (this.genomes.length > 0) {
      this.genomes.pop();
    }
  }

  addGenomes(genomes) {
    for (const genome of genomes) {
      this.genomes.push(genome);
    }
  }

  printNeuronWeights() {
    for (const genome of this.genomes) {
      for (const neuron of genome.network.neurons()) {
        if (neuron.neuron.connections.inputs !== undefined) {
          const inputs = neuron.neuron.connections.inputs;
          for (const id in inputs) {
            console.log('Weight: ', inputs[id].weight);
          }
        }
      }
    }
  }

  getGenome(genomeIndex) {
    return this.genomes[genomeIndex];
  }

  getRandom() {
    return Math.random();
  }

  activate(genomeIndex, input) {
    return this.genomes[genomeIndex].activate(input);
  }
}

module.exports = EvoSynaptic;
