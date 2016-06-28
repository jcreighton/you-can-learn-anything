importScripts('esprima.js', 'walk.js'); 

self.addEventListener('message', function(message) {
  var data = message.data;
  var whitelist = data.whitelist;
  var blacklist = data.blacklist;
  var structure = esprima.parse(data.structure);
  var code = esprima.parse(data.code);
  var types = {};
  var feedback = [{structure: structure.body[0].type}];

  var types2 = {};
  walk(structure.body[0], function(node) {
    var type = node.type;
    if (!types2.hasOwnProperty(type)) {
      types2[type] = true;
    } 
  });

  feedback.push({structure: Object.keys(types2)});

  walk(code, function(node) {
    var type = node.type;
    if (!types.hasOwnProperty(type)) {
      types[type] = true;
    } 

    if (type === structure.body[0].type) {
      checkStructure(node);
    }
  });

  function checkStructure(node, structureTypes) {
    var nodeTypes = {};
    walk(node, function(node) {
      var type = node.type;
      if (!nodeTypes.hasOwnProperty(type)) {
        nodeTypes[type] = true;
      } 
    });

    var nodeStructure = Object.keys(nodeTypes).join();

    if () {

    }

    feedback.push({structure: Object.keys(types3).join() === Object.keys(types2).join() ? 'YAYS' : 'NO'});
  }

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