import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {DockTable, OnOff, ActionMenu} from '../index';
import {RegistryEdit} from '../../containers/index';
import {Label, Badge, ButtonToolbar, SplitButton, MenuItem, Panel, Button, ProgressBar, Glyphicon} from 'react-bootstrap';

export default class RegistriesList extends Component {
  static propTypes = {
    data: PropTypes.array,
    onNewEntry: PropTypes.func,
    onActionInvoke: PropTypes.func.isRequired,
    loading: PropTypes.bool,
  };

  COLUMNS = [
    {
      name: 'name',
      label: 'Name',
      width: '20%',
      sortable: true
    },
    {
      name: 'username',
      label: 'User name',
      sortable: true
    },
    {
      name: 'registryType',
      label: 'Type',
      sortable: true
    },
    {
      name: 'url',
      label: 'Url',
      sortable: true
    },
    {
      name: 'errorMessage',
      label: 'Status',
      width: '30%',
      sortable: true,
      render: this.errorMessageRender
    },
    {
      name: 'actions',
      label: 'Actions',
      width: '50px',
      render: this.actionsRender.bind(this)
    }
  ];

  ACTIONS = [
    {
      key: "edit",
      title: "Edit",
      default: true
    },
    null,
    {
      key: "delete",
      title: "Delete"
    }
  ];

  render() {
    const panelHeader = (
      <div className="clearfix">
        <h3>Registry List</h3>

        <ButtonToolbar>
          <Button
            bsStyle="primary"
            onClick={this.props.onNewEntry}
          >
            <i className="fa fa-plus"/>&nbsp;
            New Registry
          </Button>
        </ButtonToolbar>
      </div>
    );

    return (
      <Panel header={panelHeader}>
        {this.props.loading && (
          <ProgressBar active now={100}/>
        )}


        {(this.props.data && !this.props.loading) && (
          <DockTable columns={this.COLUMNS}
                     rows={this.props.data}
          />
        )}

        {this.props.data && this.props.data.length === 0 && (
          <div className="alert alert-info">
            No Registries yet
          </div>
        )}
      </Panel>
    );
  }

  actionsRender(registry) {
    return (
      <td key="actions" className="td-actions">
        <ActionMenu subject={registry.name}
                    actions={this.ACTIONS}
                    actionHandler={this.props.onActionInvoke.bind(this)}
        />
      </td>
    );
  }

  errorMessageRender(registry) {
    const MAX_LEN = 60;
    let error = registry.errorMessage;
    let errorShort = "Connected";
    let msgStyle = "";
    if (error != null) {
      msgStyle = "alert alert-danger";
      errorShort = error.length > MAX_LEN + 3 ? error.slice(0, MAX_LEN) + '...' : error;
    }
    return (
      <td key="errorMessage" title={error} className={msgStyle}>{errorShort}</td>
    );
  }
}
