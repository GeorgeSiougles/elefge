import MapListing, { MapListingSchema } from "@/models/MapListing";

export async function POST(req: Request) {
  try {
    const { activityName, mapName, maxPlayers, description } = await req.json();
    if (
      activityName.trim() === "" ||
      mapName.trim() === "" ||
      maxPlayers.trim() === "" ||
      description.trim() === ""
    )
      return new Response("Invalid payload", { status: 422 });

    MapListing.create({ activityName, mapName, maxPlayers, description });
    return new Response("OK");
  } catch (error) {
    return new Response("Something went wrong", { status: 400 });
  }
}
