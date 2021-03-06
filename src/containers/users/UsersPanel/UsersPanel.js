import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {StatisticsPanel, UsersList} from '../../../components';
import * as usersActions from 'redux/modules/users/users';
import {UserAdd, UserPassChange} from '../../index';
import _ from 'lodash';
import Helmet from 'react-helmet';

@connect(
  state => ({
    users: state.users
  }), {
    getRoles: usersActions.getRoles,
    getCurrentUser: usersActions.getCurrentUser,
    getUsers: usersActions.getUsers,
    getUser: usersActions.getUser,
    addUserRole: usersActions.addUserRole,
    deleteUserRole: usersActions.deleteUserRole,
    getUserRoles: usersActions.getUserRoles,
    setUser: usersActions.setUser,
    deleteUser: usersActions.deleteUser
  })
export default class UsersPanel extends Component {
  static propTypes = {
    users: PropTypes.object,
    getRoles: PropTypes.func.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    addUserRole: PropTypes.func.isRequired,
    deleteUserRole: PropTypes.func.isRequired,
    getUserRoles: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired
  };

  statisticsMetrics = [
    {
      type: 'number',
      title: 'User',
      titles: 'Users'
    },
    {
      type: 'number',
      title: 'Admin',
      titles: 'Admins'
    }
  ];
  componentDidMount() {
    const {getRoles, getUsers, getCurrentUser} = this.props;
    getRoles();
    getUsers();
    getCurrentUser();
    $('.input-search').focus();
  }

  render() {
    const {roles, usersList} = this.props.users;
    let usersCount = 0;
    let adminsCount = 0;
    if (usersList) {
      for (let el in usersList) {
        if (!usersList.hasOwnProperty(el)) {
          continue;
        }
        let role = _.get(usersList[el], 'roles[0].name', '');
        switch (role) {
          case "ROLE_USER":
            usersCount++;
            break;
          case "ROLE_ADMIN":
            adminsCount++;
            break;
          default:
            break;
        }
      }
    }
    return (
      <div>
        <Helmet title="Users"/>
        <StatisticsPanel metrics={this.statisticsMetrics}
                         values={[usersCount, adminsCount]}
        />
        <UsersList loading={typeof usersList === "undefined"}
                   data={usersList}
                   roles={roles}
                   onNewUser={this.onActionInvoke.bind(this, "create")}
                   onActionInvoke={this.onActionInvoke.bind(this)}
        />
        {(this.state && this.state.actionDialog) && (
          <div>
            {this.state.actionDialog}
          </div>
        )}
      </div>
    );
  }

  onHideDialog() {
    const {getUsers} = this.props;
    getUsers();
    this.setState({
      actionDialog: undefined
    });
  }

  onActionInvoke(action, userName) {
    const {users} = this.props;
    let usersNames = _.keys(this.props.users.usersList);
    let currentUserName = _.get(users, 'currentUser.name', '');
    switch (action) {
      case "create":
        this.setState({
          actionDialog: (
            <UserAdd title="Create User"
                     onHide={this.onHideDialog.bind(this)}
                     okTitle="Create User"
                     existingUsers={usersNames}
            />
          )
        });
        return;
      case "edit":
        this.setState({
          actionDialog: (
            <UserAdd title="Edit User"
                     onHide={this.onHideDialog.bind(this)}
                     okTitle="Update User"
                     existingUsers={usersNames}
                     userName={userName}
            />
          )
        });
        return;
      case "delete":
        if (userName === currentUserName) {
          confirm('You are logged in as ' + userName + ', so this user can not be removed.');
        } else {
          confirm('Are you sure you want to delete this user')
            .then(() => {
              this.props.deleteUser(userName).catch(() => null)
                .then(() => this.props.getUsers());
            })
            .catch(() => null);
        }
        return;
      case "changePassword":
        this.setState({
          actionDialog: (
            <UserPassChange title={"Change user " + userName + " password"}
                            onHide={this.onHideDialog.bind(this)}
                            okTitle="Change Password"
                            userName={userName}
            />
          )
        });
        return;
      default:
        return;
    }
  }
}
