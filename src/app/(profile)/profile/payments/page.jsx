"use client";

import Loading from "@/components/Loading";
import { useGetUser } from "@/hooks/useAuth";
import PaymentDetail from "../_components/PaymentDetail";

function PaymentPage() {
  const { data, isLoading } = useGetUser();
  const { user, payments } = data || {};
  // console.log(payments);

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1>سفارشات کاربر</h1>
      <PaymentDetail payments={payments}/>
    </div>
  );
}

export default PaymentPage;

// _id, invoiceNumber, paymentMethod, amount, description, status, isPaid, authority, user, paymentDate, cart, createdAt, updatedAt, __v
