import {Col, Flex, Row, Image, Space} from 'antd';
import {LoginForm} from "../forms/LoginForm.tsx";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import {TwoFaPage} from "./TwoFaPage.tsx";

export const LoginPage = () => {


    return (
        <>
            <TwoFaPage />
            <Row style={{height: "100vh"}}>
                <Col lg={8} xs={24} md={10}>
                    <Flex align={"center"} justify={"center"}
                          style={{height: "100%", background: "url(wave-back.png)", backgroundSize: "cover"}}
                          vertical={true}>
                        <Flex align={"center"} vertical
                              style={{
                                  padding: "4em 2em",
                                  backdropFilter: "blur(2px) ",
                                  backgroundColor: "rgba(15, 75, 245, 0.15)",
                                  borderRadius: "1em",
                                  border: "2px solid rgba(7, 75, 245, 0.2)",
                                  boxShadow: "10px 10px 74px 0px rgba(0,0,0,0.25)"
                              }}>
                            <Space size={"middle"} direction={"vertical"} align={"center"}>
                                <Title>Welcome Back</Title>
                                <Text type={"secondary"}>Please sign in to your account</Text>
                                <LoginForm style={{width: '20em', fontSize: "42"}}/>
                            </Space>
                            <Text>Forgot your password?</Text>
                        </Flex>
                    </Flex>
                </Col>
                <Col lg={16} xs={0} md={14}>
                    <Image width="100%" height="100%" src={"sea-1.jpg"} preview={false} placeholder={<Image
                        width={"100%"} height={"100%"} src={"/sea-1-small.jpg"} style={{filter: "blur(15px)"}}
                    />}/>
                </Col>
            </Row>
        </>
    )
}

