import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './rootReducer';

// persist
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import mergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const middleware = applyMiddleware(thunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools


const config = {
  key: 'primary',
  storage: storage,
  stateReconciler: mergeLevel2,
};

let persistReucer = persistCombineReducers(config, reducers);


export const store = createStore(
  persistReucer,
  composeEnhancers(middleware)
);

export const persistor = persistStore(store);
