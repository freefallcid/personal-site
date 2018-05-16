import React from "react";
import axios from "axios";
import config from "../../config";

export default class CommentForm extends React.Component {
  state = {
    success: false,
    error: false,
    fields: {
      email: "",
      name: "",
      message: ""
    }
  };

  handleChange(e) {
    this.setState({
      fields: { ...this.state.fields, [e.target.id]: e.target.value }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post(config.staticmanUrl, { fields: this.state.fields })
      .then(this.success.bind(this))
      .catch(this.error.bind(this));
  }

  success(res) {
    this.setState({
      success: true,
      error: false,
      fields: {
        email: "",
        name: "",
        message: ""
      }
    });
  }

  error(err) {
    console.log(JSON.parse(err.request.response));
    this.setState({
      success: false,
      error: true
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        {this.state.error &&
          <div className="notice notice--error">
            <p>Sorry, there was an error submitting your comment</p>
          </div>}
        {this.state.success &&
          <div className="notice notice--success">
            <p>Thank you! Your comment is being processed</p>
          </div>}
        <div className="comment-form__field">
          <label htmlFor="name">Name</label>
          <input
            className="input"
            onChange={this.handleChange.bind(this)}
            type="text"
            value={this.state.fields.name}
            id="name"
          />
        </div>
        <div className="comment-form__field">
          <label htmlFor="email">E-mail address</label>
          <input
            className="input"
            onChange={this.handleChange.bind(this)}
            type="email"
            value={this.state.fields.email}
            id="email"
          />
        </div>
        <div className="comment-form__field">
          <label htmlFor="message">Your comment</label>
          <textarea
            className="input"
            onChange={this.handleChange.bind(this)}
            value={this.state.fields.message}
            id="message"
          />
        </div>
        <button className="comment-form__submit" type="submit">
          Post comment
        </button>
      </form>
    );
  }
}
