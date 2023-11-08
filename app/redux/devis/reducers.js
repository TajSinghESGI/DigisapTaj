import { createReducer } from 'reduxsauce';
import { DevisTypes } from './actions';

const INITIAL_STATE = {
  devisList: [],
};

const addDevisSuccess = (state = INITIAL_STATE, { devis }) => ({
  ...state,
  devisList: [
    ...state.devisList,
    {
      devis,
    },
  ],
});

export default createReducer(INITIAL_STATE, {
  [DevisTypes.ADD_DEVIS_SUCCESS]: addDevisSuccess,
});
