"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import CheckBox from "@/ui/CheckBox";

function ProductsFilter({ categories}) {
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
      router.push(
        pathname + "?" + createQueryString("category", categories)
      );
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
    <div>
      <p className="font-bold mb-4">دسته‌بندی‌ها</p>
      <ul className="space-y-4">
        {categories.map(({ _id, englishTitle, title }) => (
          <CheckBox
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
