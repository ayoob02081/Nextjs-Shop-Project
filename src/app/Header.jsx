"use client";

import { useGetUser } from "@/hooks/useAuth";
import {
  RectangleGroupIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
  UserCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header({ className }) {
  const { data, isLoading } = useGetUser();
  const { user, cart } = data || {};
  const pathName = usePathname();
  // console.log(pathName.startsWith());

  return (
    <header
      className={`${
        isLoading ? "blur-sm opacity-50" : "opacity-100 blur-0"
      } shadow-md opacity-100 sticky bg-secondary-0 top-0 transition-all duration-200 z-50 ${className}`}
    >
      <nav>
        <ul className="flex items-center justify-between py-2 container xl:max-w-screen-xl">
          <li>
            <Link className="flex flex-col justify-between items-center gap-2 py-2" href={"/"}>
              <Squares2X2Icon className="size-7" />
              <span>LOGO</span>
            </Link>
          </li>
          {/* <li>
            <Link
              className={`${
                pathName.startsWith("/products") ? "text-primary-800" : ""
              } headerLink`}
              href={"/products"}
            >
              <RectangleGroupIcon className="size-7" />
              <span>محصولات</span>
            </Link>
          </li> */}
          <li>
            <Link
              className={`${
                pathName.startsWith("/cart") ? "text-primary-800" : ""
              } headerLink`}
              href={"/cart"}
            >
              <div className="relative size-10">
                <ShoppingCartIcon className="size-7 absolute left-0 bottom-0" />
                <span className="flex items-center justify-center bg-primary-900 py-0.5 px-2 text-sm text-white rounded-xl absolute top-0 right-0">
                  {cart ? data.cart.payDetail.orderItems.length : 0}
                </span>
              </div>
              <span>سبد خرید</span>
            </Link>
          </li>
          <li>
            {user ? (
              <Link
                className={`${
                  pathName.startsWith("/profile") ? "text-primary-800" : ""
                } headerLink`}
                href={"/profile"}
              >
                <UserCircleIcon className="size-7" />
                <span>{user.name}</span>
              </Link>
            ) : (
              <Link
                className={`${
                  pathName.startsWith("/ayth") ? "text-primary-800" : ""
                } headerLink`}
                href={"/auth"}
              >
                <UserPlusIcon className="size-7" />
                <span>ورود / ثبت‌نام</span>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
