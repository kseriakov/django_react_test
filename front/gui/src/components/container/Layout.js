import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import * as actions from "../../store/actions/auth";

import "antd/dist/antd.css";
import "./Layout.css";
import { Breadcrumb, Layout, Menu } from "antd";

const { Header, Content, Footer } = Layout;

const CustomLayout = (props) => {
    // Получаем данные о токене из хранилища store
    const isAuthenticated = useSelector(({ token }) => token !== null);

    const dispatch = useDispatch();

    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
                    {isAuthenticated ? (
                        <Menu.Item key={2} onClick={() => dispatch(actions.logout())}>
                            Logout
                        </Menu.Item>
                    ) : (
                        <Menu.Item key={2}>
                            <Link to="/login">Login</Link>
                        </Menu.Item>
                    )}
                    <Menu.Item key={1}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content
                style={{
                    padding: "0 50px",
                }}
            >
                <Breadcrumb
                    style={{
                        margin: "16px 0",
                    }}
                >
                    <Breadcrumb.Item>
                        <Link to="/">Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/">List</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">{props.children}</div>
            </Content>
            <Footer
                style={{
                    textAlign: "center",
                }}
            >
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
    );
};
export default CustomLayout;
