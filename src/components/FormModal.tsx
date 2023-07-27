/**
 * 
 */

import React, { useState, useEffect } from 'react';
import {
    Modal, Button, Checkbox,
    DatePicker, Form, Input,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;


export default function FormModal(
    props: {
        formOpen: boolean,
        setFormOpen: React.Dispatch<React.SetStateAction<boolean>>
    }) {

    const baseUrl = process.env.REACT_APP_SERVER_URL;

    // const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        setIsModalOpen(props.formOpen);
    }, [props.formOpen]);


    async function onFinish (values: any) {
        closeModal();
        console.log('Submitting:', values);
        const res = await axios.post(`${baseUrl}/users/signup`, values);
        console.log('res.data: ', res.data);
    };

    const onFinishFailed = (errorInfo: any) => {
        closeModal();
        console.log('Failed:', errorInfo);
    };


    const closeModal = () => {
        setIsModalOpen(false);
        props.setFormOpen(false);
    };

    return (
        <>
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
                            label="Full Name"
                            name="name"
                            rules={[{
                                required: true,
                                message: 'Please enter your full name'
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
                            label="Email"
                            name="email"
                            rules={[{
                                required: true,
                                message: 'Please enter a valid email'
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

                        {/* <Form.Item name="remember" valuePropName="checked" 
                                    wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item> */}

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

