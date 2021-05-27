import axios from "axios";

const apiClient = axios.create({
  baseURL: `https://advist.herokuapp.com`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getEvents() {
    return apiClient.get("/admin/payment");
  },
  getExhibition() {
    return apiClient.get("/exhibition/admin");
  },
  getURL(id) {
    return apiClient.get("/admin/paymentdetail/" + id);
  },
  async getRefund(id, reason) {
    try {
      const response = await apiClient.post("/admin/refund", {
        orderId: id,
        reason: reason,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  },
};
