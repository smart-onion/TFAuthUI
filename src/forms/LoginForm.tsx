import {type FormProps, message} from 'antd';
import {Button, Form, Input} from 'antd';
import type {ResponseLoginDto} from "../dto/ResponseLoginDto.ts";
import {api} from "../utils/api.ts"
import {LockOutlined, MailOutlined} from "@ant-design/icons";
import axios from 'axios';
import {useState} from "react";
import {useLoginUpdate} from "../app/LoginContext.tsx";
import {useSearchParams} from "react-router";
import {onLoginSuccess} from "../utils/onLoginSuccess.ts";

type FieldType = {
    email?: string;
    password?: string;
};


export const LoginForm = ({...props}: FormProps) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [messageApi, contextGolder] = message.useMessage()
    const setLogin = useLoginUpdate()
    const [query] = useSearchParams()
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            setLoading(true);
            const result: ResponseLoginDto = await api.post("login", values);
            if (result.status === 200 && result.data?.token) {
                onLoginSuccess(query, result.data.token)
            }else{
                setLogin(result);
            }
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                let errorMsg = "";
                if(error.code === "ERR_NETWORK"){
                    errorMsg = error.message;
                }
                if(error.response){
                    errorMsg = error.response.data.message
                    if (error.response.status === 401) {
                        console.log(error.response)
                    }
                }

                messageApi.error(errorMsg || "Ops.. you have a problem!");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextGolder}
            <Form form={form} onFinish={onFinish} {...props}>
                <Form.Item name="email"
                           rules={[{required: true, message: 'Email is required', type: 'email'}]}>
                    <Input prefix={<MailOutlined/>} placeholder="Email"
                           style={{fontSize: 18, borderColor: "rgb(0, 37, 105, 0.7)"}}/>
                </Form.Item>
                <Form.Item name="password"
                           rules={[{required: true, message: 'Please input your password!'}]}>
                    <Input.Password prefix={<LockOutlined/>} name={"password"} placeholder="Password"
                                    style={{fontSize: 18, borderColor: "rgb(0, 37, 105, 0.7)"}}/>
                </Form.Item>
                <Form.Item shouldUpdate>
                    {() => (
                        <Button type={"primary"}
                                htmlType="submit"
                                loading={loading}
                                size={"large"}
                                style={{fontSize: 18, width: "100%"}}
                        >Login</Button>)}
                </Form.Item>
            </Form>
        </>
    )
}

