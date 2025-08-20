import Title from "antd/es/typography/Title";
import {Divider, Flex, Image, Input, message, Space} from "antd";
import Text from "antd/es/typography/Text";
import {CopyOutlined} from "@ant-design/icons";

export const QrCode = ({manualCode, qrCode}: { manualCode: string, qrCode: string }) => {

    const [messageApi, contextGolder] = message.useMessage()
    const handleCopy = () => {
        navigator.clipboard.writeText(manualCode)
            .then(() => messageApi.success("Copied!"))
            .catch(() => messageApi.error("Copy failed"));
    };

    return (
        <>
            {contextGolder}
            <Flex vertical align={"center"}>
                <Title>2FA setup</Title>
                <Space direction={"vertical"} align={"center"} size={"large"}>
                    <Text style={{fontSize: 16}}>Scan the image below with your 2FA authenticator.</Text>
                    <Image src={qrCode} width={256} alt="QR"/>
                </Space>
                <Divider>OR</Divider>
                <Text style={{fontSize: 16}}>Manually enter the code below.</Text>
                <Input
                    inputMode={"none"}
                    value={manualCode}
                    size={"large"}
                    suffix={
                        <CopyOutlined
                            onClick={() => {
                                handleCopy();
                            }}
                            style={{cursor: "pointer"}}
                        />
                    }
                />
            </Flex>
        </>
    )
}