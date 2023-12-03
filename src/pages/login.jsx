import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Typography, notification } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const onFinish = (values) => {
        localStorage.setItem('user', JSON.stringify(values));
        navigate('/');
    };

    return (
        <div
            style={{
                boxSizing: 'border-box',
                width: '100%',
                height: '100vh',
                display: 'flex',
                boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                overflow: 'hidden'
            }}
        >   
            {contextHolder}
            <div style={{
                boxSizing: 'border-box',
                width: '60%',
                height: '100%',
            }}>
                <img
                    src='https://dtsoft.vn/upload/upload/smarthome%2001.jpg'
                    style={{width:'100%', height: '100%'}}
                />
            </div>
            <div style={{
                margin: '2rem 0 1rem 3rem',
                maxWidth: '30%'
            }}>
                <Typography.Title style={{fontSize: '2rem', margin: '1.5rem 0'}}>
                    Login
                </Typography.Title>
                <Typography.Text style={{fontSize: '1rem', fontWeight: 'bold'}}>
                    Login to your account
                </Typography.Text>
                <div>
                    <Typography.Text type='secondary'>
                        Thank you gor get back to our website, lets access our the best recommendation for you
                    </Typography.Text>
                </div>
                <Divider />
                <Form
                    layout='vertical'
                    name="normal_login"
                    style={{
                        minWidth: '50%',    
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                            required: true,
                            message: 'Không được để trống',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                            required: true,
                            message: 'Không được để trống',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                width: '100%',
                                height: '2.3rem',
                                marginBottom: '2rem',
                                backgroundColor: '#1677ff'
                            }}
                        >
                            Sign in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;