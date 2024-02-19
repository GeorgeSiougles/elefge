"use client";

import { useEffect, useReducer } from "react";
import UserContext from "./user-context";

interface UserProviderProps {
  children: React.ReactNode;
}
type UserAction =
  | { type: "ADD"; userName: string }
  | { type: "CLEAR" }
  | { type: "ENTERROOM"; currentRoom: string }
  | { type: "CLEARROOM" };

type UserState = {
  userName: string;
  currentRoom: string;
};

const defaultUser = {
  userName: "",
  currentRoom: "",
};
const userReducer = (state: UserState, action: UserAction): UserState => {
  if (action.type === "ADD") {
    return { ...state, userName: action.userName };
  }
  if (action.type === "CLEAR") {
    return { ...state, userName: "" };
  }
  return state;
};

const UserProvider: React.FC<UserProviderProps> = (props) => {
  const [UserState, dispatchUserAction] = useReducer(userReducer, defaultUser);
  useEffect(() => {
    // Load saved userName from local storage on component mount
    const savedUserName = localStorage.getItem("userName");
    const savedCurrentRoom = localStorage.getItem("currentRoom");
    if (savedUserName) {
      dispatchUserAction({ type: "ADD", userName: savedUserName });
    }
    if (savedCurrentRoom) {
      dispatchUserAction({ type: "ENTERROOM", currentRoom: savedCurrentRoom });
    }
  }, []);

  const addUserNameHandler = (userName: string) => {
    dispatchUserAction({
      type: "ADD",
      userName: userName,
    });
    localStorage.setItem("userName", userName);
  };

  const clearUserNameHandler = () => {
    dispatchUserAction({ type: "CLEAR" });
    localStorage.removeItem("userName");
  };

  const enterRoomHandler = (currentRoom: string) => {
    dispatchUserAction({ type: "ENTERROOM", currentRoom: currentRoom });
    localStorage.setItem("currentRoom", currentRoom);
  };

  const clearRoomHandler = () => {
    dispatchUserAction({ type: "CLEARROOM" });
    localStorage.removeItem("currentRoom");
  };

  const userContext = {
    userName: UserState.userName,
    currentRoom: UserState.currentRoom,
    addUserName: addUserNameHandler,
    clearUserName: clearUserNameHandler,
    addCurrentRoom: enterRoomHandler,
    clearCurrentRoom: clearRoomHandler,
  };
  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
