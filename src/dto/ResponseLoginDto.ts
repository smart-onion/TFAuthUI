import type {SerializedError} from "@reduxjs/toolkit";
import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";

export interface ResponseLoginDto {
    status?: number | string;
    data?:{
        status?: "2fa_QRCode" | "2fa_required" | 200
        qrCode?: {
            result: string
        }
        manualCode?: string
        token?: string
    }
    error?: FetchBaseQueryError | SerializedError | undefined
}