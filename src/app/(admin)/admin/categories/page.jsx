"use client";

import Link from "next/link";
import CategoriesListTable from "../_components/CategoriesListTable";
import { useGetAllCategories } from "@/hooks/useCategories";
import Loading from "@/components/Loading";
import NotExisted from "@/components/NotExisted";

function CategoriesPage() {
  const { data, isLoading } = useGetAllCategories();
  const { categories } = data || {};
  // console.log(categories);

  isLoading && <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-cente sm: justify-between overflow-auto">
        <h1 className="font-bold text-secondary-900">دسته‌بندی‌ها</h1>
        <Link href={"/admin/categories/add"} className="btn btn--primary">
          اضافه کردن دسته‌بندی
        </Link>
      </div>
      {categories && categories.length > 0 ? (
        <CategoriesListTable categories={categories} />
      ) : (
        <NotExisted className="h-96">دسته‌بندی تعریف نشده است!</NotExisted>
      )}
    </div>
  );
}

export default CategoriesPage;
