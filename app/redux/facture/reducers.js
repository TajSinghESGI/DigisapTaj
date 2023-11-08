import { createReducer } from 'reduxsauce';
import { FactureTypes } from './actions';

const INITIAL_STATE = {
  factureList: [],
};

const addFactureSuccess = (state = INITIAL_STATE, { facture }) => ({
  ...state,
  factureList: [
    ...state.factureList,
    {
     facture
    },
  ],
});

export default createReducer(INITIAL_STATE, {
  [FactureTypes.ADD_FACTURE_SUCCESS]: addFactureSuccess,
});
