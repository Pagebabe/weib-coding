export async function post({ request }: { request: Request }) {
  try {
    const body = await request.json();
    console.log('[metrics] received', JSON.stringify(body));
    // TODO: Persist metrics to an external monitoring service or database
  } catch (e) {
    console.warn('[metrics] invalid payload', e);
  }
  return new Response(null, { status: 204 });
}
