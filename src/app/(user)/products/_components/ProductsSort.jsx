"use client";

import RadioButton from "@/ui/RadioButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const sortOptions = [
  {
    id: 1,
    value: "latest",
    label: "جدید ترین",
  },
  {
    id: 2,
    value: "earliest",
    label: "قدیمی‌ ترین",
  },
  {
    id: 3,
    value: "popular",
    label: "محبوب‌ ‌ترین",
  },
];

function ProductsSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [sort, setSort] = useState("");
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const sortHandler = (e) => {
    const value = e.target.value;
    e.preventDefault();
    setSort(value);
    router.push(pathname + "?" + createQueryString("sort", value));
  };

  useEffect(() => {
    setSort(searchParams.get("sort") || "");
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center sm:block max-sm:border-b max-sm:py-4">
      <p className="font-bold mb-4 max-sm:text-sm">مرتب‌سازی</p>
      <ul className="flex items-center justify-center gap-4 sm:block sm:space-y-4 max-sm:text-xs">
        {sortOptions.map(({ id, value, label }) => {
          return (
            <RadioButton
              key={id}
              id={id}
              value={value}
              name="product-sort"
              label={label}
              onChange={sortHandler}
              checked={sort === value}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ProductsSort;
