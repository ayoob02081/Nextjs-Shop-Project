import { addToCartApi, removeFromCartApi } from "@/services/cartServices";
import { likeProductApi } from "@/services/productServices";
import { useMutation } from "@tanstack/react-query";

export function useAddToCart() {
  const { isPending, mutateAsync } = useMutation({ mutationFn: addToCartApi });
  return { isPending, mutateAsync };
}

export function useRemoveFromCart() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: removeFromCartApi,
  });
  return { isPending, mutateAsync };
}

export function useLikeProduct() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: likeProductApi,
  });
  return { isPending, mutateAsync };
}
