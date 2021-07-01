import Vue from "vue";
import VueRouter from "vue-router";
import Admin from "../views/AdminExhibition.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "AdminExhibition",
    component: Admin,
  },
  {
    path: "/detail",
    name: "Detail",
    props: true,
    component: () => import("../views/AdminProductDetail.vue"),
  },
  {
    path: "/payment",
    name: "Payment",
    component: () => import("../views/AdminProductPayment.vue"),
  },
  {
    path: "/payment/paymentdetail",
    name: "PaymentDetail",
    component: () => import("../views/AdminProductPaymentDetail.vue"),
    props: true,
  },
  {
    path: "/product",
    name: "Product",
    component: () => import("../views/AdminProduct.vue"),
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/AdminUser.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
