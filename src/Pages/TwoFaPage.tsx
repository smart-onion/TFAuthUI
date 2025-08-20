import {Button, Divider, Flex, Modal, Steps} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {type JSX, useEffect, useState} from "react";
import {MdOutlineQrCodeScanner} from "react-icons/md";
import {FaUserShield} from "react-icons/fa6";
import {QrCode} from "../components/QrCode.tsx";
import {TwoFa} from "../components/TwoFa.tsx";
import {useLogin} from "../app/LoginContext.tsx";

type StepType = {
    title: string;
    status: "wait" | "error" | "process" | "finish" | undefined;
    icon: JSX.Element;
}


export const TwoFaPage = () => {
    const login = useLogin();
    const [isScanned, setScanned] = useState(false);
    const [open, setOpen] = useState(false);
    const handleNext = async () => {
        if (!isScanned) {
            setScanned(true);
        }
    }
    useEffect(() => {
        const status = login.data?.status;
        console.log(login)
        if (status === "2fa_required" || status === "2fa_QRCode") {
            setOpen(true);
            if (status === "2fa_required") {
                setScanned(true);
            }
        }

    }, [login])
    const steps: StepType[] =
        [
            {
                title: "",
                status: "finish",
                icon: <UserOutlined/>,
            },
            {
                title: "",
                status: isScanned ? "finish" : "process",
                icon: <MdOutlineQrCodeScanner/>,
            }, {
            title: "",
            status: isScanned ? "process" : "wait",
            icon: <FaUserShield/>,
        }
        ]

    return (
        <Modal
            open={open}
            footer={null}
            onCancel={() => setOpen(false)}
        >
            {!isScanned ? (
                <>
                    <QrCode manualCode={login.data?.manualCode || ""} qrCode={login.data?.qrCode?.result || ""}/>
                    <Divider/>
                </>
            ) : (<>
                <TwoFa/>
            </>)}

            <Flex justify="end" vertical style={{paddingTop: isScanned ? '3em' : ""}}>
                <Steps items={steps} style={{marginBottom: 10}}/>
                <Button type="primary" size={"large"} htmlType="submit" onClick={handleNext}>Next</Button>
            </Flex>
        </Modal>
    )
}