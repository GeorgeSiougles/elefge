import MapListing from "@/models/MapListing";

interface PageProps {
  params: {
    groupId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const listing = await MapListing.findOne({
    mapListingId: params.groupId,
  });
  console.log(listing);
  return (
    <div>
      TODO chatting interface
      <h1>Map Name: {listing.mapName}</h1>
      <h1>GroupID:{params.groupId}</h1>
    </div>
  );
};
export default Page;
