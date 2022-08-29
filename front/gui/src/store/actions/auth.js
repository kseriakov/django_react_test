// Здесь определяются действия, которые затем вызываются через dispatch
// для изменения state

import axios from "axios";

import * as actionTypes from "./actionType";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error,
    };
};

export const test = (arg) => {
    return {
        type: actionTypes.TEST,
        test: arg,
    };
};

// Метод выхода из системы
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

// Функция проверки истечения времени жизни токена
export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout()); // как только время истекло меняем состояние на выход из системы
        }, expirationTime * 1000); // т.к. expirationTime в секундах, а в таймауте в миллисекундах
    };
};

export const authLogin = (username, password) => {
    return (dispatch) => {
        dispatch(authStart()); // запускаем событие входа в систему
        axios
            .post("http://127.0.0.1:8000/dj-rest-auth/login/", {
                username,
                password,
            })
            .then((res) => {
                const token = res.data.key; // получаем токен от drf, после входа в систему
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                //  Сохраняем данные о токене и сроке его действия в локальное хранилище
                localStorage.setItem("token", token);
                localStorage.setItem("expirationDate", expirationDate);
                // В случае успешного входа, запускаем событие - успешный вход
                dispatch(authSuccess(token));
                // Запускаем отсчет жизни токена
                dispatch(checkAuthTimeout(3600));
            })
            .catch((err) => {
                dispatch(authFail(err.message));
            });
    };
};

export const authSingUp = (username, email, password1, password2) => {
    return (dispatch) => {
        dispatch(authStart());
        axios
            .post("http://127.0.0.1:8000/dj-rest-auth/registration/", {
                username,
                email,
                password1,
                password2,
            })
            .then((res) => {
                console.log(res);
                const token = res.data.key; // получаем токен от drf, после входа в систему
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                //  Сохраняем данные о токене и сроке его действия в локальное хранилище
                localStorage.setItem("token", token);
                localStorage.setItem("expirationDate", expirationDate);
                // В случае успешного входа, запускаем событие - успешный вход
                dispatch(authSuccess(token));
                // Запускаем отсчет жизни токена
                dispatch(checkAuthTimeout(3600));
            })
            .catch((err) => {
                dispatch(authFail(err));
            });
    };
};

// Функция проверки состояния аутентификации
export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                
                dispatch(
                    checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)
                );
            }
        }
    };
};
