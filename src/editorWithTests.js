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
    },
    startWorker: function() {
      this.worker = new Worker('worker.js');

      this.worker.onmessage = (message) => { 
        var data = JSON.parse(message.data);
        var feedback = data.feedback;
        console.log('FEEDBACK: ', feedback)
        this.props.onMessage(feedback);
      };
    },
    terminateWorker: function() {
      this.worker.terminate();
    },
    postMessage: function(message) {
      this.worker.postMessage(message);
    },
    updateCode: function(code) {
      var { blacklist, whitelist, structure } = this.props;

      this.postMessage({
        code,
        blacklist,
        whitelist,
        structure
      });

      console.log('WWWWHHHAAATTT', structure);

      this.setState({
        code: code
      });
    },
    render: function() {
      console.log(this.props.structure);
      return <Editor onChange={this.updateCode} {...this.props} {...this.state} />;
    }
  });
}

module.exports = editorWithTests;