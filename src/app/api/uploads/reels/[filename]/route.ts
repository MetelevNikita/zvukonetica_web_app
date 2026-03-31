import { NextRequest, NextResponse } from "next/server";

// 


import fs from 'fs'
import path from "path";

// 


export const GET = async (req: NextRequest, { params }: {params: Promise<{filename: string}>}) => {
  try {

    const { filename } = await params

    const filePath = path.join(process.cwd(), 'src', 'app', 'uploads', 'reels', filename)
    console.log(filePath)



    return NextResponse.json({message: 'video is DONE'}, {status: 200})
    
  } catch (error) {
    return NextResponse.json({message: 'Error fetch video'}, {status: 500})
  }
}