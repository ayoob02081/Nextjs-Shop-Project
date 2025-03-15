import http from "./httpService";

export function addToCartApi(productId) {
  return http.post("/cart/add", { productId }).then(({ data }) => data.data);
}

export function removeFromCartApi(productId) {
  return http.post("/cart/remove", { productId }).then(({ data }) => data.data);
}
