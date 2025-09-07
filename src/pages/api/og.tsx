import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export async function GET({ request }: { request: Request }) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'Weib-Coding Property';
  const price = searchParams.get('price') ?? '';
  const loc   = searchParams.get('loc') ?? '';
  const img   = searchParams.get('img') ?? '';

  const bg = img || 'https://weib-coding.vercel.app/images/hero/de.jpg';

  return new ImageResponse(
    (
      <div style={{
        width: '1200px', height: '630px', display: 'flex', position:'relative',
        fontFamily: 'Inter', color: '#fff'
      }}>
        <img src={bg} width="1200" height="630" style={{objectFit:'cover', position:'absolute', inset:0}}/>
        <div style={{
          position:'absolute', inset:0,
          background: 'linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,.35) 40%, rgba(0,0,0,.75))'
        }}/>
        <div style={{display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'48px', gap:'16px', width:'100%'}}>
          <div style={{fontSize: 54, fontWeight: 700, lineHeight: 1.1, textShadow:'0 2px 12px rgba(0,0,0,.35)'}}>{title}</div>
          <div style={{display:'flex', gap:'20px', fontSize:28}}>
            {loc && <div>📍 {loc}</div>}
            {price && <div>💰 {price} THB</div>}
          </div>
          <div style={{marginTop: 12, fontSize: 22, opacity:.9}}>Weib-Coding Real Estate</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
