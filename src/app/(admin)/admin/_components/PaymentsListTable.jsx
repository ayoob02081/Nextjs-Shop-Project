"use client";

import Table from "@/components/Table";
import { paymentsTHeads } from "@/constants/tableHeads";
import { toLocalDateString } from "@/utils/toLocalDate";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";
import { EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function PaymentsListTable({ payments }) {
  return (
    <Table>
      <Table.Header>
        {paymentsTHeads.map((item) => (
          <th className="whitespace-nowrap table__th" key={item.id}>
            {item.label}
          </th>
        ))}
      </Table.Header>
      <Table.Body>
        {payments &&
          payments.map((payment, index) => {
            // console.log(payment);
            return (
              <Table.Row key={payment._id}>
                <td className="table__td">{toPersianNumbers(index + 1)}</td>
                <td className="table__td max-w-[280px] whitespace-nowrap truncate">
                  {payment.user.name}
                </td>
                <td className="table__td max-w-[280px] whitespace-nowrap truncate">
                  {toPersianNumbers(payment.invoiceNumber)}
                </td>
                <td className="table__td">
                  {toPersianNumbers(payment.cart.productDetail.length)}
                </td>
                <td className="table__td">
                  <span className="font-bold">
                    {toPersianNumbersWithComma(payment.amount)}
                  </span>
                </td>
                <td className="table__td">
                  {toLocalDateString(payment.createdAt)}
                </td>
                <td className="table__td">
                  {payment.status === "COMPLETED" ? (
                    <span className="badge badge--success">موفق</span>
                  ) : (
                    <span className="badge badge--error">ناموفق</span>
                  )}
                </td>
                <td className="table__td">
                  <Link
                    href={`/admin/payments/${payment._id}`}
                    className="text-secondary-500 hover:text-secondary-900 duration-200"
                  >
                    <EyeIcon className=" size-5" />
                  </Link>
                </td>
              </Table.Row>
            );
          })}
      </Table.Body>
    </Table>
  );
}

export default PaymentsListTable;
