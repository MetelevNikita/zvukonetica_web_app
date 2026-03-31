import { NextRequest, NextResponse } from "next/server";

// 

import fs from 'fs'
import path from 'path'


export const GET = async (req: NextRequest, { params }: {params: Promise<{filename: string}>}) => {
  try {

    const { filename } = await params


    const filePath = path.join(process.cwd(), 'src', 'app', 'uploads', 'diplom', filename)
    const image = fs.readFileSync(filePath)


    const ext = path.extname(filename)
    const type = ext.split('.').pop()

    let contentType = `image/${type}`

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