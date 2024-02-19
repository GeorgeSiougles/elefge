"use client";

import useInput from "@/lib/hooks/use-input";
import UserContext from "@/store/user-context";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const Page = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userCtx = useContext(UserContext);
  const {
    value: enteredActivityName,
    isValid: enteredActivityNameIsValid,
    hasError: activityNameInputHasError,
    valueChangeHandler: activityNameChangedHandler,
    inputBlurHandler: activityNamelBlurHandler,
    reset: resetActivityNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredMapName,
    isValid: enteredMapNameIsValid,
    hasError: mapNameInputHasError,
    valueChangeHandler: mapNameChangedHandler,
    inputBlurHandler: mapNamelBlurHandler,
    reset: resetMapNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredMaxPlayers,
    isValid: enteredMaxPlayersIsValid,
    hasError: maxPlayersInputHasError,
    valueChangeHandler: maxPlayersChangedHandler,
    inputBlurHandler: maxPlayerslBlurHandler,
    reset: resetMaxPlayersInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangedHandler,
    inputBlurHandler: descriptionlBlurHandler,
    reset: resetDescriptionInput,
  } = useInput((value) => value.trim() !== "");

  const clearInputHandler = () => {
    resetActivityNameInput();
    resetMapNameInput();
    resetMaxPlayersInput();
    resetDescriptionInput();
  };
  let formIsInValid =
    activityNameInputHasError ||
    mapNameInputHasError ||
    maxPlayersInputHasError ||
    descriptionHasError;

  const formSubmitionHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!userCtx.userName) return;
    const createGroupListing = async (): Promise<Response | Error> => {
      try {
        const response = await axios.post("/api/group/create", {
          activityName: enteredActivityName,
          mapName: enteredMapName,
          maxPlayers: enteredMaxPlayers,
          description: enteredDescription,
          owner: userCtx.userName,
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

    if (formIsInValid) return;

    try {
      setIsSubmitting(true);
      const response = await createGroupListing();

      if (response instanceof Response && response.ok) {
        const newListing = await response.json();
        const newListingId = newListing.roomId;
        router.push(`/browse/${newListingId}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex ">
        <h1>Create Listing</h1>
      </div>
      <div className="border-slate-900 border-8 rounded-lg p-4 w-72">
        <form onSubmit={formSubmitionHandler}>
          <div className="flex-row my-4 items-center">
            <label className="px-2" htmlFor="activityName">
              Activity Name
            </label>
            <input
              id="activityName"
              type="text"
              value={enteredActivityName}
              onChange={(event) =>
                activityNameChangedHandler(event.target.value)
              }
              onBlur={(event) => activityNamelBlurHandler(event.target.value)}
              required
            />
          </div>
          <div className="flex-row my-4 items-center">
            <label className="px-2" htmlFor="mapName">
              Map Name
            </label>
            <input
              id="mapName"
              type="text"
              value={enteredMapName}
              onChange={(event) => mapNameChangedHandler(event.target.value)}
              onBlur={(event) => mapNamelBlurHandler(event.target.value)}
              required
            />
          </div>
          <div className="flex-row my-4 items-center">
            <label className="px-2" htmlFor="maxPlayerNumber">
              Max Number of players
            </label>
            <select
              id="maxPlayerNumber"
              value={enteredMaxPlayers}
              onChange={(event) => maxPlayersChangedHandler(event.target.value)}
              onBlur={(event) => maxPlayerslBlurHandler(event.target.value)}
            >
              <option value={""}> </option>
              <option value={"5"}>5</option>
              <option value={"10"}>10</option>
              <option value={"50"}>50</option>
            </select>
          </div>
          <div className="flex-col my-4">
            <label className="px-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="desciption"
              rows={6}
              value={enteredDescription}
              onChange={(event) =>
                descriptionChangedHandler(event.target.value)
              }
              onBlur={(event) => descriptionlBlurHandler(event.target.value)}
              required
            />
          </div>

          {userCtx.userName ? (
            <div>
              <button
                type="submit"
                className="bg-slate-800 text-white p-2 text-center rounded-md disabled:bg-slate-500 hover:bg-blue-800 hover:text-black"
                disabled={formIsInValid || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Create Group"}
              </button>
              <button
                type="reset"
                className="bg-amber-800 text-white p-2 text-center rounded-md hover:bg-blue-800 hover:text-black"
                onClick={clearInputHandler}
              >
                Clear Inputs
              </button>
            </div>
          ) : (
            <div>Please enter your username to be able to create a group</div>
          )}
        </form>
      </div>
    </div>
  );
};
export default Page;
