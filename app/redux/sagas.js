// Import des dépendances nécessaires depuis Redux-Saga et d'autres modules
import { put, takeLatest, all } from 'redux-saga/effects';
import { DevisTypes } from '@app/redux/devis/actions.js';
import { DevisActions } from '@app/redux/devis/reducers.js';
import { FactureTypes } from '@app/redux/facture/actions.js';
import { FactureActions } from '@app/redux/facture/reducers.js';
import axios from 'axios';

/* ---DEBUT SAGA DEVIS--- */

// Saga permettant d'appeler le ws addDevis
function* addDevis(action) {
    console.log('SAGA');
    try {
        const { designation, description, priceHT, priceTTC } = action;
        
        const response = yield axios.post('localhost:3000/addDevis', { designation, description, priceHT, priceTTC });
        
        // Récupère les données du devis ajouté depuis la réponse
        const devis = response.data;
        
        // Dispatch l'action 'addDevisSuccess' avec les données du devis
        yield put(DevisActions.addDevisSuccess(devis));
    } catch (error) {
        throw new Error(error);
    }
}

//Ecoute l'appel à 'ADD_DEVIS' et appelle 'addDevis'
function* watchDevis() {
    yield takeLatest(DevisTypes.ADD_DEVIS, addDevis);
}

/* ---FIN SAGA DEVIS--- */

/* ---DEBUT SAGA FACTURE--- */

// Saga permettant d'appeler le ws addFacture
function* addFacture(action) {
    try {
        const { designation, description, priceHT, priceTTC } = action;
        
        const response = yield axios.post('localhost:3000/addFacture', { designation, description, priceHT, priceTTC });
        
        // Récupère les données de la facture ajoutée depuis la réponse
        const facture = response.data;
        
        // Dispatch l'action 'addFactureSuccess' avec les données de la facture
        yield put(FactureActions.addFactureSuccess(facture));
    } catch (error) {
        throw new Error(error);
    }
}

//Ecoute l'appel à 'ADD_FACTURE' et appelle 'addFacture'
function* watchFacture() {
    yield takeLatest(FactureTypes.ADD_FACTURE, addFacture);
}

/* ---FIN SAGA FACTURE--- */

// rootSaga' combine toutes les sagas
export default function* rootSaga() {
    yield all([
        watchDevis(),
        watchFacture(),
    ]);
}
