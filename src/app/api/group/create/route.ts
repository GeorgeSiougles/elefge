import MapListing, { MapListingType } from "@/models/MapListing";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const { activityName, mapName, maxPlayers, description, owner, _id } =
      (await req.json()) as MapListingType;
    if (
      activityName.trim() === "" ||
      mapName.trim() === "" ||
      maxPlayers.trim() === "" ||
      description.trim() === "" ||
      owner.trim() === "" ||
      _id?.trim() === ""
    )
      return new Response("Invalid payload", { status: 422 });
    const newListingId = new ObjectId();
    MapListing.create({
      _id: newListingId,
      activityName,
      mapName,
      maxPlayers,
      description,
      owner,
    });
    return new Response(
      JSON.stringify({
        message: "New room added succesfully",
        roomId: newListingId,
      })
    );
  } catch (error) {
    return new Response("Something went wrong" + error, { status: 400 });
  }
}
