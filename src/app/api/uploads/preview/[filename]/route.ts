import { NextRequest, NextResponse } from "next/server";

// 

import fs from 'fs'
import path from 'path'

export const GET = async (req: NextRequest, context: {params: {filename: string}}) => {
    try {

        const {filename} = await context.params

        const file = path.join(process.cwd(), 'src', 'app', 'uploads', 'preview', filename)
        const image = fs.readFileSync(file)

        const extname = path.extname(file).split('.').pop()
        let contentType = `image/${extname}`

        return new NextResponse(image, {
            status: 200,
            headers: {
                "Content-Type": contentType,
            },
        })
        
    } catch (error) {
    return NextResponse.json({ error: 'Error fetching file' }, { status: 500 })
    }
}