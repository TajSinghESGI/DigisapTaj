import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers.js';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

// Création d'un middleware saga
const sagaMiddleware = createSagaMiddleware();

// Création du store redux en implementant le middleware saga.
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export { store, Provider };
