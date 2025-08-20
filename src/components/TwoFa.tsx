import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import {Flex, Input, Space} from "antd";
import {useEffect, useState} from "react";
import {api} from "../utils/api.ts";
import type {ResponseLoginDto} from "../dto/ResponseLoginDto.ts";
import axios from "axios";
import {onLoginSuccess} from "../utils/onLoginSuccess.ts";
import {useSearchParams} from "react-router";

export const TwoFa = () => {
    const [value, setValue] = useState<string>();
    const [query] = useSearchParams()
    const sendCode = async (code: string) => {
        try {
            const result: ResponseLoginDto = await api.post("/register2fa", {code})
            console.debug(result);
            if (result.status === 200 && result.data?.token) {
                onLoginSuccess(query, result.data.token);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        if (value?.length === 6) {
            sendCode(value);
        }
    }, [value])

    return (
        <Flex vertical align="center">
            <Space direction="vertical" size={"middle"} align={"center"}>
                <Title>Enter verification code</Title>
                <Text>Enter the 6-digit code from your authenticator.</Text>
                <Input.OTP inputMode={"numeric"} size={"large"} value={value} onChange={(e) => setValue(e)} autoFocus/>
            </Space>
        </Flex>
    )
}