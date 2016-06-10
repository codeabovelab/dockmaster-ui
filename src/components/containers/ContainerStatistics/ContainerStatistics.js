import React, {Component, PropTypes} from 'react';
import {loadStatistics} from 'redux/modules/containers/containers';
import {connect} from 'react-redux';
import _ from 'lodash';

@connect(
  state => ({
    containers: state.containers,
    containersUI: state.containersUI
  }),
  {loadStatistics})
export default class ContainerStatistics extends Component {
  static propTypes = {
    containers: PropTypes.object.isRequired,
    containersUI: PropTypes.object.isRequired,
    container: PropTypes.object.isRequired,
    loadStatistics: PropTypes.func.isRequired
  };

  componentWillMount() {
    const {container, loadStatistics} = this.props;
    loadStatistics(container);
  }

  render() {
    let s = require('./ContainerStatistics.scss');
    const {container, containers, containersUI} = this.props;
    let containerDetailed = containers[container.id];
    let loadingStatistics = _.get(containersUI, `[${container.id}].loadingStatistics`, false);
    let stats = containerDetailed.statistics ? containerDetailed.statistics : {};

    return (
      <div className={s.stats}>
        <h5>{container.name}</h5>
        {loadingStatistics &&
        <div className="text-xs-center">
          <i className="fa fa-spinner fa-5x fa-pulse"/>
        </div>
        }
        {!loadingStatistics &&
        <div className="data jumbotron-text">
          <div>
            <h5>Memory</h5>
            <div>
              <div><label>Usage MB:</label> {stats.memoryMBUsage}</div>
              <div><label>Max Usage MB:</label> {stats.memoryMBMaxUsage}</div>
              <div><label>Limit MB:</label> {stats.memoryMBLimit}</div>
              <div><label>Memory %:</label> {stats.memoryPercentage}</div>
            </div>
          </div>
          <div>
            <h5>CPU Table</h5>
            <div>
              <div><label>Total Usage:</label> {stats.cpuTotalUsage}</div>
              <div><label>Kernel:</label> {stats.cpuKernel}</div>
              <div><label>User:</label> {stats.cpuUser}</div>
              <div><label>System:</label> {stats.cpuSystem}</div>
            </div>
          </div>
          <div>
            <h5>Networks</h5>
            {this.printNetworks(stats.networks)}
          </div>
        </div>
        }
      </div>
    );
  }


  printNetworks(networks) {
    const fields = {
      rx_bytes: {label: 'Rx KBytes'},
      rx_packets: {label: 'Rx Packets'},
      rx_errors: {label: 'Rx Errors'},
      rx_dropped: {label: 'Rx Dropped'},
      tx_bytes: {label: 'Tx KBytes'},
      tx_packets: {label: 'Tx Packets'},
      tx_errors: {label: 'Tx Errors'},
      tx_dropped: {label: 'Tx Dropped'}
    };
    let fieldsNames = Object.keys(fields);

    let els = [];
    _.forOwn(networks, (network, name) => {
      let values = prepareValues(network);
      let el = (
        <div className="network" key={name}>
          <h6>{name}</h6>
          <div>
            {fieldsNames.map(fieldName => <div key={fieldName}><label>{fieldLabel(fieldName)}:</label> {values[fieldName]}</div>)}
          </div>
        </div>
      );
      els.push(el);
    });
    return <div>{els}</div>;

    function fieldLabel(name) {
      return _.get(fields, `${name}.label`, name);
    }

    function prepareValues(net) {
      let network = Object.assign({}, net);
      if (network.rx_bytes) {
        network.rx_bytes = Math.round(network.rx_bytes / 1024);
      }
      if (network.tx_bytes) {
        network.tx_bytes = Math.round(network.tx_bytes / 1024);
      }
      return network;
    }
  }

}