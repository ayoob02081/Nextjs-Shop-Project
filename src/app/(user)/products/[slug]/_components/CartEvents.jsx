"use client";

import Loading from "@/components/Loading";
import { useAddToCart, useRemoveFromCart } from "@/hooks/useCartEvents";
import { useGetUser } from "@/hooks/useAuth";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";

function CartEvents({ product, className }) {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useGetUser();
  const { isPending: isAdding, mutateAsync: AddToCartFn } = useAddToCart();
  const { isPending, mutateAsync: RemoveFromCart } = useRemoveFromCart();
  const { user } = data || {};

  const AddToCartHandler = async () => {
    if (!user) {
      router.push("/auth");
      toast.error("Please Loggin!!");
      return;
    }
    try {
      const { message } = await AddToCartFn(product._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const RemoveFromCartHandler = async () => {
    if (!user) {
      router.push("/auth");
      toast.error("Please Loggin!!");
      return;
    }
    try {
      const { message } = await RemoveFromCart(product._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const isInCart = (product, user) => {
    if (!user) return false;
    return user?.cart?.products.some((p) => p.productId === product._id);
  };
  const quantityCount = (user, product) => {
    if (!user) return false;
    const singleProduct = user?.cart?.products.filter(
      (p) => p.productId === product._id
    );
    return singleProduct[0].quantity;
  };

  return (
    <div className="flex w-full items-center gap-4">
      {isInCart(product, user) ? (
        <div
          className={`btn flex items-center gap-6 justify-between px-3 py-2 text-secondary-600 bg-white ${
            !isInCart(product, user)
              ? "shadow-lg shadow-secondary-300"
              : "border-2 border-primary-800"
          }`}
        >
          <button
            onClick={AddToCartHandler}
            className="flex items-center justify-center hover:bg-success text-success hover:text-white size-6 rounded-xl duration-300 "
          >
            <PlusIcon className="size-5 " />
          </button>
          <span className="text-xl text-primary-700">
            {toPersianNumbers(quantityCount(user, product))}
          </span>
          <button
            onClick={RemoveFromCartHandler}
            className="flex items-center justify-center hover:bg-error text-error hover:text-white size-6 rounded-xl duration-300 "
          >
            {quantityCount(user, product) > 1 ? (
              <MinusIcon className="size-5 " />
            ) : (
              <TrashIcon className="size-5 " />
            )}
          </button>
        </div>
      ) : (
        <div className="w-full">
          {isAdding ? (
            <Loading />
          ) : (
            <button
              onClick={AddToCartHandler}
              className="btn btn--primary py-3 w-full"
            >
              اضافه کردن محصول
            </button>
          )}
        </div>
      )}
      {isInCart(product, user) && pathname !== "/cart" ? (
        <div className=" hover:bg-primary-800 bg-primary-900 px-4 rounded-xl text-white duration-300 font-bold py-3">
          <Link href={"/cart"}>ادامه سفارش</Link>
        </div>
      ) : null}
    </div>
  );
}

export default CartEvents;
