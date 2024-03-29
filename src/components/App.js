import React, { Component } from "react";
import "./App.css";
import UsersList from "./UsersList";
import ButtonFetchUser from "./ButtonFetchUsers";

const API = "https://randomuser.me/api/?results=1";

class App extends Component {
  state = {
    users: []
  };

  handleDataFetch = () => {
    fetch(API)
      .then(response => {
        console.log(response);
        if (response.ok) {
          return response;
        }
        throw Error(response.status);
      })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        const user = data.results;
        this.setState(prevState => ({
          users: prevState.users.concat(user)
        }));
      })
      .catch(error => console.log(error + " Coś nie tak !"));
  };

  render() {
    const users = this.state.users;
    return (
      <div>
        <ButtonFetchUser click={this.handleDataFetch} />
        {users.length > 0 ? <UsersList users={users} /> : users}
      </div>
    );
  }
}

export default App;
