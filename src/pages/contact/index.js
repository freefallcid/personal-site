import React, { Component } from "react";

export default class ContactPage extends Component {
  render() {
    return (
      <form name="contact" action="/contact-success" data-netlify="true">
        <div>
          <label>Name</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" />
        </div>
        <div>
          <label>Message</label>
          <textarea name="message" />
        </div>
        <div>
          <button type="submit">Send</button>
        </div>
      </form>
    );
  }
}
