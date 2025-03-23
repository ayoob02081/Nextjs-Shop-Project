import Loading from "@/components/Loading";
import { createPaymentApi } from "@/services/paymentServices";
import { toPersianNumbersWithComma } from "@/utils/toPersianNumbers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function CartSummery({ payDetail }) {
  const { totalOffAmount, totalPrice, totalGrossPrice } = payDetail;
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: createPaymentApi,
  });

  const createPaymentHandler = async () => {
    try {
      const { message } = await mutateAsync();
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="border border-secondary-400 shadow-md p-4 rounded-xl">
      <p className="font-bold mb-4 text-secondary-900">اطلاعات پرداخت</p>
      <div className="mb-4 flex items-center justify-between">
        <span>جمع کل: </span>
        <span>{toPersianNumbersWithComma(totalGrossPrice)} </span>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <span>تخفیف </span>
        <span>{toPersianNumbersWithComma(totalOffAmount)} -</span>
      </div>
      <div className="mb-4 flex items-center justify-between font-bold">
        <span className="text-secondary-900">مبلغ قابل پرداخت: </span>
        <span className="text-primary-900">
          {toPersianNumbersWithComma(totalPrice)}{" "}
        </span>
      </div>
      {isPending ? (
        <Loading />
      ) : (
        <button
          className="btn btn--primary w-full"
          onClick={createPaymentHandler}
        >
          ثبت سفارش
        </button>
      )}
    </div>
  );
}

export default CartSummery;
