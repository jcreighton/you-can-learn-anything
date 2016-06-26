var React = require('react');
var Codemirror = require('react-codemirror');
require('codemirror/mode/javascript/javascript');

var Editor = React.createClass({
  render: function() {
    var options = {
      lineNumbers: true,
      theme: 'base16-light'
    };

    return (
      <Codemirror mode='javascript' value={this.props.code} onChange={this.props.onChange} options={options} />
    );
  }
});

module.exports = Editor;