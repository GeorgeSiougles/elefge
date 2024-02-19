"use client";

import UserContext from "@/store/user-context";
import { useContext, useState } from "react";

const UserNameDisplay = () => {
  const [newName, setNewName] = useState("");
  const [validationError, setValidationError] = useState("");
  const userCtx = useContext(UserContext);
  const userNameNotSet = userCtx.userName.trim().length === 0;
  let placeholder = userCtx.userName;
  let buttonLabel = "";
  if (userNameNotSet) {
    placeholder = "User.1234 or char name";
    buttonLabel = "Set Name";
  } else {
    buttonLabel = "Clear";
  }
  const handleNewNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
    setValidationError("");
  };

  const handleAddNameChange = () => {
    if (newName.trim().length < 3) {
      setValidationError("user name too short");
      return;
    }
    if (newName.trim().length > 19) {
      setValidationError("user name too long");
      return;
    }
    if (newName.trim().length !== 0) {
      userCtx.addUserName(newName);
      setValidationError("");
    }
  };
  const handleClearName = () => {
    userCtx.clearUserName();
    setNewName("");
  };
  return (
    <div>
      <div>
        <input
          className={`${
            userNameNotSet
              ? "placeholder:text-gray-500"
              : "placeholder:text-black"
          }`}
          type="text"
          placeholder={placeholder}
          onChange={handleNewNameChange}
          value={newName}
          disabled={!userNameNotSet}
          maxLength={19}
          minLength={3}
        />
        <button
          onClick={userNameNotSet ? handleAddNameChange : handleClearName}
        >
          {buttonLabel}
        </button>
      </div>
      <div className="text-red-500">{validationError}</div>
    </div>
  );
};
export default UserNameDisplay;
