import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="flex justify-center">
        <Link href="/">
          <a className="py-4">
            <img width="600" src={"/cropped-headersmaller-1.png"} />
          </a>
        </Link>
      </div>{" "}
      <div className="flex justify-center">
        <Link href="/about">
          <a className="hover:underline mt-6">about</a>
        </Link>
      </div>
    </header>
  );
}
