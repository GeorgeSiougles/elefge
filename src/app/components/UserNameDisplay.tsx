import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";

const UserNameDisplay = () => {
  const { userId } = auth();

  return (
    <div>
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
