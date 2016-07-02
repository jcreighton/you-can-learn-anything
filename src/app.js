var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Editor = require('./editor');
var EditorWithTests = require('./editorWithTests')(Editor);
var Feedback = require('./feedback');
var OptionsBar = require('./optionsBar');

var App = React.createClass({
  getInitialState: function() {
    return {
      code: '',
      notifications: true,
      feedback: [],
      blacklist: ['IfStatement'],
      whitelist: ['ForStatement', 'WhileStatement', 'VariableDeclaration'],
      structure: 'function _(_) { while(_) {} }'
    };
  },
  setCode: function(code) {
    this.setState({
      code
    });  
  },
  toggleNotifications: function() {
    this.setState({
      notifications: !this.state.notifications
    });   
  },
  updateFeedback: function(feedback) {
    this.setState({
      feedback
    }); 
  },
  render: function() { 
    var { notifications, feedback, code } = this.state;
    var feedback = notifications ? <Feedback feedback={feedback} /> : null;
    var editor = notifications ? <EditorWithTests onChange={this.setCode} onMessage={this.updateFeedback} {...this.state} /> : 
                                  <Editor onChange={this.setCode} code={code} />;

    return (
      <div className='app'>
        <OptionsBar notifications={notifications} onClick={this.toggleNotifications} />
        <ReactCSSTransitionGroup 
          component='div' 
          className='editor'
          transitionName='example' 
          transitionEnterTimeout={200} 
          transitionLeaveTimeout={200}>
          {editor}
          {feedback}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));