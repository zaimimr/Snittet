import { init } from "@/utils/db";

export async function GET(request: Request) {
  const data = await init();
  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json" },
  });
}
