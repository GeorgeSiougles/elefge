"use client";

import { useEffect, useReducer } from "react";
import UserNameContext from "./userName-context";

interface UserNameProviderProps {
  children: React.ReactNode;
}
type UserNameAction = { type: "ADD"; userName: string } | { type: "CLEAR" };

type UserNameState = {
  userName: string;
};

const defaultUserName = {
  userName: "",
};
const userNameReducer = (
  state: UserNameState,
  action: UserNameAction
): UserNameState => {
  if (action.type === "ADD") {
    return { userName: action.userName };
  }
  if (action.type === "CLEAR") {
    return { userName: "" };
  }
  return state;
};

const UserNameProvider: React.FC<UserNameProviderProps> = (props) => {
  const [userNameState, dispatchUserNameAction] = useReducer(
    userNameReducer,
    defaultUserName
  );
  useEffect(() => {
    // Load saved userName from local storage on component mount
    const savedUserName = localStorage.getItem("userName");
    if (savedUserName) {
      dispatchUserNameAction({ type: "ADD", userName: savedUserName });
    }
  }, []);

  const addUserNameHandler = (userName: string) => {
    dispatchUserNameAction({
      type: "ADD",
      userName: userName,
    });
    localStorage.setItem("userName", userName);
  };

  const clearUserNameHandler = () => {
    dispatchUserNameAction({ type: "CLEAR" });
    localStorage.removeItem("userName");
  };

  const userNameContext = {
    userName: userNameState.userName,
    addUserName: addUserNameHandler,
    clearUserName: clearUserNameHandler,
  };
  return (
    <UserNameContext.Provider value={userNameContext}>
      {props.children}
    </UserNameContext.Provider>
  );
};

export default UserNameProvider;
