/**
 * 
 */

import React, { useState, useEffect } from 'react';
import {
    Modal, Button, Checkbox, Menu,
    DatePicker, Form, Input,
} from 'antd';
import axios from 'axios';



export default function FormModal() {

    const baseUrl = process.env.REACT_APP_SERVER_URL;

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isSignUp, setIsSignUp] = useState<boolean>(false);


    // useEffect(() => {
    //     
    // }, []);


    async function onFinish(values: any) {
        closeModal();
        console.log('Submitting: ', values);
        if (isSignUp) {
            // Validate form data
            // const res = await axios.post(`${baseUrl}/users/signup`, values);
        } else {
            // const res = await axios.post(`${baseUrl}/users/signin`, values);
        }
        // console.log('res.data: ', res.data);
    };

    const onFinishFailed = (errorInfo: any) => {
        closeModal();
        console.log('Failed:', errorInfo);
    };


    const closeModal = () => {
        setIsModalOpen(false);
    };


    function signInClick(e:React.MouseEvent<HTMLButtonElement>) {
        // console.log("signInClick ", e.target);
        setIsSignUp(false);
        setIsModalOpen(prev => !prev);
    }
    function signUpClick(e:React.MouseEvent<HTMLButtonElement>) {
        // console.log("signUpClick ", e.target);
        setIsSignUp(true);
        setIsModalOpen(prev => !prev);
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


    return (
        <>
            <Menu.Item key="6" style={{ marginRight: "5%" }}>
                <Button type="primary"
                    onClick={signInClick}
                    style={{ marginRight: "10px" }}>
                    Sign in
                </Button>
                <Button onClick={signUpClick} >
                    Sign up
                </Button>
            </Menu.Item>

            <Modal title="Signup" open={isModalOpen} onCancel={closeModal}
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

