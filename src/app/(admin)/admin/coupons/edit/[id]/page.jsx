"use client";

import Loading from "@/components/Loading";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGetCouponById, useUpdateCoupon } from "@/hooks/useCoupon";
import { useGetAllProducts } from "@/hooks/useProducts";
import CouponForm from "../../../_components/CouponForm";
import GoBack from "@/ui/GoBack";

// const includesCouponKey = ["code", "amount", "usageLimit"];

function EditCouponPage() {
  const { id } = useParams();
  const { data: productsData, isLoading } = useGetAllProducts();
  const { products } = productsData || {};
  const { data, isLoading: isEditing } = useGetCouponById(id);
  const { coupon } = data || {};
  // console.log(coupon);

  const [formData, setFormData] = useState({});
  const [couponType, setCouponType] = useState("");
  const [productIds, setProductIds] = useState([]);
  const [expireDate, setExpireDate] = useState(new Date());
  const { isPending, updateCoupon } = useUpdateCoupon();
  const router = useRouter();

  useEffect(() => {
    if (coupon) {
      setCouponType(coupon.type);
      setFormData({
        code: coupon.code,
        amount: coupon.amount,
        usageLimit: coupon.usageLimit,
      });
      setProductIds(coupon.productIds);
      setExpireDate(new Date(coupon.expireDate));
    }
  }, [coupon]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await updateCoupon({
        couponId: coupon._id,
        data: {
          ...formData,
          type: coupon.type,
          expireDate: new Date(expireDate).toISOString(),
          productIds: productIds.map((p) => p._id),
        },
      });
      router.push("/admin/coupons");
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  if (isEditing) return <Loading />;

  return (
    <div className="space-y-8 w-full max-w-sm h-auto">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-secondary-900 text-xl">
          ویرایش کد تخفیف
        </h1>
        <GoBack />
      </div>
      <CouponForm
        coupon={formData}
        products={products}
        handleChange={handleChange}
        isPending={isPending}
        onSubmit={handleSubmit}
        setProductIds={setProductIds}
        setCouponType={setCouponType}
        couponType={couponType}
        expireDate={expireDate}
        setExpireDate={setExpireDate}
        defaulValue={coupon.productIds}
      />
    </div>
  );
}

export default EditCouponPage;
