import { NextResponse } from "next/server";
import { XMLParser } from 'fast-xml-parser';



export const GET = async () => {
  try {

    const BASE_URL = 'https://storage.yandexcloud.net'
    const BUCKET_NAME = 'zvukonetica88'

    const url = `${BASE_URL}/${BUCKET_NAME}/?list-type=2&prefix=reels/`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const xmlText = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      parseAttributeValue: true
    });

     const result = parser.parse(xmlText);

     const list = result.ListBucketResult.Contents.filter((empty: any) => {

      const split = empty.Key.split('/')[1]
      
      if (split.length < 1) {
        return
      } else {
        return empty
      }

     }).map((item: any) => `https://storage.yandexcloud.net/zvukonetica88/${item.Key}`)


      return NextResponse.json({
        message: 'DATA',
        data: list
      })

    
  } catch (error: Error | unknown) {
      
      if (error instanceof Error) {
  
        console.error(`Оишкба получения видео ${error.message}`)
  
        return NextResponse.json({
          success: false,
          message: `Оишкба получения видео ${error.message}`,
          data: null
        })
      }
  
  
      console.error(`Неизвестная ошибка ${error}`)
  
      return NextResponse.json({
        success: false,
        message: `Неизвестная ошибка ${error}`,
        data: null
      })
  
      
    }
}