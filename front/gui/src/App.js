import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, } from "react-redux";

import CustomLayout from "./components/container/Layout";
import BaseRoute from "./components/routes";
import * as action from "./store/actions/auth";

import "antd/dist/antd.css";

function App() {
    // Вызываем хук для вызова действий - action в хранилище, которые взаимодействуют с состояниями
    const dispatch = useDispatch();

    // При загрузке и обновлении страницы будет идти проверка на вход в системе
    useEffect(() => {
        dispatch(action.authCheckState());
    }, []);

    return (
        <div>
            <Router>
                <CustomLayout>
                    <BaseRoute />
                </CustomLayout>
            </Router>
        </div>
    );
}

export default App;
