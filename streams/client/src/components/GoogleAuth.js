/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    // inititalizing gapi for OAuth 2. Not actually using scope, it's just there to demonstrate
    // how to request access to particular user data.
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '999881178632-e8k94l61pbam6u4vtjl7g04up2194ti2.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.onAuthChange(this.auth.isSignedIn.get());
          // this.auth.isSignedIn object 'inherits'/has the __proto__ attribute with a method called listen
          // it takes a callback to execute when this.auth.isSignedIn changes.
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  // The callback function to listen gets passed the isSignedIn boolen
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    const { isSignedIn } = this.props;

    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <button
          onClick={this.onSignOutClick}
          type="button"
          className="ui red google button"
        >
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button
          onClick={this.onSignInClick}
          type="button"
          className="ui red google button"
        >
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()} </div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
