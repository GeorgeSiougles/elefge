import Link from "next/link";

const routingOptions = [
  {
    href: "/browse",
    label: "Browse Groups",
  },
  {
    href: "/create",
    label: "Create Group",
  },
];
export default function Home() {
  return (
    <div>
      {routingOptions.map((opt, index) => (
        <div key={index}>
          <Link href={opt.href}>{opt.label}</Link>
        </div>
      ))}
    </div>
  );
}
