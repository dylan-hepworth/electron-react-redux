import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './combineReducers';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Error from './components/Error';

import * as serviceWorker from './serviceWorker';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['something_to_blacklist']
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

const persistor = persistStore(store);

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router basename="/">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route component={Error} />
                </Switch>
            </Router>
        </PersistGate>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
