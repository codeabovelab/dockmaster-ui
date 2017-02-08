import React, {Component, PropTypes} from 'react';
import config from '../../config';

export default class AgentPanel extends Component {

  render() {
    let agentURL = location.protocol + '//' + config.apiHost + "/discovery/agent/haven-agent.py";
    return (
      <div>
        <div className="agentList">
          <p>Get Agent:
            &nbsp;<a href={agentURL}>{agentURL}</a>
          </p>
        </div>
      </div>
    );
  }
}
