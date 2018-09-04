import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input
        type='text'
        className="chatbar-username" 
        placeholder="Your Name (Optional)" 
        onChange={this.props.onUserChange} 
        value={this.props.currentUser.name} 
        />
        <input 
        type='text' 
        className="chatbar-message" 
        placeholder="Type a message and hit ENTER" 
        value={this.props.value} 
        onKeyPress={this.props.onKeyPress} 
        onChange={this.props.onChange}
        />
      </footer>
    )
  }
}

export default ChatBar;