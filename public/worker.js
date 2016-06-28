importScripts('esprima.js', 'walk.js'); 

self.addEventListener('message', function(message) {
  var data = message.data;
  var whitelist = data.whitelist;
  var blacklist = data.blacklist;
  var structure = esprima.parse(data.structure);
  var code = esprima.parse(data.code);
  var types = {};
  var feedback = [{structure: structure.body[0].type}];



  walk(code, function(node) {
    var type = node.type;
    if (!types.hasOwnProperty(type)) {
      types[type] = true;
    } 

    if (type === structure.body[0].type) {
      walkStructure();
      feedback.push({structure: 
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

  // Check structure

  var output = {
    feedback: feedback
  };

  self.postMessage(JSON.stringify(output));
}, false);