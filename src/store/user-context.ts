import { createContext } from "react";

interface UserContextType {
  userName: string;
  currentRoom: string;
  addUserName: (userName: string) => void;
  clearUserName: () => void;
  addCurrentRoom: (currentRoom: string) => void;
  clearCurrentRoom: () => void;
}

const UserContext = createContext<UserContextType>({
  userName: "",
  currentRoom: "",
  addUserName: () => {},
  clearUserName: () => {},
  addCurrentRoom: () => {},
  clearCurrentRoom: () => {},
});

export default UserContext;
