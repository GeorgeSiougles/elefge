import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) return new Response("Unauthorized", { status: 401 });
    const body = await req.json();
    const { userId: requestId } = body;
    if (!requestId)
      return new Response("Invalid payload no userId provided", {
        status: 422,
      });

    db.sadd(
      `user:${requestId}:mapName:${body.mapName}:activityName:${body.activityName}:maxPlayerNumber:${body.maxPlayerNumber}:description:${body.desciption}`,
      { requestId: requestId, mapName: body.mapName }
    );
    return new Response("Listing created", { status: 201 });
  } catch (error) {
    return new Response("Invalid request", { status: 400 });
  }
}
