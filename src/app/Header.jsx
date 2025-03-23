"use client";

import { useGetUser } from "@/hooks/useAuth";
import {
  ShoppingCartIcon,
  Squares2X2Icon,
  UserCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toPersianNumbers } from "@/utils/toPersianNumbers";

function Header({ className }) {
  const { data, isLoading } = useGetUser();
  const { user, cart } = data || {};
  const pathName = usePathname();

  return (
    <header
      className={`${
        isLoading ? "blur-sm opacity-50" : "opacity-100 blur-0"
      } shadow-md opacity-100 sticky bg-secondary-0 top-0 transition-all duration-200 px-6 z-50 ${className}`}
    >
      <nav>
        <ul className="flex items-center justify-between gap-2 py-2 container xl:max-w-screen-xl">
          <li className="flex-1">
            <Link
              className="flex flex-col justify-between items-center gap-2 py-2"
              href={"/"}
            >
              <Squares2X2Icon className="size-7" />
              <span>LOGO</span>
            </Link>
          </li>
          <li className="flex-none">
            <Link
              className={`${
                pathName.startsWith("/cart") ? "text-primary-800" : ""
              } headerLink justify-center relative`}
              href={"/cart"}
            >
              <span className="flex flex-col items-center justify-center bg-primary-900 size-5 text-white rounded-full absolute top-1 right-2">
                <p className="text-xs pt-0.5">
                  {cart
                    ? toPersianNumbers(data.cart.payDetail.orderItems.length)
                    : toPersianNumbers(0)}
                </p>
              </span>
              <ShoppingCartIcon className="size-7  " />
              <span>سبد خرید</span>
            </Link>
          </li>
          <li className="flex-1">
            {user ? (
              <Link
                className={`${
                  pathName.startsWith("/profile") ? "text-primary-800" : ""
                } headerLink`}
                href={"/profile"}
              >
                <UserCircleIcon className="size-7" />
                <span className="flex flex-nowrap text-ellipsis">
                  {user.name}
                </span>
              </Link>
            ) : (
              <Link
                className={`${
                  pathName.startsWith("/auth") ? "text-primary-800" : ""
                } headerLink`}
                href={"/auth"}
              >
                <UserPlusIcon className="size-7" />
                <span className="flex flex-nowrap text-ellipsis">
                  ورود / ثبت‌نام
                </span>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
