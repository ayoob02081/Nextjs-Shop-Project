"use client";

import Loading from "@/components/Loading";
import { useGetAllPayments } from "@/hooks/usePayment";
import PaymentsListTable from "../_components/PaymentsListTable";
import NotExisted from "@/components/NotExisted";

function AllPaymentsPage() {
  const { data, isLoading } = useGetAllPayments();
  const { payments } = data || {};
  // console.log(payments);

  isLoading && <Loading />;

  return (
    <div className="space-y-6">
      <h1 className="font-bold text-secondary-900">سفارشات</h1>
      {payments && payments.length > 0 ? (
        <PaymentsListTable payments={payments} />
      ) : (
        <NotExisted className="h-96">سفارشی ثبت نشده است!</NotExisted>
      )}
    </div>
  );
}

export default AllPaymentsPage;
