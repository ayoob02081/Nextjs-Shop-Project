"use client";

import { useGetUser } from "@/hooks/useAuth";
import { toLocalDateString } from "@/utils/toLocalDate";
import PaymentDetail from "./_components/PaymentDetail";
import Link from "next/link";
import NotExisted from "@/components/NotExisted";
import Loading from "@/components/Loading";

function ProfilePage() {
  const { data, isLoading } = useGetUser();
  const { user, payments } = data || {};

  if (isLoading) return <Loading />;
  return (
    <div className="flex flex-col justify-between items-start gap-4">
      <h1 className="font-bold text-secondary-900 text-xl">
        {user.name} خوش آمدی!
      </h1>
      <p className="text-sm text-secondary-600">
        <span>تاریخ پیوستن:</span>
        <span> {toLocalDateString(user.createdAt)} </span>
      </p>
      <div className="flex flex-col items-start justify-between gap-6 mt-8 border-2 rounded-xl shadow-lg p-4 max-w-full">
        <h2 className="font-bold text-secondary-900">آخرین سفارشات شما</h2>
        {payments && payments.length > 0 ? (
          <div className="space-y-6 max-w-full">
            <PaymentDetail
              payments={payments
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 3)}
            />
            <button className="btn btn--primary">
              <Link href={"/profile/payments"}>مشاهده همه سفارشات</Link>
            </button>
          </div>
        ) : (
          <NotExisted className="text-lg">سفارشی ثبت نشده است!</NotExisted>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
