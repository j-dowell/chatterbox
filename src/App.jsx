import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import generateRandomId from './helper.js';



class App extends Component {
  constructor(props) {
    super(props);

    this.messageGenerator = this.messageGenerator.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.keyPress = this.keyPress.bind(this);


    this.state = {
      currentUser: {name: "Bob"},
      value: '',
      messages: []
    }
  }
  

  messageGenerator() {
    const newMessage = {
      username: this.state.currentUser.name, 
      content: this.state.value
    };
    this.socket.send(JSON.stringify(newMessage));     
  }

  onUserChange(e) {
    this.setState({
      currentUser: {name : e.target.value}
    })
  }

  // Setting state equal to input textbox value
  onChange(e) {
      this.setState({
        value: e.target.value
      })
  }

  keyPress(e) {
    // Call messageGenerator when 'Enter' key (charcode 13) is input
    if (e.charCode === 13) { 
      this.messageGenerator()
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001/');
    this.socket.onopen = function() {
      console.log('Connected to server!')
    };
    this.socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      const messages = this.state.messages.concat(newMessage);
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
        <MessageList messages={ this.state.messages }/>
        <ChatBar 
          value={ this.state.value }
          onKeyPress={ this.keyPress } 
          onChange={ this.onChange} 
          onUserChange={ this.onUserChange} 
          messageGenerator={ this.messageGenerator } 
          currentUser={ this.state.currentUser }
        />
      </div>
    );
  }
}
export default App;
