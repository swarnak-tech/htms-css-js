import React, { Component } from "react";

class UserList extends Component {
  componentDidMount() {
    console.log("UserList component mounted");
  }

  render() {
    return (
      <div>
        <h3>User List</h3>
        <ul>
          {this.props.users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserList;
