import { z } from "zod";

export const mapListingValidator = z.object({
  activityName: z.string(),
  mapName: z.string(),
  maxPlayerNumber: z.string(),
  description: z.string(),
});
