var React = require('react');
var ReactDOM = require('react-dom');
var Editor = require('./editor');
var Feedback = require('./feedback');

var App = React.createClass({
  getInitialState: function() {
    return {
      code: '// Let\'s build something new!',
      feedback: [],
      blacklist: ['WhileStatement', 'IfStatement'],
      whitelist: ['ForStatement', 'VariableDeclaration'],
      structure: null
    };
  },
  updateFeedback: function(feedback) {
    console.log('FEEDBACK: ', feedback);
    this.setState({
      feedback: feedback
    }); 
  },
  render: function() {  
    return (
      <div className='editor'>
        <Editor onMessage={this.updateFeedback} {...this.state} />
        <Feedback feedback={this.state.feedback} />
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));