import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import './index.css';
import Game from './containers/Game.js';
import reducer from './reducers';
// import registerServiceWorker from './registerServiceWorker';

const store = configureStore({ reducer: reducer });

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
    <Provider store={store}>
        <Game />
    </Provider>
);

// registerServiceWorker();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
