"use client";

import { useGetUser } from "@/hooks/useAuth";
import { logoutApi } from "@/services/authServices";
import Button from "@/ui/Button";
import {
  ArrowRightStartOnRectangleIcon,
  ClipboardDocumentCheckIcon,
  HomeIcon,
  Squares2X2Icon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function SideBar() {
  const { data, isLoading } = useGetUser();
  const { user } = data || {};
  // console.log(user?.role);

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
      console.log(error);
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
          <Link className="profileLink" href={"/profile"}>
            <Squares2X2Icon className="size-5" />
            <span>داشبورد</span>
          </Link>
        </li>
        <li>
          <Link className="profileLink" href="/profile/me">
            <UserCircleIcon className="size-5" />
            <span>اطلاعات کاربری</span>
          </Link>
        </li>
        <li>
          <Link className="profileLink" href={"/profile/payments"}>
            <ClipboardDocumentCheckIcon className="size-5" />
            <span>سفارش‌ها</span>
          </Link>
        </li>
        <li>
          {user?.role==="ADMIN" && (
            <Link className="profileLink" href={"/admin"}>
              <UserGroupIcon className="size-5" />
              <span>صفحه ادمین</span>
            </Link>
          )}
        </li>
        <li>
          <Button className="profileLink" onClick={logoutHandler}>
            <ArrowRightStartOnRectangleIcon className="size-5" />
            <span>خروج از حساب کاربری</span>
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
