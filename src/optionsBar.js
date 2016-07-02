var React = require('react');

var OptionsBar = React.createClass({
  handleOnClick: function() {
    var {onClick} = this.props; 

    if (onClick) {
      onClick();
    }
  },
  render: function() {
    var { notifications } = this.props;
    console.log('notifications: ', notifications);
    var buttonState = notifications ? 'on' : 'off';
    return (
      <div className='options' onClick={this.handleOnClick}>
        <button>Notifications {buttonState}</button>
      </div>
    );
  }
});

module.exports = OptionsBar;