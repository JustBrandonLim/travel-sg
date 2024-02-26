import { pipeline } from "@xenova/transformers";

export async function POST(request: Request) {
  const data = await request.json();

  const pipe = await pipeline("sentiment-analysis");
  const out = await pipe(data);

  return Response.json(out[0]);
}
