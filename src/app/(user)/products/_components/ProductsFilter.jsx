"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import CheckBox from "@/ui/CheckBox";

function ProductsFilter({ categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const initialValue = searchParams.get("category")?.split(",") || [];
  const [selectedCategories, setSelectedCategories] = useState(initialValue);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  const categoryHandler = (e) => {
    const value = e.target.value;
    e.preventDefault();
    if (selectedCategories.includes(value)) {
      const categories = selectedCategories.filter((c) => c !== value);
      setSelectedCategories(categories);
      router.push(pathname + "?" + createQueryString("category", categories));
    } else {
      setSelectedCategories([...selectedCategories, value]);
      router.push(
        pathname +
          "?" +
          createQueryString("category", [...selectedCategories, value])
      );
    }
  };
  return (
    <div className="flex flex-col items-center justify-center sm:block max-sm:border-b max-sm:pb-4">
      <p className="font-bold mb-4 max-sm:text-sm text-secondary-900">دسته‌بندی‌ها</p>
      <ul className="flex items-center justify-center flex-wrap gap-5 sm:block sm:space-y-4 max-sm:text-xs">
        {categories.map(({ _id, englishTitle, title }) => (
          <CheckBox
            className=""
            key={_id}
            id={_id}
            value={englishTitle}
            name="product-type"
            label={title}
            onChange={categoryHandler}
            checked={selectedCategories.includes(englishTitle)}
          />
        ))}
      </ul>
    </div>
  );
}

export default ProductsFilter;
