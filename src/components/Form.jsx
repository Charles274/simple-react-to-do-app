import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let currentUserName = this.state.username;
    console.log(`You entered ${currentUserName}`);
    this.setState({ [event.target.name]: "" });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        <form action="" onSubmit={this.handleSubmit}>
          <label htmlFor="username">User Name: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            type="email"
            name="email"
            id="name"
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            id=""
            onChange={this.handleChange}
          />
          <button type="submit">Submit!</button>
        </form>
      </div>
    );
  }
}

export default Form;
