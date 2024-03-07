import mongoose, { Schema } from "mongoose";
import { ZodType, z } from "zod";
import { User, UserSchema } from "./User";

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

const mapListingMongoDBSchema = new Schema(
  {
    mapListingId: String,
    activityName: String,
    mapName: String,
    maxPlayers: String,
    description: String,
    owner: { userId: String, username: String, email: String },
  },
  {
    timestamps: true,
  }
);

const MapListing =
  mongoose.models.MapListing ||
  mongoose.model("MapListing", mapListingMongoDBSchema);

export default MapListing;

export type MapListingType = {
  mapListingId: String;
  activityName: String;
  mapName: String;
  maxPlayers: String;
  description: String;
  owner: User;
  createdAt?: string;
  updatedAt?: string;
};

export const MapListingSchema: ZodType<MapListingType> = z.object({
  mapListingId: z.string(),
  activityName: z.string(),
  mapName: z.string(),
  maxPlayers: z.string(),
  description: z.string(),
  owner: UserSchema,
});
