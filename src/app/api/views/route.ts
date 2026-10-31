import { getStore } from "@netlify/blobs";

export const dynamic = "force-dynamic";

const KEY = "portfolio";
const isDev = process.env.NODE_ENV === "development";

// Fuera de Netlify (npm run dev) no hay store: en desarrollo se usa un contador
// en memoria; en producción se devuelve null y el contador se oculta
let devViews = 1284;

const store = () => getStore({ name: "views", consistency: "strong" });

const read = async () => Number((await store().get(KEY)) ?? 0);

export async function GET() {
  try {
    return Response.json({ views: await read() });
  } catch {
    return Response.json({ views: isDev ? devViews : null });
  }
}

export async function POST() {
  try {
    const views = (await read()) + 1;
    await store().set(KEY, String(views));
    return Response.json({ views });
  } catch {
    return Response.json({ views: isDev ? ++devViews : null });
  }
}
