import {ACTIONS} from './actions';
import _ from 'lodash';

export default function reducer(state = [], action = {}) {
  switch (action.type) {
    case ACTIONS.LOAD_REGISTRIES_SUCCESS:
      return action.result;
    default:
      return state;
  }
}

export function load() {
  return {
    types: [ACTIONS.LOAD_REGISTRIES, ACTIONS.LOAD_REGISTRIES_SUCCESS, ACTIONS.LOAD_REGISTRIES_FAIL],
    promise: (client) => client.get('/ui/api/registries/')
  };
}

export function addRegistry(register) {
  return {
    types: [ACTIONS.ADD_REGISTRY, ACTIONS.ADD_REGISTRY_SUCCESS, ACTIONS.ADD_REGISTRY_FAIL],
    promise: (client) => client.put(`/ui/api/registries`, {data: register})
  };
}

export function removeRegistry(name) {
  return {
    types: [ACTIONS.REMOVE_REGISTRY, ACTIONS.REMOVE_REGISTRY_SUCCESS, ACTIONS.REMOVE_REGISTRY_FAIL],
    promise: (client) => client.put(`/ui/api/registries`, {data: {name}})
  };
}