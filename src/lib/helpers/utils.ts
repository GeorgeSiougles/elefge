import axios from "axios";

interface CreateGroupProps {
  activityName: string;
  mapName: string;
  maxPlayers: string;
  description: string;
  owner: string;
}

interface FindListingProps {
  userName: string;
}

export const createGroupListing = async ({
  activityName,
  mapName,
  maxPlayers,
  description,
  owner,
}: CreateGroupProps): Promise<Response | Error> => {
  try {
    const response = await axios.post("/api/group/create", {
      activityName: activityName,
      mapName: mapName,
      maxPlayers: maxPlayers,
      description: description,
      owner: owner,
    });
    if (response.status === 200) {
      const { roomId } = await response.data;
      return new Response(
        JSON.stringify({
          message: "New room added to database",
          roomId: roomId,
        })
      );
    } else {
      return new Response("Something went wrong", {
        status: response.status,
      });
    }
  } catch (error) {
    console.log("Something went wrong while creating the Listing", error);
    return new Response("Error submitting data", { status: 400 });
  }
};

export const findListingByUser = async (
  userName: FindListingProps
): Promise<Response | Error> => {
  if (!userName) {
    return new Response("No userName Provided", { status: 422 });
  }
  try {
    const response = await axios.get("/api/findByUserName/", {
      params: {
        userName: userName.userName,
      },
    });
    if (response.status === 404) {
      return new Response(
        "No listings found by user " + userName.userName + response.data,
        {
          status: 404,
        }
      );
    }
    if (response.status === 201) {
      const body = response.data;
      return new Response(JSON.stringify(body), { status: 201 });
    }
  } catch (error) {
    return new Response("Something went wrong" + error);
  }
  return new Response("ok");
};
