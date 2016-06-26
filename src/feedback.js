var React = require('react');

var Feedback = React.createClass({
  render: function() {
    var emoji = {
      valid: <i className="em em-ok_hand"></i>,
      error: <i className="em em-open_mouth"></i>,
      structure: <i className="em em-muscle"></i>
    };

    return (
      <ul className='feedback'>
        {this.props.feedback.map((feedback, i) => {
          var key = Object.keys(feedback);
          return <li className={key} key={i}>{emoji[key]}{feedback[key]}</li>;
        })}
      </ul>
    );
  }
});

module.exports = Feedback;