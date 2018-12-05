import React, { Component } from 'react';
import './App.css';
import Users from './Components/Users'


class App extends Component {
  state = {
    users: [
      { id: 1, name: 'Mohammad', age: 22 },
      { id: 2, name: 'Ali', age: 20 },
      { id: 3, name: 'Mohsen', age: 33 }
    ],
    searchText: null
  }

  showList = () => {
    let users = this.state.searchText ? this.state.users
      .filter(user => {
        let regex = new RegExp(this.state.searchText)
        return user.name.match(regex)
      }) : this.state.users
    return <div>
      {
        users
          .map(users => (
            <Users
              key={users.id}
              name={users.name}
              age={users.age}
              id={users.id}
              onChange={this.removeItem} />
          ))
      }
    </div>
  }

  addPerson = () => {
    let newState = { ...this.state }
    let name = prompt('Enter Name')
    let age = prompt('Enter Age')
    let newId = 1;
    if (newState.users.length) {
      newId = 1 + newState.users[newState.users.length - 1].id
    }
    let user = {
      id: newId,
      name: name,
      age: age
    }
    newState.users.push(user)
    this.setState(newState)
  }

  removeItem = (id) => {
    let newState = { ...this.state };
    newState.users = newState.users.filter(user => user.id != id);
    // console.log(newState.users)
    this.setState(newState);
  }

  filterUsers = (e) => {
    let newState = { ...this.state }
    newState.searchText = e.target.value
    this.setState(newState);
  }
  render() {
    return (
      <div>
        <button className="addBtn" onClick={this.addPerson}>Add Person</button>
        <input className="inputSearch" type="text" placeholder="enter a name to search" onChange={this.filterUsers} />
        {this.showList()}
      </div>
    );
  }
}

export default App;
