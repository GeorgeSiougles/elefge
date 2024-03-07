import { mapListingValidator } from "@/lib/validators/MapListing";
import MapListing from "@/models/MapListing";
import { auth, currentUser } from "@clerk/nextjs";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) return new Response("Unauthorized", { status: 401 });
    const user = await currentUser();
    if (!user) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const { mapName, activityName, maxPlayerNumber, description } =
      mapListingValidator.parse(body);
    const listingId = nanoid();
    const newListing = {
      mapListingId: listingId,
      mapName: mapName,
      activityName: activityName,
      maxPlayers: maxPlayerNumber,
      description: description,
      owner: {
        userId: userId,
        username: user.username,
        email: user.emailAddresses[0].emailAddress,
      },
    };
    await MapListing.create(newListing);
    const responseBody = { id: listingId };
    return new NextResponse(JSON.stringify(responseBody), {
      status: 201,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request payload", { status: 422 });
    }
    console.log(error);
    return new NextResponse("Invalid request", { status: 400 });
  }
}
