import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  addDevis: ['designation', 'description', 'priceHT', 'priceTTC'],
  addDevisSuccess: ['devis'],
  editDevis: ['designation', 'description', 'priceHT', 'priceTTC'],
  deleteDevis: null,
  transformDevis: ['designation', 'description', 'priceHT', 'priceTTC'],
});

export const DevisTypes = Types;
export default Creators;
