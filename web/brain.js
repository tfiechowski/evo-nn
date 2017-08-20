const IP = 'http://192.168.0.11:3000';

class Brain {
  newSession() {
    return $.ajax(`${IP}/new-session`, {
      contentType: 'application/json',
      type: 'POST',
    });
  }

  processInputs(inputs) {
    return $.ajax(`${IP}/activate`, {
      data: JSON.stringify({ data: inputs }),
      contentType: 'application/json',
      type: 'POST',
    });
  }

  nextGenome(score) {
    return $.ajax(`${IP}/next-genome`, {
      data: JSON.stringify({ score }),
      contentType: 'application/json',
      type: 'POST',
    });
  }
}

module.exports = Brain;
