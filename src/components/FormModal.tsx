/**
 * 
 */

import React, { useState, useEffect } from 'react';
import {
    Modal, Button, Menu,
    DatePicker, Form, Input,
} from 'antd';
import { 
    UserOutlined, LoginOutlined, LogoutOutlined, FormOutlined 
} from "@ant-design/icons";
import axios from 'axios';
import { useUserContext } from '../contexts/UserContext';
import { validateSignUp, validateSignIn } from "../utilities/utils"


export default function FormModal() {

    const baseUrl = process.env.REACT_APP_SERVER_URL;

    const { loggedUser, setLoggedUser } = useUserContext();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isSignUp, setIsSignUp] = useState<boolean>(false);


    useEffect(() => {
        reLogUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    async function reLogUser() {
        try {
            const token = localStorage.getItem('loggedUser')
            if (token) {
                const res = await axios.get(`${baseUrl}/users/logged`,
                    { headers: { authorization: `Bearer ${token}` } });
                console.log("res = ", res.data.user._doc);
                setLoggedUser(res.data.user._doc);
            }
        } catch (error) {
            if (error instanceof Error)
                console.log("Error at reLogUser: ", error.message);
            console.error(error);
        }
    }


    async function onFinish(values: any) {
        closeModal();
        console.log(typeof values , ' Submitting: ', values);
        let res;
        try {
            if (isSignUp) {
                const valid = validateSignUp(values);
                console.log(valid);
                res = await axios.post(`${baseUrl}/users/signUp`, values);
            } else {
                const valid = validateSignIn(values);
                console.log(valid);
                res = await axios.post(`${baseUrl}/users/signIn`, values);
            }
            console.log('onFinish res.data: ', res.data);
            if (res.data.user._doc) {
                setLoggedUser(res.data.user._doc);
                localStorage.setItem('loggedUser', res.data.token);
            }
        } catch (error) {
            if (error instanceof Error)
                console.log("Error at onFinish: ", error.message);
            console.error(error);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        closeModal();
        console.log('Failed:', errorInfo);
    };


    const closeModal = () => {
        setIsModalOpen(false);
    };
    function signInClick() {
        setIsSignUp(false);
        setIsModalOpen(prev => !prev);
    }
    function signUpClick() {
        setIsSignUp(true);
        setIsModalOpen(prev => !prev);
    }
    function signOutClick() {
        setLoggedUser(null);
        localStorage.clear();
    }


    const signUpFields =
        <>
            <Form.Item
                label="PasswordConfirm"
                name="passwordConfirm"
                rules={[{
                    required: true,
                    message: 'Please confirm your password'
                }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="Full Name"
                name="name"
                rules={[{
                    required: true,
                    message: 'Please enter your full name'
                }]}>
                <Input />
            </Form.Item>
            <Form.Item name="birthDate" label="Date of Birth">
                <DatePicker />
            </Form.Item>
            <Form.Item
                label="Phone Number" name="phone">
                <Input />
            </Form.Item>
        </>

    const loginButtons =
        <>
            <Button type="primary"
                onClick={signInClick}
                style={{ marginRight: "10px" }}>
                <LoginOutlined /> Sign in
            </Button>
            <Button onClick={signUpClick} >
                <FormOutlined /> Sign Up
            </Button>
        </>

    const logoutButton =
        <Button type="primary"
            onClick={signOutClick}
            style={{ marginRight: "10px" }}>
            <LogoutOutlined /> Sign Out
        </Button>


    return (
        <>
            <Menu.Item key="register" className="logButtons"
                style={{
                    paddingInline: 5,
                    position: "absolute",
                    right: 0
                }}
                >
                {loggedUser ? logoutButton : loginButtons}
            </Menu.Item>

            <Modal title={isSignUp ? "SignUp" : "SignIn"}
                open={isModalOpen} onCancel={closeModal}
                footer={[
                    <Button key="back" onClick={closeModal}>
                        Return
                    </Button>
                ]}>

                <>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off">

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{
                                required: true,
                                message: 'Please enter a valid email'
                            }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{
                                required: true,
                                message: 'Please enter a password'
                            }]}>
                            <Input.Password />
                        </Form.Item>

                        {isSignUp ? signUpFields : ''}

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>

                    </Form>
                </>

            </Modal>
        </>
    );
}

