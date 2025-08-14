import React from 'react';
import type {FormProps} from 'antd';
import {Button, Form, Input} from 'antd';
import type {ResponseLoginDto} from "../dto/ResponseLoginDto.ts";
import axios from 'axios';

type FieldType = {
    email?: string;
    password?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const result = await axios.post<ResponseLoginDto>("https://localhost:7132/auth/account/login", values, {
        withCredentials: true
    })
    console.log(result)
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export const Login: React.FC = () => (
    <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateTrigger={"onSubmit"}
    >
        <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{required: true, message: 'Please input your username!', type: 'email'}]}
        >
            <Input />
        </Form.Item>

        <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{required: true, message: 'Please input your password!'}]}
        >
            <Input.Password/>
        </Form.Item>

        <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
);

