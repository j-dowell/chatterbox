import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.messageGenerator = this.messageGenerator.bind(this);
    this.notificationGenerator = this.notificationGenerator.bind(this);

    this.state = {
      currentUser: {name: "Bob"},
      value: '',
      messages: [],
      usersOnline: 0
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
    // If username has change, send notification 
    if (this.state.currentUser.name !== user) {
      this.notificationGenerator(this.state.currentUser.name, user)
      this.setState({currentUser: {name: user}})
    }
    this.socket.send(JSON.stringify(newMessage));   
  }
  
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001/');
    this.socket.onopen = function() {
      console.log('Connected to server!')
    };
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'incomingClientSize') {
        this.setState({usersOnline: data.usersOnline})
      }
      const messages = this.state.messages.concat(data);
      this.setState({ messages: messages, value: '' })
      
    }
    console.log("componentDidMount <App />");
  }

  render() {
    return (
      <div>
        <NavBar usersOnline={ this.state.usersOnline }/>
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
