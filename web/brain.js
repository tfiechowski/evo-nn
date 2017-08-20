class Brain {
  newSession() {
    return $.ajax('http://localhost:3000/new-session', {
      contentType: 'application/json',
      type: 'POST',
    });
  }

  processInputs(inputs) {
    return $.ajax('http://localhost:3000/activate', {
      data: JSON.stringify({ data: inputs }),
      contentType: 'application/json',
      type: 'POST',
    });
  }

  nextGenome(score) {
    return $.ajax('http://localhost:3000/next-genome', {
      data: JSON.stringify({ score }),
      contentType: 'application/json',
      type: 'POST',
    });
  }
}

module.exports = Brain;
