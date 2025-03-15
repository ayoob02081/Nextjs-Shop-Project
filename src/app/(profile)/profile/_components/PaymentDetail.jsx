import Table from "@/components/Table";
import { userPaymentTHeads } from "@/constants/tableHeads";
import { toLocalDateString } from "@/utils/toLocalDate";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";

function PaymentDetail({ payments }) {
  return (
    <Table>
      <Table.Header>
        {userPaymentTHeads.map((item) => (
          <th className="whitespace-nowrap table__th" key={item.id}>
            {item.label}
          </th>
        ))}
      </Table.Header>
      <Table.Body>
        {payments.map((payment, index) => {
          // console.log(payment);
          return (
            <Table.Row key={payment._id}>
              <td className="table__td">{toPersianNumbers(index + 1)}</td>
              <td className="table__td max-w-[280px] whitespace-nowrap truncate">
                {toPersianNumbers(payment.invoiceNumber)}
              </td>
              <td className="table__td max-w-[280px] whitespace-nowrap truncate">
                {payment.description}
              </td>
              <td className="table__td">
                <div className="flex flex-col gap-y-2 items-start">
                  {payment.cart.productDetail.map((product) => (
                    <div className="badge badge--secondary" key={product._id}>
                      {product.title}
                    </div>
                  ))}
                </div>
              </td>
              <td className="table__td">
                {toPersianNumbersWithComma(payment.amount)}
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
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

export default PaymentDetail;
