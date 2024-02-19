import mongoose, { Schema } from "mongoose";
import { ZodType, z } from "zod";

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

const mapListingMongoDBSchema = new Schema(
  {
    activityName: String,
    mapName: String,
    maxPlayers: String,
    description: String,
    owner: String,
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
  _id?: string;
  activityName: String;
  mapName: String;
  maxPlayers: String;
  description: String;
  owner: String;
  createdAt?: string;
  updatedAt?: string;
};

export const MapListingSchema: ZodType<MapListingType> = z.object({
  activityName: z.string(),
  mapName: z.string(),
  maxPlayers: z.string(),
  description: z.string(),
  owner: z.string(),
});
