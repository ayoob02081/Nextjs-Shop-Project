"use client";

import Loading from "@/components/Loading";
import { useGetAllCategories } from "@/hooks/useCategories";
import { useUpdateProduct } from "@/hooks/useProducts";
import TextField from "@/ui/TextField";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import { TagsInput } from "react-tag-input-component";

const productFormData = [
  {
    id: 1,
    label: "عنوان",
    name: "title",
  },
  {
    id: 2,
    label: "توضیحات",
    name: "description",
  },
  {
    id: 3,
    label: "اسلاگ",
    name: "slug",
  },
  {
    id: 4,
    label: "برند",
    name: "brand",
  },
  {
    id: 5,
    label: "قیمت",
    name: "price",
  },
  {
    id: 6,
    label: "تخفیف",
    name: "discount",
  },
  {
    id: 7,
    label: "قیمت با تخفیف",
    name: "offPrice",
  },
  {
    id: 8,
    label: "موجودی",
    name: "countInStock",
  },
  {
    id: 9,
    label: "لینک عکس محصول",
    name: "imageLink",
  },
];

function ProductForm({ productToEdit }) {
  const queryClient = useQueryClient();
  const { id } = useParams();
  // console.log(productToEdit);
  const {
    _id,
    category,
    title,
    description,
    slug,
    brand,
    price,
    discount,
    offPrice,
    countInStock,
    imageLink,
    tags: preveTags,
  } = productToEdit;

  const [formData, setFormData] = useState({
    title,
    description,
    slug,
    brand,
    price,
    discount,
    offPrice,
    countInStock,
    imageLink,
  });
  const { data, isLoading: isLoadingProducts } = useGetAllCategories();
  const { isPending, mutateAsync } = useUpdateProduct();
  const { categories } = data || {};
  const router = useRouter();
  const [tags, setTags] = useState(preveTags || []);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        productId: _id,
        data: {
          ...formData,
          tags,
          category: selectedCategory._id,
        },
      });
      queryClient.invalidateQueries(["queryClient"]);
      router.push("/admin/products");
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {productFormData.map((item) => {
        return (
          <TextField
            key={item.id}
            label={item.label}
            name={item.name}
            value={formData[item.name]}
            onChange={handleChange}
          />
        );
      })}
      <div className="space-y-4">
        <label className="text-secondary-600 text-lg mb-4" htmlFor="tags">
          تگ محصولات
        </label>
        <TagsInput
          name="tags"
          id="tags"
          value={tags}
          onChange={setTags}
          classNames={{ tag: "mt-1", input: "" }}
        />
      </div>
      <div className="space-y-4">
        <label className="text-secondary-600 text-lg" htmlFor="category">
          دسته‌بندی محصولات
        </label>
        <Select
          classNames={{
            control: (state) =>
              state.isFocused
                ? "outline-none bg-white shadow-input-focus border-primary-300 "
                : "bg-gray-100 border-gray-100 outline-none",
          }}
          instanceId="category"
          getOptionValue={(option) => option._id}
          getOptionLabel={(option) => option.title}
          onChange={setSelectedCategory}
          options={categories}
          defaultValue={category}
        />
      </div>
      {isPending ? (
        <Loading />
      ) : (
        <button className="btn btn--primary">اضافه کردن محصول</button>
      )}
    </form>
  );
}

export default ProductForm;
