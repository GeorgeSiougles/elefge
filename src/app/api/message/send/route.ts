import { db } from "@/lib/db";
import { MessageSchema } from "@/models/Message";
import { auth } from "@clerk/nextjs";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const messageData = await request.json();
    //validate message Data

    const { senderId, mapListingId, text } = MessageSchema.parse(messageData);
    const timestamp = Date.now();
    const message = {
      id: nanoid(),
      senderId: senderId,
      text: text,
      timestamp: timestamp,
    };
    await db.zadd(`mapListing:${mapListingId}:messages`, {
      score: timestamp,
      member: JSON.stringify(message),
    });
    return new NextResponse("Ok", { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("Validation error " + error, { status: 422 });
    } else {
      return new NextResponse("Something went wrong " + error);
    }
  }
}
