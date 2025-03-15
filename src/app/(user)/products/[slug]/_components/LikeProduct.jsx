"use client";

import { likeProductApi } from "@/services/productServices";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

function LikeProduct({ product }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const LikeProductHandler = async () => {
    try {
      const { message } = await likeProductApi(product._id);
      router.refresh(pathname + "?" + searchParams.toString());
      toast.success(message);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };
  return (
    <button onClick={LikeProductHandler}>
      {!!product.isLiked ? (
        <HeartIconSolid className="size-6 text-rose-500" />
      ) : (
        <HeartIcon className="size-6 text-rose-500" />
      )}
    </button>
  );
}

export default LikeProduct;
