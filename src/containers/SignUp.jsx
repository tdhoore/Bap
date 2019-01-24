/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import fire from '../components/Firebase/firebase.js';
import {observer} from 'mobx-react';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.username = '';
    this.email = '';
    this.password = '';
    this.error = '';
  }

  onSubmit(event) {}

  onChange(event) {}

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type='text'
          name='username'
          value={this.username}
          onChange={this.onChange}
          placeholder='Full Name'
        />
        <input
          type='text'
          name='email'
          value={this.email}
          onChange={this.onChange}
          placeholder='Email Address'
        />
        <input
          type='text'
          name='password'
          value={this.password}
          onChange={this.onChange}
          placeholder='Password'
        />
        <button type='submit'>Sign Up</button>
        {this.error && <p>{this.error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => {
  <p>Don't have an account? LINK HIER</p>;
};

export default {SignUpForm, SignUpLink};
