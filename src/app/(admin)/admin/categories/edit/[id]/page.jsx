"use client";

import Loading from "@/components/Loading";
import { useParams } from "next/navigation";
import { useGetCategoryById } from "@/hooks/useCategories";
import CategoryForm, { categoryTypes } from "../../../_components/CategoryForm";
import { useUpdateCategory } from "@/hooks/useCategories";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { includeObj } from "@/utils/objectUtils";
import GoBack from "@/ui/GoBack";

const includesCategoryKey = ["title", "englishTitle", "description"];

function EditCategoryPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetCategoryById(id);
  const { category } = data || {};
  const { title, englishTitle, description } = category || {};
  const [formData, setFormData] = useState({
    title,
    englishTitle,
    description,
  });

  const [selectedType, setSelectedType] = useState("");

  const { isPending, updateCategory } = useUpdateCategory();
  const router = useRouter();

  useEffect(() => {
    if (category) {
      setSelectedType(categoryTypes.find((c) => c.name === category.type));
      setFormData(includeObj(category, includesCategoryKey));
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await updateCategory({
        categoryId: id,
        data: { ...formData, type: selectedType.name },
      });
      router.push("/admin/categories");
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-8 w-full max-w-sm h-auto">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-secondary-900 text-xl">
          ویرایش دسته‌بندی
        </h1>
        <GoBack />
      </div>
      <CategoryForm
        formData={formData}
        handleChange={handleChange}
        isPending={isPending}
        onSubmit={handleSubmit}
        selectedType={categoryTypes.find((c) => c.name === category.type)}
        setSelectedType={setSelectedType}
      />
    </div>
  );
}

export default EditCategoryPage;
