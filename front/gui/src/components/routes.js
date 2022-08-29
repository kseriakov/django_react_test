import { Routes, Route } from "react-router-dom";
import ArticleList from "./container/ArtilceListView";
import ArticleDetail from "./container/ArticleDetail";
import Login from "./container/Login";
import Signup from "./container/Signup";


const BaseRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/:articleId/" element={<ArticleDetail />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/signup/" element={<Signup />} />
        </Routes>
    );
};


export default BaseRoute;