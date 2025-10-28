// @ts-ignore
import { IronSessionOptions } from "iron-session";
import {User} from "@/types/data";
export type SessionData = {
    user?: User;
};

export const sessionOptions: IronSessionOptions = {
    password: process.env.NEXT_PUBLIC_SESSION_PASSWORD, // 32자 이상 강한 키(.env.development 등)
    cookieName: 'sid',
    cookieOptions: {
        secure: true,         // https에서 true 권장
        httpOnly: true,       // JS에서 접근 불가
        sameSite: 'lax',
        maxAge: 60*7
    },
};
