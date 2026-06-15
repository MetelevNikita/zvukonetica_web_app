import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";


export const POST = async (req: Request) => {
    try {

        const {email, password} = await req.json()

        const adminLogin = process.env.ADMIN_LOGIN
        const adminPassword = process.env.ADMIN_PASSWORD

        if (adminLogin !== email || adminPassword !== password) {
            return NextResponse.json({
                success: false,
                mesagge: 'Неверные логин или пароль',
            })
        }

        const secret = new TextEncoder().encode(process.env.SECRET_KEY)

        const token = await new SignJWT({
            login: email,
            role: 'admin'
        })
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(secret)

        const response = NextResponse.json({
            success: true,
            message: 'Вход разрешен',
        })

        response.cookies.set('token', token)
        return response
        
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            return NextResponse.json({
                success: false,
                message: `Error ${error.message}`,
            })
        }

        return NextResponse.json({
            success: false,
            message: `unknown error ${error}`,
        })
    }
}