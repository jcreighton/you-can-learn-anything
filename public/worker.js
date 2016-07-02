importScripts('esprima.js', 'walk.js'); 

var structure = [];

self.addEventListener('message', function(message) {
  var data = message.data;
  var whitelist = data.whitelist;
  var blacklist = data.blacklist;
  var code = esprima.parse(data.code);
  console.log('am i working? ', message);

  if (structure.length <= 0) {
    walk(esprima.parse(data.structure), function(node) {
      var type = node.type;
      if (type) {
        structure.push(type);
      } 
    });

    structure.shift();
  }

  var types = {};
  var feedback = [];
  walk(code, function(node) {
    var type = node.type;
    if (!types.hasOwnProperty(type)) {
      types[type] = true;
    } 

    if (type === structure[0]) {
      var isCorrectStructure = walkStructure(node, structure);
      if (isCorrectStructure) {
        feedback.push({structure: 'CorrectStructure'});
      }
    }
  });

  var keys = Object.keys(types);
  keys.forEach(function(key) {
    if (blacklist.indexOf(key) >= 0) {
      feedback.push({error: key});
    }

    if (whitelist.indexOf(key) >= 0) {
      feedback.push({valid: key});
    }
  }, this);


  var output = {
    feedback: feedback
  };

  self.postMessage(JSON.stringify(output));
}, false);