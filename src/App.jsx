import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.messageGenerator = this.messageGenerator.bind(this);
    this.notificationGenerator = this.notificationGenerator.bind(this);
    // this.onKeyPressName = this.onKeyPressName.bind(this);

    this.state = {
      currentUser: {name: "Bob"},
      value: '',
      messages: [],
      notifications: []
    }
  }

  notificationGenerator(oldUsername, newUserName) {
    const newNotification = {
      type: 'postNotification',
      content: `${oldUsername} changed their name to ${newUserName}`
    }
    this.socket.send(JSON.stringify(newNotification));   
  }

  messageGenerator(user, message) {
    const newMessage = {
      type: 'postMessage',
      username: user, 
      content: message
    };
    if (this.state.currentUser.name !== user) {
      this.notificationGenerator(this.state.currentUser.name, user)
      this.setState({currentUser: {name: user}})
    }
    this.socket.send(JSON.stringify(newMessage));   
  }


  // onKeyPressName(e) {
  //   console.log('event target value', e.target.value);
  //   console.log('current name', this.state.currentUser.name);
  //   if (e.charCode === 13) {
  //     const oldUsername = this.state.currentUser.name;
  //     if (e.target.value !== oldUsername) {
  //       this.setState({
  //         currentUser: {name: e.target.value}
  //       })
  //       this.notificationGenerator(oldUsername);
  //     }
  //   }
  // }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001/');
    this.socket.onopen = function() {
      console.log('Connected to server!')
    };
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const messages = this.state.messages.concat(data);
      this.setState({ messages: messages, value: '' })
      
    }
    console.log("componentDidMount <App />");
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList 
        messages={ this.state.messages }
        notifications={ this.state.notifications }
        />
        <ChatBar 
          messageGenerator={ this.messageGenerator.bind(this) } 
          currentUser={ this.state.currentUser }
        />
      </div>
    );
  }
}
export default App;
