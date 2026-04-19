import { NextResponse, NextRequest } from "next/server";


export const GET = async (req: NextRequest, res: NextResponse) => {
  try {

      const { searchParams } = new URL(req.url);
      const publicKey = searchParams.get('publicKey');
      const path = searchParams.get('path') ?? '/';

      if (!publicKey) {
        return NextResponse.json({ error: 'publicKey required' }, { status: 400 });
      }

      // получаем список файлов

      const yaUrl =`https://cloud-api.yandex.net/v1/disk/public/resources` + `?public_key=${encodeURIComponent(publicKey)}` + `&path=${encodeURIComponent(path)}&limit=100&sort=name` + `&preview_size=XXXL`;;

      const yaRes = await fetch(yaUrl, { cache: 'no-store' });
      if (!yaRes.ok) {
        return NextResponse.json({
          error: await yaRes.text()
        }, { status: yaRes.status });
      }

      const yaJson = await yaRes.json();


      // получаем пути к файлам


      const imagesOnly = yaJson._embedded.items.filter(
        (it: any) => it.type === 'file' && it.media_type?.startsWith('image')
      );


      const files = (
        await Promise.all(
          imagesOnly.map(async (item: any) => {
            const dlUrl =
              `https://cloud-api.yandex.net/v1/disk/public/resources/download` +
              `?public_key=${encodeURIComponent(publicKey)}` +
              `&path=${encodeURIComponent(item.path)}`;


              

            const dlRes = await fetch(dlUrl, { cache: 'no-store' });
            if (!dlRes.ok) return null;
            const { href } = await dlRes.json();

            return {
              name: item.name,
              url: href,           // прямая ссылка для <img>
              preview: item.preview ?? href, // лёгкое превью, если нужно
              path: item.path,
            };
          })
        )
      ).filter(Boolean)

      return NextResponse.json({
        message: 'IMAGE',
        data: files
      })

  } catch (error) {
    console.log('ERROR GALLERY', error)
    return error
  }
}