const Sequelize = require('sequelize');
const sequelize = new Sequelize('evonn', 'mysql', 'mysql', {
  dialect: 'mysql',
  logging: false,
});

const Session = sequelize.define('session', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
});

const Generation = sequelize.define('generation', {
  number: Sequelize.INTEGER,
  maxScore: Sequelize.FLOAT,
  avgScore: Sequelize.FLOAT,
  medianScore: Sequelize.FLOAT,
  stdDevScore: Sequelize.FLOAT,
});

Generation.belongsTo(Session);

const Genome = sequelize.define('genome', {
  score: Sequelize.FLOAT,
  mutationStrength: Sequelize.FLOAT,
  mutationChance: Sequelize.FLOAT,
  network: Sequelize.JSON,
});

Genome.belongsTo(Generation);

module.exports = {
  init: () => sequelize.sync(),
  Session,
  Generation,
  Genome,
};
