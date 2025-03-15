import Table from "@/components/Table";
import { couponTHeads } from "@/constants/tableHeads";
import { useRemoveCoupon } from "@/hooks/useCoupon";
import { toLocalDateString } from "@/utils/toLocalDate";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import toast from "react-hot-toast";

function CouponsListTable({ coupons }) {
  const { isDeleting, removeCoupon } = useRemoveCoupon();
  const queryClient = useQueryClient();

  const removeCouponHandler = async (id) => {
    try {
      const { message } = await removeCoupon(id);
      toast.success(message);
      queryClient.invalidateQueries(["get-coupons"]);
    } catch (error) {
      toast.error(error?.response?.data?.message);

    }
  };

  return (
    <Table>
      <Table.Header>
        {couponTHeads.map((item) => (
          <th className="whitespace-nowrap table__th" key={item.id}>
            {item.label}
          </th>
        ))}
      </Table.Header>
      <Table.Body>
        {coupons &&
          coupons.map((coupon, index) => {
            // console.log(coupon);
            return (
              <Table.Row key={coupon._id}>
                <td className="table__td">{toPersianNumbers(index + 1)}</td>
                <td className="table__td">{coupon.code}</td>
                <td className="table__td">
                  {toPersianNumbersWithComma(coupon.amount)}
                </td>
                <td className="table__td">
                  {toPersianNumbers(coupon.usageCount)}
                </td>
                <td className="table__td">
                  {toPersianNumbers(coupon.usageLimit)}
                </td>
                <td className="table__td flex flex-col items-start gap-2">
                  {coupon.productIds.map((c) => (
                    <span key={c._id} className="badge badge--secondary">
                      {c.title}
                    </span>
                  ))}
                </td>
                <td className="table__td">
                  <span className="badge badge--primary">{coupon.type}</span>
                </td>
                <td className="table__td">
                  {toLocalDateString(coupon.expireDate)}
                </td>
                <td className="table__td">
                  {coupon.isActive === true ? (
                    <span className=" badge badge--success">فعال</span>
                  ) : (
                    <span className=" badge badge--error">غیر فعال</span>
                  )}
                </td>
                <td className="table__td">
                  <div className="flex gap-2 items-center">
                    <Link
                      href={`/admin/coupons/edit/${coupon._id}`}
                      className="text-primary-700 hover:text-primary-900 duration-200"
                    >
                      <PencilIcon className=" size-5" />
                    </Link>
                    <button
                      onClick={() => removeCouponHandler(coupon._id)}
                      className="text-rose-400 hover:text-rose-500 duration-200"
                    >
                      <TrashIcon className="size-5" />
                    </button>
                  </div>
                </td>
              </Table.Row>
            );
          })}
      </Table.Body>
    </Table>
  );
}

export default CouponsListTable;

