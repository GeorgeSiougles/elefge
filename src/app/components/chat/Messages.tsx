import { MessageType } from "@/models/Message";

interface MessagesProps {
  initialMessages: MessageType[];
}

const Messages = ({ initialMessages }: MessagesProps) => {
  console.log(initialMessages);
  return (
    <div>
      Map through messages
      {initialMessages.map((current, index) => (
        <div key={index}>{current.text}</div>
      ))}
    </div>
  );
};
export default Messages;
