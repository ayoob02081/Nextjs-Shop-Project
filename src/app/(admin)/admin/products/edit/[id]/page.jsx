"use client";

import Loading from "@/components/Loading";
import { useParams } from "next/navigation";
import { useGetProductById } from "@/hooks/useProducts";
import ProductForm from "../../../_components/ProductForm";

function EditProductPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetProductById(id);
  const { product } = data || {};
  // console.log(product);

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-8 w-full max-w-sm h-auto">
      <h1 className="font-bold text-secondary-900 text-xl">ویرایش محصول</h1>
      <ProductForm productToEdit={product} />
    </div>
  );
}

export default EditProductPage;
