export async function onRequestPost({ request, env }) {
  try {
    const { aoi, options } = await request.json();
    return new Response(JSON.stringify({ ok: true, points: (aoi||[]).length }), {
      headers: { "content-type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok:false, error: String(e) }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
}
export async function onRequestGet() {
  return new Response("Method Not Allowed", { status: 405 });
}