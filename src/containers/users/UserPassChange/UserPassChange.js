import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {setUser} from 'redux/modules/users/users';
import {createValidator, required} from 'utils/validation';
import {Dialog} from 'components';
import {FormGroup, FormControl, ControlLabel, Alert} from 'react-bootstrap';

@connect(state => ({
  createError: state.users.setUserError
}), {setUser})
@reduxForm({
  form: 'UserPassChange',
  fields: [
    'password'
  ],
  validate: createValidator({
    password: [required]
  })
})
export default class UserAdd extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func,
    resetForm: PropTypes.func,
    submitting: PropTypes.bool,
    createError: PropTypes.string,
    valid: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    okTitle: PropTypes.string,
    setUser: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired
  };

  onSubmit() {
    const {fields, setUser, userName, onHide} = this.props;

    let userData = {
      "password": fields.password.value
    };
    setUser(userName, userData).then(()=>onHide());
  }

  render() {
    const {fields, okTitle} = this.props;
    return (
      <Dialog show
              size="default"
              title={this.props.title}
              submitting={this.props.submitting}
              allowSubmit={this.props.valid}
              onReset={this.props.resetForm}
              onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}
              onHide={this.props.onHide}
              okTitle={okTitle || 'OK'}
      >
        {this.props.createError && (
          <Alert bsStyle="danger">
            {this.props.createError}
          </Alert>
        )}
        <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          <FormGroup title="required" required
                     validationState={(fields.password.error && fields.password.touched) ? "error" : ""}>
            <ControlLabel>Password</ControlLabel>
            <FormControl type="text"
                         {...fields.password}
                         placeholder="New Password (required)"
            />
          </FormGroup>
        </form>
        <div ref="error" className="text-danger text-xs-center text-error">
        </div>
      </Dialog>
    );
  }
}
