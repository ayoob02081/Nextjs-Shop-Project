"use client";

import Link from "next/link";
import CategoriesListTable from "../_components/CategoriesListTable";
import { useGetAllCategories } from "@/hooks/useCategories";
import Loading from "@/components/Loading";

function CategoriesPage() {
  const { data, isLoading } = useGetAllCategories();
  const { categories } = data || {};
  // console.log(categories);

  isLoading && <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-secondary-900">دسته‌بندی‌ها</h1>
        <Link href={"/admin/categories/add"} className="btn btn--primary">
          اضافه کردن دسته‌بندی
        </Link>
      </div>
      <CategoriesListTable categories={categories} />
    </div>
  );
}

export default CategoriesPage;
