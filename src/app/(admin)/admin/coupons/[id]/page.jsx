"use client";

import { useParams } from "next/navigation";
import { useGetCategoryById } from "@/hooks/useCategories";

function SingleCategoryPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetCategoryById(id);
  const { category } = data || {};

  return (
    <div className="space-y-8 w-full max-w-sm h-auto">
      <h1 className="font-bold text-secondary-900 text-xl">جزئیات دسته‌بندی</h1>
      <p>{category.title}</p>
    </div>
  );
}

export default SingleCategoryPage;
