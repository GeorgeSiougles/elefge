import { db } from "@/lib/db";
import { mapListingValidator } from "@/lib/validators/MapListing";
import { auth } from "@clerk/nextjs";
import { z } from "zod";

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
    const { mapName, activityName, maxPlayerNumber, description } =
      mapListingValidator.parse(body);
    db.sadd(
      `user:${requestId}:mapName:${mapName}:activityName:${activityName}:maxPlayerNumber:${maxPlayerNumber}:description:${description}`,
      { requestId: requestId, mapName: body.mapName }
    );
    return new Response("Listing created", { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 422 });
    }
    return new Response("Invalid request", { status: 400 });
  }
}
