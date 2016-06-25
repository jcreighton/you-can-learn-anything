var React = require('react');
var ReactDOM = require('react-dom');
var Codemirror = require('react-codemirror');
var Feedback = require('./feedback');
require('codemirror/mode/javascript/javascript');

var App = React.createClass({
  getInitialState: function() {
    return {
      code: '// Code',
      feedback: []
    };
  },
  componentDidMount: function() {
    this.test = new Test({
      blacklist: ['WhileStatement', 'IfStatement'],
      whitelist: ['ForStatement', 'VariableDeclaration'],
      structure: null
    });

    this.test.onmessage(function(feedback) { 
      this.setState({
        feedback: feedback
      }); 
    }.bind(this));
  },
  updateCode: function(code) {
    this.test.postMessage(code);
    this.setState({
      code: code
    });
  },
  render: function() {
    var options = {
      lineNumbers: true,
      theme: 'base16-light'
    };
    return (
      <div className='editor'>
        <Codemirror mode='javascript' value={this.state.code} onChange={this.updateCode} options={options} />
        <Feedback feedback={this.state.feedback} />
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));