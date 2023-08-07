/**
 * 
 */

import { useState, useEffect } from 'react';
import {
    Modal, Button, Menu, DatePicker,
    Form, Input, Select,
} from 'antd';
import {
    LoginOutlined, LogoutOutlined, FormOutlined
} from "@ant-design/icons";
import axios from 'axios';
import { useUserContext } from '../contexts/UserContext';
import { User } from '../contexts/UserType';
// import { validateSignUp, validateSignIn } from "../utilities/utils"

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
            <Option value="05">+05</Option>
            <Option value="02">+02</Option>
            <Option value="03">+03</Option>
            <Option value="04">+04</Option>
            <Option value="07">+07</Option>
            <Option value="08">+08</Option>
            <Option value="09">+09</Option>
            {/* <Option value="1800">+1800</Option> */}
        </Select>
    </Form.Item>
);


export default function FormModal() {

    const baseUrl = process.env.REACT_APP_SERVER_URL;

    const [form] = Form.useForm();
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
        values.phone = `${values.prefix}-${values.phone}`;
        delete values.prefix;
        const userDetails = { ...values } as User;
        console.log(' Submitting: ', userDetails);
        let res;
        try {
            if (isSignUp) {
                // const valid = validateSignUp(values);
                res = await axios.post(`${baseUrl}/users/signUp`, userDetails);
            } else {
                // const valid = validateSignIn(values);
                res = await axios.post(`${baseUrl}/users/signIn`, userDetails);
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
                name="passwordConfirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[{
                    required: true,
                    message: 'Please confirm your password',
                }, {
                    min: 4,
                    message: 'Password must be at least 4 characters',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value)
                            return Promise.resolve();
                        return Promise.reject(
                            new Error('The passwords do not match'));
                    },
                })]}>
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="name"
                label="Name"
                tooltip="What do you want others to call you?"
                rules={[{
                    required: true,
                    message: 'Please enter a name',
                    whitespace: true
                }, {
                    min: 3,
                    message: 'Name must be at least 3 characters',
                }, {
                    max: 20,
                    message: 'Name must be no more than 20 characters',
                }]}>
                <Input />
            </Form.Item>

            <Form.Item
                name="birthDate"
                label="Date of Birth"
                rules={[{
                    required: true,
                    message: 'Please select your date of birth'
                },
                () => ({
                    validator(_, value) {
                        const sixteenYearsAgo = new Date();
                        sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16);
                        if (value < sixteenYearsAgo)
                            return Promise.resolve();
                        return Promise.reject(
                            new Error('Must be at least 16 to register'));
                    },
                })]}>
                <DatePicker />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                    // { required: true, message: 'Please enter a phone number' },
                    {
                        min: 4,
                        message: 'Phone number must be at least 6 digits (including prefix)',
                    }, {
                        max: 18,
                        message: 'Phone number must be no more than 20 digits (including prefix)',
                    }
                ]}
            >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
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
                    </Button>,
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                ]}>

                <>
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                        scrollToFirstError
                    >

                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[{
                                type: 'email',
                                message: 'Please enter a valid E-mail',
                            }, {
                                required: true,
                                message: 'Please enter an E-mail',
                            }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{
                                required: true,
                                message: 'Please enter a password',
                            }, {
                                min: 4,
                                message: 'Password must be at least 4 characters',
                            }]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        {isSignUp ? signUpFields : ''}

                    </Form>
                </>

            </Modal>
        </>
    );
}

