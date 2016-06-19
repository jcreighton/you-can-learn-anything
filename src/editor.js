var React = require('react');
var ReactDOM = require('react-dom');
var Codemirror = require('react-codemirror');
var esprima = require('esprima');
require('codemirror/mode/javascript/javascript');

var App = React.createClass({
  getInitialState: function() {
    return {
      code: '// Code'
    };
  },
  updateCode: function(newCode) {
    console.log(esprima.parse(newCode));
    console.log(esprima.tokenize(newCode));
    this.setState({
      code: newCode,
      feedback: 'Feedback'
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
        <div className='feedback'>{this.state.feedback}</div>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));