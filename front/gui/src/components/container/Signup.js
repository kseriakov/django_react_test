import { Form, Input, Button } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../store/actions/auth";

import { Spin } from "antd";

const Spinner = () => <Spin />;

const App = () => {
    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoading = useSelector(({ loading }) => loading);
    const errorMessage = useSelector(({ error }) => error) ?? null;

    const onFinish = ({username, email, password, confirm}) => {
        dispatch(actions.authSingUp(username, email, password, confirm));
        navigate("/", { replace : true });
    };

    return (
        <>
            <p>{errorMessage}</p>
            {isLoading ? (
                <Spinner />
            ) : (
                <Form form={form} name="register" onFinish={onFinish} scrollToFirstError>
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
                        name="email"
                        rules={[
                            {
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },
                            {
                                required: true,
                                message: "Please input your E-mail!",
                            },
                        ]}
                    >
                        <Input
                            type="email"
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="Email"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Please input your password!"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        new Error(
                                            "The two passwords that you entered do not match!"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Please input your password!"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginRight: "10px" }}>
                            SingUp
                        </Button>
                        or
                        <NavLink style={{ marginLeft: "10px" }} to="/login/">
                            Login
                        </NavLink>
                    </Form.Item>
                </Form>
            )}
        </>
    );
};

export default App;
