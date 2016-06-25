var React = require('react');

var Feedback = React.createClass({
  render: function() {
    return (
      <ul className='feedback'>
        {this.props.feedback.map((feedback, i) => {
          var key = Object.keys(feedback);
          return <li className={key} key={i}>{feedback[key]}</li>;
        })}
      </ul>
    );
  }
});

module.exports = Feedback;