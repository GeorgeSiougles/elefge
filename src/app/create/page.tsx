import { createGroupListing } from "@/lib/helpers/utils";
import useInput from "@/lib/hooks/use-input";
import { auth, currentUser } from "@clerk/nextjs";
import GroupCreationForm from "../components/GroupCreationForm";
// import UserContext from "@/store/user-context";
// import { useRouter } from "next/navigation";
// import { useContext, useState } from "react";

const Page = () => {
  // const router = useRouter();
  const { userId } = auth();
  if (!userId) return <div>Please log in or sign up</div>;

  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const userCtx = useContext(UserContext);
  // const {
  //   value: enteredActivityName,
  //   hasError: activityNameInputHasError,
  //   valueChangeHandler: activityNameChangedHandler,
  //   inputBlurHandler: activityNamelBlurHandler,
  //   reset: resetActivityNameInput,
  // } = useInput((value) => value.trim() !== "");

  // const {
  //   value: enteredMapName,
  //   hasError: mapNameInputHasError,
  //   valueChangeHandler: mapNameChangedHandler,
  //   inputBlurHandler: mapNamelBlurHandler,
  //   reset: resetMapNameInput,
  // } = useInput((value) => value.trim() !== "");

  // const {
  //   value: enteredMaxPlayers,
  //   hasError: maxPlayersInputHasError,
  //   valueChangeHandler: maxPlayersChangedHandler,
  //   inputBlurHandler: maxPlayerslBlurHandler,
  //   reset: resetMaxPlayersInput,
  // } = useInput((value) => value.trim() !== "");

  // const {
  //   value: enteredDescription,
  //   hasError: descriptionHasError,
  //   valueChangeHandler: descriptionChangedHandler,
  //   inputBlurHandler: descriptionlBlurHandler,
  //   reset: resetDescriptionInput,
  // } = useInput((value) => value.trim() !== "");

  // const clearInputHandler = () => {
  //   resetActivityNameInput();
  //   resetMapNameInput();
  //   resetMaxPlayersInput();
  //   resetDescriptionInput();
  // };
  // let formIsInValid =
  //   activityNameInputHasError ||
  //   mapNameInputHasError ||
  //   maxPlayersInputHasError ||
  //   descriptionHasError;

  const formSubmitionHandler = async (event: React.FormEvent) => {
    // event.preventDefault();
    // if (!userCtx.userName) return;
    // if (formIsInValid) return;
    // try {
    //   setIsSubmitting(true);
    //   const newGroupListing = {
    //     activityName: enteredActivityName,
    //     mapName: enteredMapName,
    //     maxPlayers: enteredMaxPlayers,
    //     description: enteredDescription,
    //     owner: userCtx.userName,
    //   };
    //   const response = await createGroupListing(newGroupListing);
    //   if (response instanceof Response && response.ok) {
    //     const newListing = await response.json();
    //     const newListingId = newListing.roomId;
    //     router.push(`/browse/${newListingId}`);
    //   }
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex ">
        <h1>Create Listing</h1>
      </div>
      <div className="border-slate-900 border-8 rounded-lg p-4 w-72">
        <GroupCreationForm userId={userId} />
      </div>
    </div>
  );
};
export default Page;
