"use client";

import { toPersianNumbers, toPersianNumbersWithComma } from "@/utils/toPersianNumbers";
import CartEvents from "../../products/[slug]/_components/CartEvents";

function CartItem({ product }) {
  return (
    <div className="border border-secondary-100 rounded-lg p-4 flex gap-10 items-center justify-between shadow-md">
      <div className="flex-1">
        <span className=" font-bold">{product.title}</span>
      </div>
      <div className=" flex max-md:flex-col gap-10 items-center justify-between">
        <div>
          قیمت :{" "}
          <span
            className={`${
              product.discount ? "line-through text-gray-500" : "font-bold"
            }`}
          >
            {toPersianNumbersWithComma(product.price)}
          </span>
          {!!product.discount && (
            <div className="flex items-center gap-2 mt-2">
              <p className="font-bold">{toPersianNumbersWithComma(product.offPrice)}</p>
              <div className="bg-rose-500 px-2 py-0.5 rounded-xl text-white text-sm">
                {toPersianNumbers(product.discount)} %
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <CartEvents product={product} />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
