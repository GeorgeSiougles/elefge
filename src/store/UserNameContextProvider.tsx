"use client";

import { useReducer } from "react";
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
  const addUserNameHandler = (userName: string) => {
    dispatchUserNameAction({
      type: "ADD",
      userName: userName,
    });
  };
  const clearUserNameHandler = () => {
    dispatchUserNameAction({ type: "CLEAR" });
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
