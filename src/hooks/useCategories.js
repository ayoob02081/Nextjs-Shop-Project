import {
  addCategoryApi,
  getAllCategoriesApi,
  getCategoryById,
  removeCategoryApi,
  updateCategoryApi,
} from "@/services/categoryServices";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllCategories = () =>
  useQuery({
    queryKey: ["get-categories"],
    queryFn: getAllCategoriesApi,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetCategoryById = (id) =>
  useQuery({
    queryKey: ["get-category", id],
    queryFn: () => getCategoryById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

export function useAddCategory() {
  const { isPending, mutateAsync: addCategory } = useMutation({
    mutationFn: addCategoryApi,
  });
  return { isPending, addCategory };
}

export function useUpdateCategory() {
  const { isPending, mutateAsync: updateCategory } = useMutation({
    mutationFn: updateCategoryApi,
  });
  return { isPending, updateCategory };
}

export function useRemoveCategory() {
  const { isPending: isDeleting, mutateAsync: removeCategory } = useMutation({
    mutationFn: removeCategoryApi,
  });
  return { isDeleting, removeCategory };
}
