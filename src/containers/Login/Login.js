import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth/auth';

@connect(
  state => ({user: state.auth.user, auth: state.auth, loginError: state.auth.loginError}),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    auth: PropTypes.object,
    loginError: PropTypes.string,
    saveToLS: PropTypes.func.isRequired,
    loadFromLS: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const iUsername = this.refs.username;
    const username = iUsername.value;
    const iPassword = this.refs.password;
    const password = iPassword.value;
    this.props.login(username, password)
      .then(() => {
        const {auth} = this.props;
        if (auth && auth.token) {
          window.ls.setItem('auth', JSON.stringify(auth));
        }
      });
    iUsername.value = '';
    iPassword.value = '';
  };

  render() {
    const {user, logout, loginError} = this.props;
    const s = require('./Login.scss');
    return (
      <div className={s.loginPage}>
        <div className={s.loginWrapper}>
          <div className={"container " + s.loginContainer}>
            <Helmet title="Login"/>
            {!user &&
            <div>

              <h1 className="text-xs-center">Login</h1>
              <form className="login-form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input type="text" ref="username" placeholder="Enter a username"
                         className="form-control form-control-lg"/>
                </div>
                <div className="form-group">
                  <input type="password" ref="password" placeholder="Enter a password"
                         className="form-control form-control-lg"/>
                </div>
                <button className="btn btn-primary btn-block btn-lg" onClick={this.handleSubmit}><i
                  className="fa fa-sign-in"/>{' '}Log In
                </button>
              </form>
              <div className="text-danger">
                {loginError ? loginError : ' ' /*' ' to reserve space for error */}
              </div>
            </div>
            }
            {user &&
            <div>
              <p className="text-xs-center lead">You are currently logged in as <strong>{user.name}</strong>.</p>
              <div className="text-xs-center">
                <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
              </div>
            </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
