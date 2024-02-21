import MapListing, { MapListingType } from "@/models/MapListing";

export async function GET(req: Request) {
  try {
    const body = await req.json();
    const { userName } = body;
    if (!userName) {
      return new Response("No user name provided", { status: 422 });
    }
    // Find one or find all lists?
    const groupListing = (await MapListing.findOne({
      owner: userName,
    })) as MapListingType;
    if (!groupListing) {
      return new Response("No Listings found by user: " + userName, {
        status: 404,
      });
    } else {
      const responseBody = {
        message: "Listing found",
        groupListing: groupListing,
      };
      return new Response(JSON.stringify(responseBody), { status: 201 });
    }
  } catch (error) {
    return new Response("Something went wrong " + error, { status: 400 });
  }
}
