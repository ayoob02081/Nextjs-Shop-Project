"use client";

import Link from "next/link";
import Loading from "@/components/Loading";
import { useGetAllCoupons } from "@/hooks/useCoupon";
import CouponsListTable from "../_components/CouponsListTable";

function CouponsPage() {
  const { data, isLoading } = useGetAllCoupons();
  const { coupons } = data || {};
  // console.log(coupons);

  isLoading && <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-secondary-900">دسته‌بندی‌ها</h1>
        <Link href={"/admin/coupons/add"} className="btn btn--primary">
          اضافه کردن کد تخفیف
        </Link>
      </div>
      <CouponsListTable coupons={coupons} />
    </div>
  );
}

export default CouponsPage;
