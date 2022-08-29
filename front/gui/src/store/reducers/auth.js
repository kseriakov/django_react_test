import * as actionTypes from "../actions/actionType";
import { updateObject } from "../utility";

// Определяем начальные состояния нашего приложения
const initialState = {
    token: null,
    error: null,
    loading: false,
    test: 7,
};

// Создаем функции, которые через reducer, будут изменять состояние приложения
const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token, // здесь action - действие из action/auth.js - authSuccess
        error: null,
        loading: false,
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        error: null,
        loading: false,
    });
};

const test = (state, action) => {
    return updateObject(state, action, {
        test: action.test,
    });
};

// Создаем reducer, который принимает исходное состояние и  в зависимости
// от переданного action действия, он изменяет состояние приложения
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.TEST:
            return test(state, action);
        default:
            return state;
    }
};

export default reducer;
