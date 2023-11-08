import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['user'],
  logout: null,
});

export const AuthTypes = Types;
export default Creators;
