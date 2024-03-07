import { MapListingType } from "@/models/MapListing";
interface ListingProps {
  listing: MapListingType;
}

const Listing = ({ listing }: ListingProps) => {
  return (
    <div className="flex justify-between bg-gray-400 hover:bg-white hover:text-black">
      <div className="flex-1">{listing.activityName}</div>
      <div className="flex-1">{listing.mapName}</div>
      <div className="flex-1">{listing.owner[0].username}</div>
      <div className="flex-1">{listing.description}</div>
    </div>
  );
};
export default Listing;
