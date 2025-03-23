"use client";

import CartItem from "./_components/CartItem";
import { useGetUser } from "@/hooks/useAuth";
import Loading from "@/components/Loading";
import Link from "next/link";
import CartSummery from "./_components/CartSummery";

function cartPage() {
  const { data, isLoading } = useGetUser();
  const { user, cart } = data || {};

  if (isLoading) return <Loading />;

  if (!user || !data)
    return (
      <div className="container lg:max-w-screen-lg">
        <p className="font-bold mb-4">برای مشاهده صفحه خرید لطفا لاگین کنید</p>
        <Link href={"/auth"} className="text-lg font-bold text-primary-900">
          رفتن به صفحه لاگین؟
        </Link>
      </div>
    );

  if (!user.cart?.products || user.cart?.products.length === 0)
    return (
      <div className="container lg:max-w-screen-lg">
        <p className="font-bold mb-4">سبد خرید شما خالی است</p>
        <Link href={"/products"} className="text-lg font-bold text-primary-900">
          رفتن به صفحه محصولات
        </Link>
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div className="col-span-1 md:col-span-2 space-y-8">
        {cart &&
          cart.productDetail.map((item) => (
            <CartItem key={item._id} product={item} />
          ))}
      </div>
      <div className="col-span-1">
        <CartSummery payDetail={cart.payDetail} />
      </div>
    </div>
  );
}

export default cartPage;
