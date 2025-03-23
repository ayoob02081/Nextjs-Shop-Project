"use client";

import Link from "next/link";
import Loading from "@/components/Loading";
import { useGetAllCoupons } from "@/hooks/useCoupon";
import CouponsListTable from "../_components/CouponsListTable";
import NotExisted from "@/components/NotExisted";

function CouponsPage() {
  const { data, isLoading } = useGetAllCoupons();
  const { coupons } = data || {};

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-secondary-900">کد تخفیف‌ها</h1>
        <Link href={"/admin/coupons/add"} className="btn btn--primary">
          اضافه کردن کد تخفیف
        </Link>
      </div>
      {coupons && coupons.length > 0 ? (
        <CouponsListTable coupons={coupons} />
      ) : (
        <NotExisted className="h-96">کد تخفیفی تعریف نشده است!</NotExisted>
      )}
    </div>
  );
}

export default CouponsPage;
