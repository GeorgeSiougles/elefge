import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { activityName, mapName, maxPlayers, description } = await req.json();
  console.log(activityName, mapName, maxPlayers, description);
  db.sadd(`${mapName}:`, `${activityName}:${maxPlayers}:${description}`);
  return new Response("OK");
}
