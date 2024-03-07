import { ZodType, z } from "zod";

export type User = {
  userId: String;
  username: String;
  email: String;
};
export const UserSchema: ZodType<User> = z.object({
  userId: z.string(),
  username: z.string(),
  email: z.string(),
});
