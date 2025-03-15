import http from "./httpService";

export function getAllProductsApi(qs, cookies) {
  return http
    .get(`/product/list?${qs}`, {
      headers: {
        Cookie: cookies,
      },
    })
    .then(({ data }) => data.data);
}

export function getProductBySlugApi(slug) {
  return http.get(`/product/slug/${slug}`).then(({ data }) => data.data);
}

export function getProductByIdApi(id) {
  return http.get(`/product/${id}`).then(({ data }) => data.data);
}

export function likeProductApi(id) {
  return http.post(`/product/like/${id}`).then(({ data }) => data.data);
}
export function updateProductApi({ productId, data }) {
  return http
    .patch(`/admin/product/update/${productId}`, data)
    .then(({ data }) => data.data);
}

export function removeProductApi(id) {
  return http
    .delete(`/admin/product/remove/${id}`)
    .then(({ data }) => data.data);
}

export function addProductApi(data) {
  return http.post("/admin/product/add", data).then(({ data }) => data.data);
}
