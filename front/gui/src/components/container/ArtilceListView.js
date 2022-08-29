import { useEffect, useState } from "react";

import Article from "../Article";
import CustomForm from "../From";
import useAuth from "../../hooks/auth.hook";

export const getApiData = async (url, token) => {
    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Could not fetch, response with error, status ${response.status}`);
        }
        return await response.json();
    } catch (err) {
        console.error("Error with fetch, status code");
        throw err;
    }
};

const ArticleList = () => {
    const url = "http://127.0.0.1:8000/api/";
    const { tokenAuth } = useAuth();

    const [listData, setListData] = useState([]);

    useEffect(() => {
        if (tokenAuth) {
            uploadData();
        }
    }, [tokenAuth]);

    const uploadData = async () => {
        const result = await getApiData(url, tokenAuth);
        setListData(result);
    };

    return (
        <>
            <Article data={listData} />
            <br />
            <CustomForm method="post" updateData={uploadData} url={url} />
        </>
    );
};

export default ArticleList;
