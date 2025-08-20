import {createContext, type ReactNode, useContext, useState} from "react";
import type {ResponseLoginDto} from "../dto/ResponseLoginDto.ts";

type UpdateLoginFunc = (state: ResponseLoginDto) => void;

const LoginContext = createContext<ResponseLoginDto>({});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const LoginContextUpdate = createContext<UpdateLoginFunc>();
export const useLogin = () => useContext(LoginContext);
export const useLoginUpdate = () => useContext(LoginContextUpdate);

export function LoginProvider({children}: { children: ReactNode }) {

    const [state, setState] = useState<ResponseLoginDto>({});

    const setLoginState: UpdateLoginFunc = (state: ResponseLoginDto) => {
        setState(state);
    }


    return (
        <LoginContext.Provider value={state}>
            <LoginContextUpdate.Provider value={setLoginState}>
                {children}
            </LoginContextUpdate.Provider>
        </LoginContext.Provider>
    )
}

