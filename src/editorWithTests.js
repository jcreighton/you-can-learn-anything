var React = require('react');

function editorWithTests(Editor) {
  return React.createClass({
    getInitialState: function() {
      return {
        code: '// Let\'s build something new!'
      };
    },
    getDefaultProps: function() {
      return {
        whitelist: [],
        blacklist: [],
        structure: null
      };
    },
    componentDidMount: function() {
      this.startWorker();

      var { blacklist, whitelist, structure, code } = this.props;

      this.postMessage({
        code,
        blacklist,
        whitelist,
        structure
      });
    },
    startWorker: function() {
      this.worker = new Worker('worker.js');

      this.worker.onmessage = (message) => { 
        var data = JSON.parse(message.data);
        var feedback = data.feedback;
        this.props.onMessage(feedback);
      };
    },
    terminateWorker: function() {
      this.worker.terminate();
    },
    postMessage: function(message) {
      console.log('postMessage ', message);
      this.worker.postMessage(message);
    },
    updateCode: function(code) {
      var { blacklist, whitelist, structure, onChange } = this.props;

      this.postMessage({
        code,
        blacklist,
        whitelist,
        structure
      });

      if (onChange) {
        onChange(code);
      }
    },
    render: function() {
      console.log('i am rendering');
      return <Editor {...this.props} onChange={this.updateCode} />;
    },
    componentWillUnmount() {
      this.terminateWorker();
    }
  });
}

module.exports = editorWithTests;