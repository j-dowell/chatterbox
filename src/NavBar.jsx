import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <h2 className='users-online'>Users online: {this.props.usersOnline}</h2>
      </nav>      
    )
  }
}

export default NavBar;