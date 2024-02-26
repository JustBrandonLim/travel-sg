import { pipeline } from "@xenova/transformers";

export async function POST(request: Request) {
  const data = await request.json();
  const analyse = await pipeline("sentiment-analysis");
  const out = await analyse(data);

  return Response.json(out[0]);
}
