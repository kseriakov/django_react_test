import { Button, Form, Input, Radio } from "antd";
import { useState } from "react";

import useAuth from "../hooks/auth.hook";

const CustomForm = (props) => {
    const [form] = Form.useForm();

    const [valueTitle, setValueTitle] = useState(null);
    const [valueContent, setValueContent] = useState(null);

    const { tokenAuth } = useAuth();

    const resetValues = () => {
        setValueTitle(null);
        setValueContent(null);
    }
    
    const changeValueTitle = (e) => {
        setValueTitle(e.target.value);
    };

    const changeValueContent = (e) => {
        setValueContent(e.target.value);
    };

    const onSubmitForm = (e, method) => {
        e.preventDefault();

        const title = e.target.title.value;
        const content = e.target.content.value;

        sendDataOnServer({ title, content }, method);
        resetValues();
    };

    const sendDataOnServer = (data, method) => {
        const url = props.url;

        const body = JSON.stringify({ title: data.title, content: data.content });
        const headers = {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Token ${tokenAuth}`
        };

        fetch(url, { method, body, headers })
            .then(() => {
                switch (method) {
                    case "post": {
                        return props.updateData();
                    }
                    case "put": {
                        return window.location.reload();
                    }
                    default: return;
                }
            })
            .catch((err) => console.error(err));
    };

    const { method } = props;

    return (
        <Form form={form} layout="vertical" onSubmitCapture={(e) => onSubmitForm(e, method)}>
            <Form.Item label="Title:">
                <Input
                    placeholder="input title"
                    name="title"
                    value={valueTitle}
                    onChange={changeValueTitle}
                />
            </Form.Item>
            <Form.Item label="Content:">
                <Input
                    placeholder="input content"
                    name="content"
                    value={valueContent}
                    onChange={changeValueContent}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {method}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CustomForm;
