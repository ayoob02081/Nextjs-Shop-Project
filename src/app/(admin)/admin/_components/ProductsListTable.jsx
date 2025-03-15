"use client";

import Table from "@/components/Table";
import { productTHeads } from "@/constants/tableHeads";
import { useRemoveProduct } from "@/hooks/useProducts";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import toast from "react-hot-toast";

function ProductsListTable({ products }) {
  const { isDeleting, removeProduct } = useRemoveProduct();
  const queryClient = useQueryClient();

  const removeProductHandler = async (id) => {
    try {
      const { message } = await removeProduct(id);
      toast.success(message);
      queryClient.invalidateQueries(["get-products"]);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <Table>
      <Table.Header>
        {productTHeads.map((item) => (
          <th className="whitespace-nowrap table__th" key={item.id}>
            {item.label}
          </th>
        ))}
      </Table.Header>
      <Table.Body>
        {products &&
          products.map((product, index) => {
            // console.log(product);
            return (
              <Table.Row key={product._id}>
                <td className="table__td">{toPersianNumbers(index + 1)}</td>
                <td className="table__td max-w-[280px] whitespace-nowrap truncate">
                  {product.title}
                </td>
                <td className="table__td max-w-[280px] whitespace-nowrap truncate">
                  {product.brand}
                </td>
                <td className="table__td max-w-[280px] whitespace-nowrap truncate">
                  {product.category.title}
                </td>
                <td className="table__td">
                  {toPersianNumbers(product.countInStock)}
                </td>

                <td className="table__td">
                  {toPersianNumbersWithComma(product.price)}
                </td>
                <td className="table__td">
                  %{toPersianNumbers(product.discount)}
                </td>
                <td className="table__td">
                  {toPersianNumbersWithComma(product.offPrice)}
                </td>
                <td className="table__td">
                  <div className="flex gap-2 items-center">
                    <Link
                      href={`/admin/products/${product._id}`}
                      className="text-secondary-500 hover:text-secondary-900 duration-200"
                    >
                      <EyeIcon className=" size-5" />
                    </Link>
                    <Link
                      href={`/admin/products/edit/${product._id}`}
                      className="text-primary-700 hover:text-primary-900 duration-200"
                    >
                      <PencilIcon className=" size-5" />
                    </Link>
                    <button
                      onClick={() => removeProductHandler(product._id)}
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

export default ProductsListTable;
