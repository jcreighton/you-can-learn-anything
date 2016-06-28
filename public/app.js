/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(3);
	var Editor = __webpack_require__(4);
	var EditorWithTests = __webpack_require__(7)(Editor);
	var Feedback = __webpack_require__(8);

	var App = React.createClass({
	  displayName: 'App',

	  getInitialState: function getInitialState() {
	    return {
	      feedback: [],
	      blacklist: ['IfStatement'],
	      whitelist: ['ForStatement', 'WhileStatement', 'VariableDeclaration'],
	      structure: 'while (_) { if (_) {} }'
	    };
	  },
	  updateFeedback: function updateFeedback(feedback) {
	    this.setState({
	      feedback: feedback
	    });
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'editor' },
	      React.createElement(EditorWithTests, _extends({ onMessage: this.updateFeedback }, this.state)),
	      React.createElement(Feedback, { feedback: this.state.feedback })
	    );
	  }
	});

	ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var Codemirror = __webpack_require__(5);
	__webpack_require__(6);

	var Editor = React.createClass({
	  displayName: 'Editor',

	  render: function render() {
	    var options = {
	      lineNumbers: true,
	      theme: 'base16-light'
	    };

	    return React.createElement(Codemirror, { mode: 'javascript', value: this.props.code, onChange: this.props.onChange, options: options });
	  }
	});

	module.exports = Editor;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-codemirror");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("codemirror/mode/javascript/javascript");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);

	function editorWithTests(Editor) {
	  return React.createClass({
	    getInitialState: function getInitialState() {
	      return {
	        code: '// Let\'s build something new!'
	      };
	    },
	    getDefaultProps: function getDefaultProps() {
	      return {
	        whitelist: [],
	        blacklist: [],
	        structure: null
	      };
	    },
	    componentDidMount: function componentDidMount() {
	      this.startWorker();
	    },
	    startWorker: function startWorker() {
	      var _this = this;

	      this.worker = new Worker('worker.js');

	      this.worker.onmessage = function (message) {
	        var data = JSON.parse(message.data);
	        var feedback = data.feedback;
	        console.log('FEEDBACK: ', feedback);
	        _this.props.onMessage(feedback);
	      };
	    },
	    terminateWorker: function terminateWorker() {
	      this.worker.terminate();
	    },
	    postMessage: function postMessage(message) {
	      this.worker.postMessage(message);
	    },
	    updateCode: function updateCode(code) {
	      var _props = this.props;
	      var blacklist = _props.blacklist;
	      var whitelist = _props.whitelist;
	      var structure = _props.structure;


	      this.postMessage({
	        code: code,
	        blacklist: blacklist,
	        whitelist: whitelist,
	        structure: structure
	      });

	      console.log('WWWWHHHAAATTT', structure);

	      this.setState({
	        code: code
	      });
	    },
	    render: function render() {
	      console.log(this.props.structure);
	      return React.createElement(Editor, _extends({ onChange: this.updateCode }, this.props, this.state));
	    }
	  });
	}

	module.exports = editorWithTests;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);

	var Feedback = React.createClass({
	  displayName: "Feedback",

	  render: function render() {
	    var emoji = {
	      valid: React.createElement("i", { className: "em em-ok_hand" }),
	      error: React.createElement("i", { className: "em em-open_mouth" }),
	      structure: React.createElement("i", { className: "em em-muscle" })
	    };

	    return React.createElement(
	      "ul",
	      { className: "feedback" },
	      this.props.feedback.map(function (feedback, i) {
	        var key = Object.keys(feedback);
	        return React.createElement(
	          "li",
	          { className: key, key: i },
	          emoji[key],
	          feedback[key]
	        );
	      })
	    );
	  }
	});

	module.exports = Feedback;

/***/ }
/******/ ]);