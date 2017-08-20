const math = require('mathjs');
const synaptic = require('synaptic'); // this line is not needed in the browser
const Network = synaptic.Network;

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

    this.network = Network.fromJSON(_net);
  }

  randomizeWeights() {
    const _net = this.network.toJSON();

    for (const i in _net.connections) {
      _net.connections[i].weight = Math.random();

      // if (Math.random() < this.mutationChance) {
      //   _net.connections[i].weight += this.getMutationValue() * gain;

      //   if (_net.connections[i].weight < 0) {
      //     _net.connections[i].weight = 0;
      //   } else if (_net.connections[i].weight > 1) {
      //     _net.connections[i].weight = 1;
      //   }
      // }
    }

    this.network = Network.fromJSON(_net);
  }

  activate(input) {
    return this.network.activate(input);
  }

  getMutationValue() {
    // Gain is bounded to <0.8, 1.2>
    const gain = 0.8 + Math.random() / 2.5;
    return (Math.random() > 0.5 ? -1 : 1) * gain * this.mutationStrength;
  }

  getWeights() {
    const _net = this.network.toJSON();
    return _net.connections.map(c => c.weight);
  }
}

class EvoSynaptic {
  constructor(genomeNumber, network, mutationChance, mutationStrength) {
    this.genomeNumber = genomeNumber;
    this.networkPrototype = network;
    this.mutationChance = mutationChance;
    this.mutationStrength = mutationStrength;
    this.genomesToCrossover = 2;

    this.genomes = [];
    for (let i = 0; i < genomeNumber; i++) {
      this.genomes.push(
        new Genome(network, 0, this.mutationChance, this.mutationStrength)
      );
    }
    this.mutateAllGenomes(4);
  }

  randomizeAllGenomes() {
    for (const i in this.genomes) {
      this.genomes[i].randomizeWeights();
    }
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
    this.addGenomes(bestGenomes);
    this.addGenomes(crossedOverGenomes);

    this.createMutatedGenomes(crossedOverGenomes);
  }

  crossOverGenomes(genomeList) {
    const createGenome = network =>
      new Genome(
        Network.fromJSON(network),
        0,
        this.mutationChance,
        this.mutationStrength
      );

    const crossoverType = 'BREAKING_POINT';

    if (crossoverType === 'BREAKING_POINT') {
      const parents = [
        genomeList[0].network.toJSON(),
        genomeList[1].network.toJSON(),
      ];

      const children = [
        genomeList[0].network.toJSON(),
        genomeList[1].network.toJSON(),
      ];

      const connectionsAmount = parents[0].connections.length;
      const breakingPoint = getRandomNum(0, connectionsAmount);

      for (let i = 0; i < connectionsAmount; i++) {
        if (i < breakingPoint) {
          children[0].connections[i].weight = parents[0].connections[i].weight;
          children[1].connections[i].weight = parents[1].connections[i].weight;
        } else {
          children[0].connections[i].weight = parents[1].connections[i].weight;
          children[1].connections[i].weight = parents[0].connections[i].weight;
        }
      }

      return children.map(child => createGenome(child));
    } else {
      const p1 = genomeList[0].network.toJSON();
      const p2 = genomeList[1].network.toJSON();

      const c1 = genomeList[0].network.toJSON();
      const c2 = genomeList[1].network.toJSON();

      // Randomly mixing connection weights
      for (let i = 0; i < p1.connections.length; i++) {
        if (Math.random() < 0.5) {
          c1.connections[i].weight = p1.connections[i].weight;
          c2.connections[i].weight = p2.connections[i].weight;
        } else {
          c1.connections[i].weight = p2.connections[i].weight;
          c2.connections[i].weight = p1.connections[i].weight;
        }
      }

      return [createGenome(c1), createGenome(c2)];
    }
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
      (this.genomeNumber - this.genomesToCrossover * 2) / 2
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

  printGenomes() {
    let i = 0;
    console.log('\tGenomes:');
    for (const genome of this.genomes) {
      const weights = genome.getWeights();
      const stdDev = math.std(weights).toFixed(8);
      const avg = math.mean(weights).toFixed(8);
      const median = math.median(weights).toFixed(8);
      console.log(`\tGenome ${i}:   (${avg},\t${median},\t${stdDev})`);
      i += 1;
    }
  }

  getGenome(genomeIndex) {
    return this.genomes[genomeIndex];
  }

  getRandom() {
    return Math.random();
  }

  activate(genomeIndex, input) {
    if (this.genomes[genomeIndex] !== undefined) {
      return this.genomes[genomeIndex].activate(input);
    } else {
      console.log(`Undefined genome for ${genomeIndex} genome index`);
      return 0;
    }
  }

  train(generations, scoreEvaluatingFunction, input) {
    process.stdout.write('Progress: ');
    for (let i = 0; i < generations; i++) {
      const percent = i / generations * 100;
      if (percent !== 0 && percent % 10 === 0) {
        process.stdout.write('.');
      }

      for (let j = 0; j < this.genomeNumber; j++) {
        const output = this.activate(j, input);
        const score = scoreEvaluatingFunction(output);

        this.setGenomeScore(j, score);
      }
      this.createNewGeneration();
    }

    process.stdout.write(' finished!\n');
  }
}

module.exports = EvoSynaptic;
