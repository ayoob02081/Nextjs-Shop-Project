import {
  addCouponApi,
  getAllCouponsApi,
  getCouponByIdApi,
  removeCouponApi,
  updateCouponApi,
} from "@/services/couponServices";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllCoupons = () =>
  useQuery({
    queryKey: ["get-coupons"],
    queryFn: getAllCouponsApi,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetCouponById = (id) =>
  useQuery({
    queryKey: ["get-coupon", id],
    queryFn: () => getCouponByIdApi(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

export function useAddCoupon() {
  const { isPending, mutateAsync: addCoupon } = useMutation({
    mutationFn: addCouponApi,
  });
  return { isPending, addCoupon };
}

export function useUpdateCoupon() {
  const { isPending, mutateAsync: updateCoupon } = useMutation({
    mutationFn: updateCouponApi,
  });
  return { isPending, updateCoupon };
}

export function useRemoveCoupon() {
  const { isPending: isDeleting, mutateAsync: removeCoupon } = useMutation({
    mutationFn: removeCouponApi,
  });
  return { isDeleting, removeCoupon };
}
