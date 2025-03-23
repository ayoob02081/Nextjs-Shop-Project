"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAddCategory } from "@/hooks/useCategories";
import CategoryForm from "../../_components/CategoryForm";
import GoBack from "@/ui/GoBack";

function AddProductPage() {
  const [category, setCategory] = useState({
    title: "",
    englishTitle: "",
    description: "",
    type: "",
  });
  const { isPending, addCategory } = useAddCategory();
  const router = useRouter();

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };
  const [selectedType, setSelectedType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await addCategory({
        ...category,
        type: selectedType.name,
      });
      router.push("/admin/categories");
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="space-y-8 w-full max-w-sm h-auto">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-secondary-900 text-xl">
          اضافه کردن دسته‌بندی
        </h1>
        <GoBack />
      </div>
      <CategoryForm
        formData={category}
        handleChange={handleChange}
        isPending={isPending}
        onSubmit={handleSubmit}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
    </div>
  );
}

export default AddProductPage;
