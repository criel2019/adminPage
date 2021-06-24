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
  getUserInfo() {
    return apiClient.get("/admin/user/");
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

  async updateExhibition(
    exhibitionId,
    title,
    dateStart,
    dateEnd,
    visible,
    rank,
    itemId
  ) {
    try {
      const response = await apiClient.post("/admin/updateexhibition", {
        exhibitionId: exhibitionId,
        title: title,
        dateStart: dateStart,
        dateEnd: dateEnd,
        visible: visible,
        rank: rank,
        itemId: itemId,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    return "done";
  },

  async newExhibitionSave(title, dateStart, dateEnd, visible, rank) {
    try {
      console.log(title, dateStart, dateEnd);
      const response = await apiClient.post("/admin/newexhibition", {
        title: title,
        dateStart: dateStart,
        dateEnd: dateEnd,
        visible: visible,
        rank: rank,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  },
};
