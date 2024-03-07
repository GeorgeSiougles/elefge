"use client";
import axios from "axios";

interface InputProps {
  userId: String;
  listingId: String;
}

const Input = ({ userId, listingId }: InputProps) => {
  const handleClick = async () => {
    try {
      await axios.post("/api/message/send", {
        senderId: userId,
        mapListingId: listingId,
        text: "New message" + Math.random(),
      });
    } catch (error) {
      console.log("Something went wrong " + error);
    }
  };
  return (
    <div>
      <button className="bg-slate-400 p-4 rounded-lg" onClick={handleClick}>
        Post comment:
      </button>
    </div>
  );
};
export default Input;
