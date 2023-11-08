// redux/reducers.js

import { combineReducers } from 'redux';
import authReducer from '@app/redux/auth/reducers.js';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
