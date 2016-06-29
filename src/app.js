var React = require('react');
var ReactDOM = require('react-dom');
var Editor = require('./editor');
var EditorWithTests = require('./editorWithTests')(Editor);
var Feedback = require('./feedback');

var App = React.createClass({
  getInitialState: function() {
    return {
      feedback: [],
      blacklist: ['IfStatement'],
      whitelist: ['ForStatement', 'WhileStatement', 'VariableDeclaration'],
      structure: 'function _(_) { while(_) { return true; } }'
    };
  },
  updateFeedback: function(feedback) {
    this.setState({
      feedback
    }); 
  },
  render: function() {  
    return (
      <div className='editor'>
        <EditorWithTests onMessage={this.updateFeedback} {...this.state} />
        <Feedback feedback={this.state.feedback} />
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));