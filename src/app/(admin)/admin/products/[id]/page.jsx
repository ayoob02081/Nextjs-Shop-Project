"use client";

import Loading from "@/components/Loading";
import { useParams } from "next/navigation";
import { useGetProductById } from "@/hooks/useProducts";

function SingleProductPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetProductById(id);
  const { product } = data || {};

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <h1 className="font-bold text-secondary-900">اطلاعات محصول</h1>
      <div>{product.title}</div>
    </div>
  );
}

export default SingleProductPage;
