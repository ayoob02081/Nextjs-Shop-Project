// "use client";

import Link from "next/link";
import CartEvents from "./CartEvents";
import LikeProduct from "./LikeProduct";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";

function SingleProduct({ product,className }) {
  return (
    <div className={`col-span-1 flex flex-col items-start gap-4 space-y-4 justify-between border rounded-xl shadow-md p-4 ${className}`}>
      <div className="w-full h-36 flex items-center justify-center border rounded-xl">
        {product.imageLink}
      </div>
      <div
        className="w-full
    "
      >
        <div className="flex items-center justify-between w-full">
          {product && (
            <Link href={`/products/${product.slug}`}>
              <h3 className="font-bold text-lg text-secondary-900">
                {product.title}
              </h3>
            </Link>
          )}
          <LikeProduct product={product} />
        </div>
        <p className="text-secondary-600">{product.description}</p>
        <div dir="ltr" className="flex items-center gap-2">
          <span
            className={`${
              product.discount ? "line-through text-secondary-700" : ""
            } text-lg`}
          >
            {toPersianNumbersWithComma(product.price)}
          </span>
          <p className="flex items-center justify-center badge bg-rose-500 text-white size- rounded-full py-0.5 px-2 text-sm">
            {toPersianNumbers(product.discount)} %
          </p>
        </div>
        <div dir="ltr" className="flex items-center gap-2">
          <p>تومان</p>
          <span className="text-xl font-bold text-secondary-900">
            {toPersianNumbersWithComma(product.offPrice)}
          </span>
        </div>
      </div>

      <CartEvents product={product} />
    </div>
  );
}

export default SingleProduct;
