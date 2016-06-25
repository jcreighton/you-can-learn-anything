var Test = function (options) {
  this.worker = new Worker('worker.js');

  this.whitelist = options.whitelist;
  this.blacklist = options.blacklist;
  this.structure = options.structure;
};

Test.prototype.postMessage = function(message) {
  this.worker.postMessage(message);
};

Test.prototype.onmessage = function(callback) {
  return this.worker.onmessage = function(message) {
    var data = JSON.parse(message.data);
    var feedback = this.feedback(data.AST, data.types);
    callback(feedback);
  }.bind(this);
};

Test.prototype.structure = function() {
  console.log('structure');
};

Test.prototype.blacklist = function(list) {
  console.log('backlist');
};

Test.prototype.feedback = function(AST, types) {
  var feedback = [];

  var keys = Object.keys(types);
  keys.forEach(function(key) {
    if (this.blacklist.indexOf(key) >= 0) {
      feedback.push({error: key});
    }

    if (this.whitelist.indexOf(key) >= 0) {
      feedback.push({valid: key});
    }
  }, this);

  return feedback;
};

Test.prototype.terminate = function() {
  // Terminate worker
};

module.exports = Test;