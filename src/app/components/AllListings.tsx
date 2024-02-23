import MapListing from "@/models/MapListing";

const AllListings = async () => {
  const listings = await MapListing.find();
  console.log("listings: ", listings);
  return (
    <div>
      <h1>All Listings</h1>
      <div>
        {listings.map((cur, index) => (
          <div key={index}>{cur.mapName}</div>
        ))}
      </div>
    </div>
  );
};
export default AllListings;
