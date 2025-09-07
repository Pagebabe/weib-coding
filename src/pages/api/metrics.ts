export async function GET() {
  return new Response(JSON.stringify({ message: 'Metrics endpoint - use POST to send data' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.json();
    console.log('[metrics] received', JSON.stringify(body));
    // TODO: Persist metrics to an external monitoring service or database
  } catch (e) {
    console.warn('[metrics] invalid payload', e);
  }
  return new Response(null, { status: 204 });
}
