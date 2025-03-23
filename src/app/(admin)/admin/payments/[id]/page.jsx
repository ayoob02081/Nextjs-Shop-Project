"use client";

import Loading from "@/components/Loading";
import { useParams } from "next/navigation";
import { useGetPaymentById } from "@/hooks/usePayment";
import GoBack from "@/ui/GoBack";

function SinglePaymentPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetPaymentById(id);
  const { payment } = data || {};
  // console.log(payment);

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-secondary-900">اطلاعات سفارش</h1>
        <GoBack />
      </div>
      <div>{payment[0].user.name}</div>
    </div>
  );
}

export default SinglePaymentPage;
