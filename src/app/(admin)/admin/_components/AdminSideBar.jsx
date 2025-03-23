"use client";

import { logoutApi } from "@/services/authServices";
import Button from "@/ui/Button";
import {
  ArrowRightStartOnRectangleIcon,
  ClipboardDocumentCheckIcon,
  HomeIcon,
  RectangleGroupIcon,
  Squares2X2Icon,
  SwatchIcon,
  TicketIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

function AdminSideBar() {
  const pathName = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isPending, mutateAsync: logout } = useMutation({
    mutationFn: logoutApi,
  });

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      await logout();
      queryClient.invalidateQueries({ queryKey: "get-user" });
      document.location.href = "/";
      router.push("/");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <ul className="flex flex-col">
        <li>
          <Link className="profileLink" href="/">
            <HomeIcon className="size-5" />
            <span>صفحه اصلی</span>
          </Link>
        </li>
        <li>
          <Link  className={`${
              pathName.endsWith("/admin") ? "text-primary-900" : ""
            } profileLink`} href={"/admin"}>
            <Squares2X2Icon className="size-5" />
            <span>داشبورد</span>
          </Link>
        </li>
        <li>
          <Link
            className={`${
              pathName.startsWith("/admin/users") ? "text-primary-900" : ""
            } profileLink`}
            href="/admin/users"
          >
            <UsersIcon className="size-5" />
            <span>کاربران</span>
          </Link>
        </li>
        <li>
          <Link
            className={`${
              pathName.startsWith("/admin/products") ? "text-primary-900" : ""
            } profileLink`}
            href={"/admin/products"}
          >
            <RectangleGroupIcon className="size-5" />
            <span>محصولات</span>
          </Link>
        </li>
        <li>
          <Link
            className={`${
              pathName.startsWith("/admin/categories") ? "text-primary-900" : ""
            } profileLink`}
            href={"/admin/categories"}
          >
            <SwatchIcon className="size-5" />
            <span>دسته‌بندی‌ها</span>
          </Link>
        </li>
        <li>
          <Link
            className={`${
              pathName.startsWith("/admin/payments") ? "text-primary-900" : ""
            } profileLink`}
            href={"/admin/payments"}
          >
            <ClipboardDocumentCheckIcon className="size-5" />
            <span>سفارشات</span>
          </Link>
        </li>
        <li>
          <Link
            className={`${
              pathName.startsWith("/admin/coupons") ? "text-primary-900" : ""
            } profileLink`}
            href={"/admin/coupons"}
          >
            <TicketIcon className="size-5" />
            <span>کد تخفیف</span>
          </Link>
        </li>

        <li>
          <Button className="profileLink w-full" onClick={logoutHandler}>
            <ArrowRightStartOnRectangleIcon className="size-5" />
            <span>خروج از حساب کاربری</span>
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default AdminSideBar;
