import MapListing, { MapListingType } from "@/models/MapListing";

export async function GET(req: Request) {
  try {
    const body = await req.json();
    const { owner } = body;
    if (!owner) {
      return new Response("No user name provided", { status: 422 });
    }
    // Find one or find all lists?
    const groupListing = (await MapListing.findOne({
      owner: owner,
    })) as MapListingType;
    if (!groupListing) {
      return new Response("No Listings found by user: " + owner, {
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
