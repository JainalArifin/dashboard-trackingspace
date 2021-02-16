import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import AppContextProvider from './contexts';
import { history, store, persistor } from './redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// const { store, persistor } = configureStore();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
