import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import useAuth from "../../hooks/auth.hook";

import * as actions from "../../store/actions/auth";

import { Spin } from "antd";

const Spinner = () => <Spin />;

const LoginForm = () => {
    const { dispatch, navigate, isLoading, errorMessage, tokenAuth } = useAuth();


    useEffect(() => {
        if (errorMessage === null && tokenAuth !== null) {
            navigate("/", { replace: true });
        }
    }, [tokenAuth]);

    const onFinish = ({ username, password }) => {
        dispatch(actions.authLogin(username, password));
        // dispatch(actions.test(Math.random()));
    };


    return (
        <>
            <p>{errorMessage}</p>
            {isLoading ? (
                <Spinner />
            ) : (
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Username!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginRight: "10px" }}>
                            Login
                        </Button>
                        or
                        <NavLink style={{ marginLeft: "10px" }} to="/signup">
                            SingUp
                        </NavLink>
                    </Form.Item>
                </Form>
            )}
        </>
    );
};

export default LoginForm;
