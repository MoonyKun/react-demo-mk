import React from 'react';
import { Button, Form, Input,Image } from 'antd';
import axios from "axios";
import {useNavigate} from "react-router-dom";



const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const Login = () => {
    const navigate = useNavigate()
    const changePath = () => {
        navigate("/index")
    }
    const onFinish = (values) => {
        console.log('Success:', values);
        const formData = new FormData();
        for (const key in values) {
            formData.append(key,values[key])
        }
        axios.post("/api/user/login",formData).then((res) => {
            console.log(res);
            if (res.data.message === "success") {
                changePath();
            }
        });
    };
    return (

        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)'
        }}>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="账号"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="验证码"
                    name="captcha"
                    rules={[
                        {
                            required: true,
                            message: '验证码!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Image style={{
                }}
                       src="/api/captcha"
                />
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" block="80" >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default Login;