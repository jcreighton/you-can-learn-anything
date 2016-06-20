var React = require('react');
var ReactDOM = require('react-dom');
var Codemirror = require('react-codemirror');
require('codemirror/mode/javascript/javascript');

var App = React.createClass({
  getInitialState: function() {
    return {
      code: '// Code'
    };
  },
  componentDidMount: function() {
    this.a = new Worker('worker.js');
    this.a.onmessage = (b) => {
      console.log('PARSED: ', Date.now(), JSON.parse(b.data))
      this.setState({
        feedback: b.data
      });
    };
  },
  updateCode: function(newCode) {
    console.log('NEW CODE: ', newCode, JSON.stringify(newCode));
    this.a.postMessage(newCode);
    this.setState({
      code: newCode,
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