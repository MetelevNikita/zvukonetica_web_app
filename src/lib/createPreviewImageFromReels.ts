import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs'


export async function createPreviewImageReels (input: string) {

    const endFolder = path.join(process.cwd(), 'src', 'app', 'uploads', 'preview')



    const parseFile = path.parse(input)


    try {


        if (fs.existsSync(path.join(endFolder, `${parseFile.name}.jpg`))) {
                return `/api/uploads/preview/${parseFile.name}.jpg`
        } else {
                const createPreview = spawn('ffmpeg', ['-i', `https://storage.yandexcloud.net/zvukonetica88/reels/${parseFile.base}`, '-ss', '00:00:00.100', '-vframes', '1', path.join(endFolder, `${parseFile.name}.jpg`)])


                createPreview.stdout.on('data', (data) => {
                    console.log(`stdout: ${data}`);
                });

                createPreview.stderr.on('data', (data) => {
                    console.error(`stderr: ${data}`);
                });

                createPreview.on('close', (code) => {
                    console.log(`child process exited with code ${code}`);
                });


                return `/api/uploads/preview/${parseFile.name}.jpg`
          }

        
    } catch (error) {
        console.log('ERROR ', error)
        
    }

}

