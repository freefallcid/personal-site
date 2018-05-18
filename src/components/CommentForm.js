import React from "react";
import axios from "axios";
import config from "../../config";

export default class CommentForm extends React.Component {
  state = {
    open: false,
    success: false,
    error: false,
    loading: false,
    fields: {
      email: "",
      name: "",
      body: ""
    }
  };

  handleChange(e) {
    this.setState({
      fields: { ...this.state.fields, [e.target.id]: e.target.value }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    axios
      .post(`${config.staticmanUrl}/comments`, {
        fields: { ...this.state.fields, path: this.props.path }
      })
      .then(this.success.bind(this))
      .catch(this.error.bind(this));
  }

  success(res) {
    this.setState({
      success: true,
      error: false,
      loading: false,
      fields: {
        email: "",
        name: "",
        body: ""
      }
    });
  }

  error(err) {
    console.log(JSON.parse(err.request.response));
    this.setState({
      loading: false,
      success: false,
      error: true
    });
  }

  open() {
    this.setState({ open: true });
  }

  render() {
    if (!this.state.open) {
      return (
        <div
          onClick={this.open.bind(this)}
          className="comment-form comment-form--hidden"
        >
          <p>Post a comment</p>
        </div>
      );
    }

    return (
      <form className="comment-form" onSubmit={this.handleSubmit.bind(this)}>
        <label htmlFor="body">Leave a comment</label>
        <div className="comment-form__field">
          {this.state.error && (
            <div className="notice notice--error">
              <p>Sorry, there was an error submitting your comment</p>
            </div>
          )}
          {this.state.success && (
            <div className="notice notice--success">
              <p>Thank you! Your comment is being processed</p>
            </div>
          )}
          <textarea
            className="input"
            onChange={this.handleChange.bind(this)}
            value={this.state.fields.body}
            id="body"
            placeholder="Enter you comment (markdown supported)"
            autoFocus
            required
          />
        </div>
        <div className="comment-form__flex">
          <div className="comment-form__field">
            <input
              className="input"
              onChange={this.handleChange.bind(this)}
              type="text"
              value={this.state.fields.name}
              id="name"
              placeholder="Enter you name"
              required
            />
          </div>
          <div className="comment-form__field">
            <input
              className="input"
              onChange={this.handleChange.bind(this)}
              type="email"
              value={this.state.fields.email}
              id="email"
              placeholder="Enter you email address"
              required
            />
          </div>

          <button
            className={
              "comment-form__submit button " +
              (this.state.loading ? "button--loading" : null)
            }
            type="submit"
          >
            Post comment
          </button>
        </div>
      </form>
    );
  }
}
