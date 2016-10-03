const _ACTIONS = {
  LOAD_LIST: 'LOAD_LIST',
  LOAD_LIST_SUCCESS: 'LOAD_LIST_SUCCESS',
  LOAD_LIST_FAIL: 'LOAD_LIST_FAIL',
  LOAD_INFO: 'LOAD_INFO',
  LOAD_INFO_SUCCESS: 'LOAD_INFO_SUCCESS',
  LOAD_INFO_FAIL: 'LOAD_INFO_FAIL'
};

Object.keys(_ACTIONS).forEach((key) => {
  _ACTIONS[key] = 'jobs/' + _ACTIONS[key];
});
export const ACTIONS = _ACTIONS;
