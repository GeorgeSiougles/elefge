import Input from "@/app/components/chat/Input";
import Messages from "@/app/components/chat/Messages";
import { db } from "@/lib/db";
import { fetchRedis } from "@/lib/redis";
import MapListing from "@/models/MapListing";
import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";
interface PageProps {
  params: {
    groupId: string;
  };
}

async function getChatMessages(chatId: string) {
  try {
    const results: string[] = await fetchRedis(
      "zrange",
      `mapListing:${chatId}:messages`,
      0,
      -1
    );
    console.log("Results " + results);
    const dbMessages = results.map((message) => JSON.parse(message));
    const reverseDbMessages = dbMessages.reverse();
    return reverseDbMessages;
  } catch (error) {
    console.log("get chat messages error " + error);
  }
}

const Page = async ({ params }: PageProps) => {
  const { userId } = auth();
  if (!userId) notFound();
  const listing = await MapListing.findOne({
    mapListingId: params.groupId,
  });
  console.log(listing);
  const initialMessages = await getChatMessages(listing.mapListingId);
  return (
    <div>
      TODO chatting interface
      <h1>Map Name: {listing.mapName}</h1>
      <h1>GroupID:{params.groupId}</h1>
      <Input userId={userId} listingId={listing.mapListingId} />
      {!initialMessages ? (
        <div>No messages yet, type something!</div>
      ) : (
        <Messages initialMessages={initialMessages} />
      )}
    </div>
  );
};
export default Page;
