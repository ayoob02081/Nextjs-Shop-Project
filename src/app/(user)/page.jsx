import { RectangleGroupIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-between gap-6">
      {/* <span>سلام world</span> */}
      <Link
        href={"/products"}
        className="hover:text-primary-800 font-black flex items-center gap-4 duration-300 text-xl"
      >
        <RectangleGroupIcon className="size-7" />
        <span>محصولات</span>
      </Link>
    </div>
  );
}
