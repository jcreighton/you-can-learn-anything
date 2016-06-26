importScripts('esprima.js', 'walk.js'); 

self.addEventListener('message', function(message) {
  var data = message.data;
  var whitelist = data.whitelist;
  var blacklist = data.blacklist;
  var structure = data.structure;
  var AST = esprima.parse(data.code);

  var types = {};
  walk(AST, function(node) {
    var type = node.type;
    if (!types.hasOwnProperty(type)) {
      types[type] = true;
    } 
  });

  var feedback = [];
  var keys = Object.keys(types);
  keys.forEach(function(key) {
    if (blacklist.indexOf(key) >= 0) {
      feedback.push({error: key});
    }

    if (whitelist.indexOf(key) >= 0) {
      feedback.push({valid: key});
    }
  }, this);

  // check structure

  var output = {
    feedback: feedback
  };

  self.postMessage(JSON.stringify(output));
}, false);