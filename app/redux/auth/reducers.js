// redux/auth/reducers.js

import { createReducer } from 'reduxsauce';
import { AuthTypes } from './actions';

const INITIAL_STATE = {
  username: null,
  isLogged: false,
  loading: false,
};

const loginRequest = (state) => ({
  ...state,
  loading: true,
});

const loginSuccess = (state, { username }) => ({
  ...state,
  username,
  isLogged: true,
});

const logout = ({}) => {
  return {
    ...INITIAL_STATE,
  }
}

export default createReducer(INITIAL_STATE, {
  [AuthTypes.LOGIN_REQUEST]: loginRequest,
  [AuthTypes.LOGIN_SUCCESS]: loginSuccess,
  [AuthTypes.LOGOUT]: logout,
});
