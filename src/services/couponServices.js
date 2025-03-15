import http from "./httpService";

export function getAllCouponsApi() {
  return http.get("/admin/coupon/list").then(({ data }) => data.data);
}

export function getCouponByIdApi(id) {
  return http.get(`/admin/coupon/${id}`).then(({ data }) => data.data);
}

export function addCouponApi(data) {
  return http.post("/admin/coupon/add", data).then(({ data }) => data.data);
}

export function updateCouponApi({ couponId, data }) {
  return http
    .patch(`/admin/coupon/update/${couponId}`, data)
    .then(({ data }) => data.data);
}

export function removeCouponApi(id) {
  return http
    .delete(`/admin/coupon/remove/${id}`)
    .then(({ data }) => data.data);
}
