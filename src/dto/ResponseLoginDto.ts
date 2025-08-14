import type {SerializedError} from "@reduxjs/toolkit";
import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";

export interface ResponseLoginDto {
    data?:{
        status?: "2fa_QRCode" | "2fa_required" | 200
        qrCode?: string
    }
    error?: FetchBaseQueryError | SerializedError | undefined

}