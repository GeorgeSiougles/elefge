"use client";

import UserNameContext from "@/store/userName-context";
import { useContext, useState } from "react";

const UserNameDisplay = () => {
  const [newName, setNewName] = useState("");
  const userNameCtx = useContext(UserNameContext);
  const useNameNotSet = userNameCtx.userName.trim().length === 0;
  let placeholder = userNameCtx.userName;
  let buttonLabel = "";
  if (useNameNotSet) {
    placeholder = "User.1234 or char name";
    buttonLabel = "Set Name";
  } else {
    buttonLabel = "Clear";
  }
  const handleNewNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.trim().length !== 0) setNewName(event.target.value);
  };

  const handleAddNameChange = () => {
    if (newName.trim().length !== 0) userNameCtx.addUserName(newName);
  };
  const handleClearName = () => {
    userNameCtx.clearUserName();
    setNewName("");
  };
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleNewNameChange}
        value={newName}
      />
      <button onClick={useNameNotSet ? handleAddNameChange : handleClearName}>
        {buttonLabel}
      </button>
    </div>
  );
};
export default UserNameDisplay;
