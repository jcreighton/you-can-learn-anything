importScripts('esprima.js', 'walk.js'); 

self.addEventListener('message', function(code) {
  var AST = esprima.parse(code.data);

  var types = {};
  walk(AST, function(node) {
    var type = node.type;
    if (!types.hasOwnProperty(type)) {
      types[type] = true;
    } 
  });

  var output = {
    AST: AST,
    types: types
  };

  self.postMessage(JSON.stringify(output));
}, false);