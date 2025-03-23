"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAddCoupon } from "@/hooks/useCoupon";
import CouponForm from "../../_components/CouponForm";
import { useGetAllProducts } from "@/hooks/useProducts";
import GoBack from "@/ui/GoBack";

function AddProductPage() {
  const [coupon, setCoupon] = useState({
    code: "",
    amount: "",
    usageLimit: "",
  });
  const [couponType, setCouponType] = useState("percent");
  const { isPending, addCoupon } = useAddCoupon();
  const router = useRouter();
  const { data, isLoading } = useGetAllProducts();
  const { products } = data || {};
  const handleChange = (e) => {
    setCoupon({ ...coupon, [e.target.name]: e.target.value });
  };
  const [productIds, setProductIds] = useState([]);
  const [expireDate, setExpireDate] = useState(new Date());

  // console.log(couponType);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await addCoupon({
        ...coupon,
        expireDate: new Date(expireDate).toISOString(),
        productIds: productIds.map((p) => p._id),
        type: couponType,
      });
      router.push("/admin/coupons");
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="space-y-8 w-full max-w-sm h-auto">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-secondary-900 text-xl">
          اضافه کردن کد تخفیف
        </h1>
        <GoBack />
      </div>
      <CouponForm
        coupon={coupon}
        products={products}
        handleChange={handleChange}
        isPending={isPending}
        onSubmit={handleSubmit}
        productIds={productIds}
        setProductIds={setProductIds}
        setCouponType={setCouponType}
        couponType={couponType}
        expireDate={expireDate}
        setExpireDate={setExpireDate}
      />
    </div>
  );
}

export default AddProductPage;
