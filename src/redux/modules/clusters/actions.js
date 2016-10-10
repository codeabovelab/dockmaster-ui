const _ACTIONS = {
  CREATE: "CREATE",
  CREATE_SUCCESS: 'CREATE_SUCCESS',
  CREATE_FAIL: 'CREATE_FAIL',
  DELETE: 'DELETE',
  DELETE_SUCCESS: 'DELETE_SUCCESS',
  DELETE_FAIL: 'DELETE_FAIL',
  CONFIG: 'CONFIG',
  CONFIG_SUCCESS: 'CONFIG_SUCCESS',
  CONFIG_FAIL: 'CONFIG_FAIL',
  INFORMATION: 'INFORMATION',
  INFORMATION_SUCCESS: 'INFORMATION_SUCCESS',
  INFORMATION_FAIL: 'INFORMATION_FAIL',
  LOAD: 'LOAD',
  LOAD_SUCCESS: 'LOAD_SUCCESS',
  LOAD_FAIL: 'LOAD_FAIL',
  LOAD_CONTAINERS: 'cluster/LOAD_CONTAINERS',
  LOAD_CONTAINERS_SUCCESS: 'cluster/LOAD_CONTAINERS_SUCCESS',
  LOAD_CONTAINERS_FAIL: 'cluster/LOAD_CONTAINERS_FAIL',
  LOAD_DEFAULT_PARAMS: 'LOAD_DEFAULT_PARAMS',
  LOAD_DEFAULT_PARAMS_SUCCESS: 'LOAD_DEFAULT_PARAMS_SUCCESS',
  LOAD_DEFAULT_PARAMS_FAIL: 'LOAD_DEFAULT_PARAMS_FAIL',
  LOAD_NODES: 'cluster/LOAD_NODES',
  LOAD_NODES_SUCCESS: 'cluster/LOAD_NODES_SUCCESS',
  LOAD_NODES_FAIL: 'cluster/LOAD_NODES_FAIL',
  UPLOAD_COMPOSE: 'UPLOAD_COMPOSE',
  UPLOAD_COMPOSE_SUCCESS: 'UPLOAD_COMPOSE_SUCCESS',
  UPLOAD_COMPOSE_FAIL: 'UPLOAD_COMPOSE_FAIL'
};

Object.keys(_ACTIONS).forEach((key) => {
  _ACTIONS[key] = 'clusters/' + _ACTIONS[key];
});
export const ACTIONS = _ACTIONS;
