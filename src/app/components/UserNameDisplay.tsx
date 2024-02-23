import { UserButton, auth, currentUser } from "@clerk/nextjs";
import Link from "next/link";

const UserNameDisplay = async () => {
  const { userId } = auth();
  const user = await currentUser();

  return (
    <div>
      <div>{user?.username}</div>
      {userId ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <div>
          <Link href="/sign-up">Sign Up</Link>
          <Link href="/sign-in">Sign In</Link>
        </div>
      )}
    </div>
  );
};
export default UserNameDisplay;
