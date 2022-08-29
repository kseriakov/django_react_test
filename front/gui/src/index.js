import React from "react";
import { createStore, compose, applyMiddleware } from "redux";
import { createRoot } from "react-dom/client";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import App from "./App";
import reducer from "./store/reducers/auth";


// Это для работы плагина для Chrome — Redux DevTools. Удобный плагин для дебагинга.
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Создаем хранилище
const store = createStore(reducer, composeEnhances(applyMiddleware(thunk)));

const AppProvider = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AppProvider />
    </React.StrictMode>
);
