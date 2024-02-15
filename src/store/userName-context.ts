import { createContext } from "react";

interface UserNameContextType {
  userName: string;
  addUserName: (userName: string) => void;
  clearUserName: () => void;
}

const UserNameContext = createContext<UserNameContextType>({
  userName: "",
  addUserName: () => {},
  clearUserName: () => {},
});

export default UserNameContext;
