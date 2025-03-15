"use client";

import Loading from "@/components/Loading";
import ProductsListTable from "../_components/ProductsListTable";
import { useGetAllProducts } from "@/hooks/useProducts";
import Link from "next/link";

function AllProductsPage() {
  const { isLoading, data } = useGetAllProducts();
  const { products } = data || {};
  // console.log(products);

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-secondary-900">محصولات</h1>
        <Link href={"/admin/products/add"} className="btn btn--primary">
          اضافه کردن محصول
        </Link>
      </div>
      <ProductsListTable products={products} />
    </div>
  );
}

export default AllProductsPage;
