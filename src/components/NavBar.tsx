/**
 * 
 */

import React, { useState } from "react";
import { 
    Layout, Menu, Button, Drawer, Row, Col, Input
 } from "antd";
import {
    HomeOutlined,
    UserOutlined,
    SettingOutlined,
    MenuOutlined,
} from "@ant-design/icons";
import FormModal from "./FormModal";

const { Header } = Layout;

const NavBar = () => {

    const { Search } = Input;
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const [formOpen, setFormOpen] = useState<boolean>(false);

    const showDrawer = () => {
        setDrawerVisible(true);
    };
    const onClose = () => {
        setDrawerVisible(false);
    };


    function onSearch (value: string) {
        console.log(value);
    }

    function signinClick(e:React.MouseEvent<HTMLButtonElement>) {
        // console.log("signinClick ", e.target);
        setFormOpen(prev => !prev);
    }
    function signupClick(e:React.MouseEvent<HTMLButtonElement>) {
        // console.log("signupClick ", e.target);
        setFormOpen(prev => !prev);
    }


    return (
        <div>
        <Layout className="layout">
            <Header style={{ padding: 0 }}>
                <Row justify="space-between" align="middle">
                    <Col xs={20} sm={20} md={4}>
                        <div className="logo"
                            style={{ color: "white", paddingLeft: "20px" }}>
                            Logo
                        </div>
                    </Col>
                    <Col xs={0} sm={0} md={20}>
                        <Menu theme="dark" mode="horizontal"
                            defaultSelectedKeys={["1"]}>

                            <Menu.Item key="1" icon={<HomeOutlined />} >
                                Home
                            </Menu.Item>

                            <Menu.Item key="2" icon={<UserOutlined />} >
                                Profile
                            </Menu.Item>

                            <Menu.Item key="3" icon={<SettingOutlined />} >
                                Settings
                            </Menu.Item>

                            <Menu.Item key="4">
                                <Search style={{marginTop: "7%"}}
                                placeholder="input search text" 
                                onSearch={onSearch} enterButton />
                            </Menu.Item>
                            
                            <Menu.Item  key="5"
                                style={{ flexGrow: 1, pointerEvents: "none" }} >
                            </Menu.Item>

                            <Menu.Item key="6" style={{ marginRight: "5%" }}>
                                <Button type="primary" onClick={signinClick}  
                                style={{ marginRight: "10px" }}>
                                    Sign in
                                </Button>
                                <Button onClick={signupClick}>Sign up</Button>
                            </Menu.Item>

                        </Menu>
                    </Col>
                    <Col xs={2} sm={2} md={0} style={{ marginRight: "3%" }}>
                        <Button type="primary" onClick={showDrawer}>
                            <MenuOutlined />
                        </Button>
                    </Col>
                </Row>
                <Drawer
                    title="Menu"
                    placement="right"
                    onClick={onClose}
                    onClose={onClose}
                    open={drawerVisible}>
                    <Menu mode="vertical" defaultSelectedKeys={["1"]}>

                        <Menu.Item key="1" icon={<HomeOutlined />}>
                            Home
                        </Menu.Item>

                        <Menu.Item key="2" icon={<UserOutlined />}>
                            Profile
                        </Menu.Item>

                        <Menu.Item key="3" icon={<SettingOutlined />}>
                            Settings
                        </Menu.Item>

                        <Menu.Item key="4" >
                            <Button type="primary" onClick={signinClick} 
                            style={{ marginRight: "10px" }}>
                                Sign in
                            </Button>
                            <Button onClick={signupClick} >
                                Sign up
                                </Button>
                        </Menu.Item>

                    </Menu>
                </Drawer>
            </Header>
        </Layout>

        <FormModal formOpen={formOpen} setFormOpen={setFormOpen} />

        </div>
    );
};

export default NavBar;
