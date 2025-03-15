// "use client";

import Link from "next/link";
import CartEvents from "./CartEvents";
import LikeProduct from "./LikeProduct";

function SingleProduct({ product }) {
  return (
    <div className="col-span-1flex flex-col items-start gap-4 space-y-4 justify-between border rounded-xl shadow-md p-4">
      <div className="w-full h-36 flex items-center justify-center border rounded-xl">{product.imageLink}</div>
      <div
        className="w-full
    "
      >
        <div className="flex items-center justify-between w-full">
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-bold text-lg text-secondary-900">{product.title}</h3>
          </Link>
          <LikeProduct product={product} />
        </div>
        <p className="text-secondary-600">{product.description}</p>
      </div>

      <CartEvents product={product} />
    </div>
  );
}

export default SingleProduct;
