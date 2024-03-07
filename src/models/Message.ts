import { ZodType, z } from "zod";

export type MessageType = {
  id?: String;
  senderId: String;
  text: String;
  timestamp?: String;
  mapListingId: String;
};
export const MessageSchema: ZodType<MessageType> = z.object({
  id: z.string().optional(),
  senderId: z.string(),
  text: z.string(),
  timestamp: z.string().optional(),
  mapListingId: z.string(),
});
