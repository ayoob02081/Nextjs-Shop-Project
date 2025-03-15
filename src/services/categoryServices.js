import http from "./httpService";

export function getAllCategoriesApi() {
  return http.get("/category/list").then(({ data }) => data.data);
}

export function getCategoryById(id) {
  return http.get(`/category/${id}`).then(({ data }) => data.data);
}

export function addCategoryApi(data) {
  return http.post("/admin/category/add", data).then(({ data }) => data.data);
}

export function updateCategoryApi({ categoryId, data }) {
  return http
    .patch(`/admin/category/update/${categoryId}`, data)
    .then(({ data }) => data.data);
}

export function removeCategoryApi(id) {
  return http
    .delete(`/admin/category/remove/${id}`)
    .then(({ data }) => data.data);
}
