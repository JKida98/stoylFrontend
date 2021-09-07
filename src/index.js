import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { cacheEnhancer } from 'redux-cache';
import thunk from 'redux-thunk';
import App from './App';
import rootReducer from './redux/reducers/index';


const persistConfig = {
	key: 'root',
	storage: storage,
};


const pReducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(thunk);
const store = createStore(pReducer, compose(middleware, cacheEnhancer()));
const persistor = persistStore(store);


ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor} >
			<App />
		</PersistGate>
	</Provider >, document.getElementById('root')
);