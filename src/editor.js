var React = require('react');
var Codemirror = require('react-codemirror');
require('codemirror/mode/javascript/javascript');
var Test = require('./test');

var Editor = React.createClass({
  getInitialState: function() {
    return {
      code: '// Let\'s build something new!'
    };
  },
  componentDidMount: function() {
    this.test = new Test({
      blacklist: this.props.blacklist,
      whitelist: this.props.whitelist,
      structure: this.props.structure
    });

    this.test.onmessage((feedback) => { 
      this.props.onMessage(feedback);
    });
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
      <Codemirror mode='javascript' value={this.state.code} onChange={this.updateCode} options={options} />
    );
  }
});

module.exports = Editor;