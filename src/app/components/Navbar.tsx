import Link from "next/link";
import UserNameDisplay from "./UserNameDisplay";

interface NavbarItem {
  href: string;
  label: string;
}
interface NavbarProps {
  items: NavbarItem[];
}

const Navbar = (props: NavbarProps) => {
  return (
    <nav className="flex justify-between bg-amber-700 h-32 w-screen px-4 items-center">
      <div className="flex">
        {props.items.map((item, index) => (
          <div
            className="bg-amber-200 p-4 mx-2 rounded-xl hover:bg-amber-400 hover:text-slate-500"
            key={index}
          >
            <Link href={item.href}>{item.label}</Link>
          </div>
        ))}
      </div>
      <div>
        <UserNameDisplay />
      </div>
    </nav>
  );
};
export default Navbar;
