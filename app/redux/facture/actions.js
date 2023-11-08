import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  addFacture: ['designation', 'description', 'priceHT', 'priceTTC'],
  addFactureSuccess: ['facture'],
  editFacture: ['designation', 'description', 'priceHT', 'priceTTC'],
  deleteFacture: null,
});

export const FactureTypes = Types;
export default Creators;
