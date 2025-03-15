import Table from "@/components/Table";
import { categoryTHeads } from "@/constants/tableHeads";
import { useRemoveCategory } from "@/hooks/useCategories";
import { toLocalDateString } from "@/utils/toLocalDate";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import toast from "react-hot-toast";

function CategoriesListTable({ categories }) {
  const { isDeleting, removeCategory } = useRemoveCategory();
  const queryClient = useQueryClient();

  const removeCategoryHandler = async (id) => {
    try {
      const { message } = await removeCategory(id);
      toast.success(message);
      queryClient.invalidateQueries(["get-categories"]);
    } catch (error) {
      toast.error(error?.response?.data?.message);

    }
  };

  return (
    <Table>
      <Table.Header>
        {categoryTHeads.map((item) => (
          <th className="whitespace-nowrap table__th" key={item.id}>
            {item.label}
          </th>
        ))}
      </Table.Header>
      <Table.Body>
        {categories &&
          categories.map((category, index) => {
            // console.log(category);
            return (
              <Table.Row key={category._id}>
                <td className="table__td">{toPersianNumbers(index + 1)}</td>
                <td className="table__td">{category.title}</td>
                <td className="table__td">{category.englishTitle}</td>
                <td className="table__td max-w-[280px] whitespace-nowrap truncate">
                  {category.description}
                </td>
                <td className="table__td">
                  <span className=" badge badge--secondary">
                    {category.type}
                  </span>
                </td>
                <td className="table__td">
                  {toLocalDateString(category.createdAt)}
                </td>

                <td className="table__td">
                  <div className="flex gap-2 items-center">
                    <Link
                      href={`/admin/categories/edit/${category._id}`}
                      className="text-primary-700 hover:text-primary-900 duration-200"
                    >
                      <PencilIcon className=" size-5" />
                    </Link>
                    <button
                      onClick={() => removeCategoryHandler(category._id)}
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

export default CategoriesListTable;


