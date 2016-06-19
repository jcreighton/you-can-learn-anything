importScripts('esprima.js'); 

self.addEventListener('message', function(e) {
  
  self.postMessage(JSON.stringify(esprima.parse('var a = 2;')));
}, false);