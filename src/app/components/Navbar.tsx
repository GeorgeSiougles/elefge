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
    <nav className="flex justify-between bg-amber-700 w-screen p-4 items-center border-b-8 rounded-b-xl border-emerald-700">
      <div className="flex">
        {props.items.map((item, index) => (
          <Link
            className="bg-amber-200 p-4 mx-2 rounded-xl hover:bg-amber-400 hover:text-slate-500"
            key={index}
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div>
        <UserNameDisplay />
      </div>
    </nav>
  );
};
export default Navbar;
