import MapListing, { MapListingType } from "@/models/MapListing";
import Listing from "./Listing";

const AllListings = async () => {
  const listings = await MapListing.find();
  return (
    <div>
      <h1>All Listings</h1>
      <div className="flex flex-col border-amber-200 border-8 rounded-md">
        <div className="flex justify-between bg-gray-200">
          <div className="flex-1">Activity Name</div>
          <div className="flex-1">Map Name</div>
          <div className="flex-1">Owner</div>
          <div className="flex-1">Descrpition</div>
        </div>
        {listings.map((cur: MapListingType, index) => (
          <Listing key={index} listing={cur} />
        ))}
      </div>
    </div>
  );
};
export default AllListings;
