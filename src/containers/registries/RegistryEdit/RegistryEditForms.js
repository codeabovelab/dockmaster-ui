import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {addRegistry, editRegistry, load as loadRegistries} from 'redux/modules/registries/registries';
import {createValidator, required} from 'utils/validation';
import {Dialog} from 'components';
import {Grid, Row, ButtonToolbar, Button} from 'react-bootstrap';
import _ from 'lodash';
import RegistryEditFormPrivate from './RegistryEditFormPrivate';
import RegistryEditFormAWS from './RegistryEditFormAWS';
import RegistryEditFormDockerHub from './RegistryEditFormDockerHub';
@connect(state => ({
  registriesUI: state.registriesUI
}), {addRegistry, editRegistry, loadRegistries})
export default class RegistryEdit extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func,
    resetForm: PropTypes.func,
    submitting: PropTypes.bool,
    createError: PropTypes.string,
    registry: PropTypes.any,
    onHide: PropTypes.func.isRequired,
    addRegistry: PropTypes.func.isRequired,
    editRegistry: PropTypes.func.isRequired,
    loadRegistries: PropTypes.func.isRequired,
    registriesUI: PropTypes.object.isRequired
  };

  constructor(...params) {
    super(...params);
    this.state = {currentRegType: this.getType()};
  }

  configType = [
    'PRIVATE',
    'AWS',
    'DOCKER_HUB'
  ];

  onSubmit(values) {
    delete values.name;
    values.registryType = this.getCurrentType();
//    values.name = values.username;

    alert(JSON.stringify(values));

    let promise;

    if (this.props.registry) {
      promise = this.props.editRegistry(values).then(() => {
        this.props.loadRegistries();
        this.props.onHide();
      });
    } else {
      promise = this.props.addRegistry(values).then(() => {
        this.props.loadRegistries();
        this.props.onHide();
      });
    }

    return promise;
  }

  render() {
    const hidden = true;
    return (
      <Dialog show
              role="document"
              size="large"
              title={this.props.title}
              hideCancel={hidden}
              hideOk={hidden}
              hideFooter={hidden}
              onReset={this.props.resetForm}
              onHide={this.props.onHide}
      >
        <ButtonToolbar>
          {this.renderButton(this.configType[0])}
          {this.renderButton(this.configType[1])}
          {this.renderButton(this.configType[2])}
        </ButtonToolbar>

        <hr />

        {this.renderSelectForm(this.state.currentRegType)}

      </Dialog>
    );
  }

  renderSelectForm(type) {
    const init = this.getInit();
    switch (type) {
      case this.configType[1]:
        return ( <RegistryEditFormAWS
          initialValues={init}
          onHide={this.props.onHide}
          onSubmit={this.onSubmit.bind(this)} />);
      case this.configType[2]:
        return ( <RegistryEditFormDockerHub
          initialValues={init}
          onHide={this.props.onHide}
          onSubmit={this.onSubmit.bind(this)} />);
      default:
        return ( <RegistryEditFormPrivate
          initialValues={init}
          onHide={this.props.onHide}
          onSubmit={this.onSubmit.bind(this)} />);
    }
  }

  renderButton(type) {
    return (
      <Button bsSize="large"
              bsStyle={type === this.getCurrentType() ? 'warning' : "default"}
              onClick={this.onClickButtonType.bind(this, type)}
              disabled={this.isEdit() } >
        {type}
      </Button>
    );
  }

  onClickButtonType(type) {
    this.setState(
      {currentRegType: type}
    );
  }

  getCurrentType() {
    return this.state.currentRegType;
  }

  getInit() {
    let init = '';
    if (this.props.registry) {
      init = this.props.registry;
    } else {
      init = {
        disabled: false,
        readOnly: false,
        registryType: "PRIVATE",
        username: "",
        password: "",
        name: "",
        url: "https://ni1.codeabovelab.com"
      };
    }
    return init;
  }

  getType() {
    let Type = 'PRIVATE';
    let registryType = Type;

    if (this.props.registry) {
      let {registryType} = this.props.registry;
    }

    if (registryType === 'undefined') {
      console.lod('registryType UNDEFINED');
    }
    return registryType;
  }

  isEdit() {
    return this.props.registry ? true : false;
  }
}
