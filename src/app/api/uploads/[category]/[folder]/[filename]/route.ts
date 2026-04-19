import { NextResponse } from "next/server";
import fs from 'fs'
import path from 'path'


export const GET = async (request: Request, { params }: { params: Promise<{category: string, folder: string, filename: string }> }) => {
  try {

    const {category, folder, filename } = await params

    const filePath = path.join(process.cwd(), 'src', 'app', 'uploads', category, folder, filename)

    const image = fs.readFileSync(filePath)
   
    const ext = path.extname(filename).toLowerCase();
    const type = ext.split('.').pop()

    let contentType = "application/octet-stream";
    contentType = `image/${type}`



    return new NextResponse(image, {
          status: 200,
          headers: {
            "Content-Type": contentType,
          },
        })
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Error fetching file' }, { status: 500 })
  }
}