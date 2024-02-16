"use client";

import useInput from "@/lib/hooks/use-input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    const createGroupListing = async () => {
      try {
        await axios.post("/api/group/create", {
          activityName: enteredActivityName,
          mapName: enteredMapName,
          maxPlayers: enteredMaxPlayers,
          description: enteredDescription,
        });
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };

    if (formIsInValid) return;

    try {
      setIsSubmitting(true);
      await createGroupListing();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }

    clearInputHandler();
    router.push("/");
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
        </form>
      </div>
    </div>
  );
};
export default Page;
