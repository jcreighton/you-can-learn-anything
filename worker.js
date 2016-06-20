importScripts('esprima.js'); 

self.addEventListener('message', function(code) {
  var parsedCode = esprima.parse(code.data);
  self.postMessage(JSON.stringify(parsedCode));
}, false);