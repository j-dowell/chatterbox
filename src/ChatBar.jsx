import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: this.props.currentUser.name},
      message: ''
    }
  }

  onUserChange(event) {
    this.setState({currentUser: {name: event.target.value}});
  }

  onMessageChange(event) {
    this.setState({message: event.target.value})
  }

  onMessageSubmit(event) {
    if(event.charCode === 13) {
      this.props.messageGenerator(this.state.currentUser.name, this.state.message);
      this.setState({
        message: ''
      })
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input
        type='text'
        className="chatbar-username" 
        placeholder="Your Name (Optional)" 
        onChange={this.onUserChange.bind(this)}
        value={this.state.currentUser.name}
        />
        <input 
        type='text' 
        className="chatbar-message" 
        placeholder="Type a message and hit ENTER" 
        value={this.state.message} 
        onKeyPress={this.onMessageSubmit.bind(this)} 
        onChange={this.onMessageChange.bind(this)}
        />
      </footer>
    )
  }
}

export default ChatBar;