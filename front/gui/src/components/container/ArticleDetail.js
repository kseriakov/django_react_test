import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getApiData } from "./ArtilceListView";
import CustomForm from "../From";
import useAuth from "../../hooks/auth.hook";

import "antd/dist/antd.css";
import { Button, Card } from "antd";

const ArticleDetail = () => {
    const id = useParams().articleId;
    const url = `http://127.0.0.1:8000/api/${id}/`;

    const [data, setData] = useState([]);
    const { tokenAuth } = useAuth();

    let navigate = useNavigate();

    useEffect(() => {
        if (tokenAuth) {
            uploadData();
        }
    }, [tokenAuth]);

    const uploadData = async () => {
        const result = await getApiData(url, tokenAuth);
        setData(result);
    };

    const onDeleteArticle = (e) => {
        e.preventDefault();

        fetch(url, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${tokenAuth}`,
            },
        })
            .then(() => navigate("/", { replace: true }))
            .catch((err) => console.error(err));
    };

    return (
        <>
            <Card title={data.title}>
                <p>{data.content}</p>
            </Card>
            <CustomForm method="put" url={url} />
            <Button type="danger" onClick={onDeleteArticle}>
                Delete
            </Button>
        </>
    );
};

export default ArticleDetail;
