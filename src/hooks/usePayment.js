import {
  getAllPaymentsApi,
  getPaymentByIdApi,
} from "@/services/paymentServices";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPayments = () =>
  useQuery({
    queryKey: ["get-payments"],
    queryFn: getAllPaymentsApi,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetPaymentById = (id) =>
  useQuery({
    queryKey: ["get-payment", id],
    queryFn: () => getPaymentByIdApi(id),
    retry: false,
    refetchOnWindowFocus: true,
  });
