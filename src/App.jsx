import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import generateRandomId from './helper.js';


class App extends Component {
  constructor(props) {
    super(props);

    this.messageGenerator = this.messageGenerator.bind(this);
    this.logValue = this.logValue.bind(this);
    this.keyPress = this.keyPress.bind(this);

    this.state = {
      currentUser: {name: "Bob"},
      value: '',
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: generateRandomId()
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: generateRandomId()
        }
      ]
    }
  }

  messageGenerator() {
    const newMessage = {
      id: generateRandomId(), 
      username: this.state.currentUser.name, 
      content: this.state.value
    };
    const messages = this.state.messages.concat(newMessage);
    this.setState({
      messages: messages, 
      value: ''}) // adding message, resetting form input value
  }

  onChange(e) {
      this.setState({
        value: e.target.value
      })
  }

  keyPress(e) {
    if (e.key === 'Enter') {
      this.messageGenerator()
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 3, 
        username: "Michelle", 
        content: "Hello there!"
      };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }
  

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar 
        value={this.state.value}
        onKeyPress={this.keyPress} 
        onChange={this.onChange} 
        messageGenerator={this.messageGenerator} 
        currentUser={this.state.currentUser}
        />
      </div>
    );
  }
}
export default App;
