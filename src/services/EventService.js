import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:5000/`,
  // baseURL: `https://advist.herokuapp.com`,
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
  allItems() {
    return apiClient.get("/item/admin/allitem");
  },
  getItem(id) {
    return apiClient.get("/item/admin/" + id);
  },
  allItemsInfo() {
    return apiClient.get("/item/admin/alliteminfo");
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
      alert("정상적으로 잘 처리되었습니다.");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  },

  async updateProductDetail(postData) {
    try {
      const response = await apiClient.post("/admin/updateproductdetail", {
        postData,
      });
      console.log(response.data);
      alert("정상적으로 잘 처리되었습니다.");
    } catch (error) {
      console.log(error);
      alert(error);
    }
    return "done";
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
      alert("정상적으로 잘 처리되었습니다.");
    } catch (error) {
      console.log(error);
      alert(error);
    }
    return "done";
  },

  async newExhibitionSave(title, dateStart, dateEnd, visible, rank, itemId) {
    try {
      const response = await apiClient.post("/admin/newexhibition", {
        title: title,
        dateStart: dateStart,
        dateEnd: dateEnd,
        visible: visible,
        rank: rank,
        itemId: itemId,
      });
      console.log(response.data);
      alert("정상적으로 잘 처리되었습니다.");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  },
  async newProductDetailSave(postData) {
    try {
      const response = await apiClient.post("/admin/newproductdetail", {
        postData,
      });
      console.log(response.data);
      alert("정상적으로 잘 처리되었습니다.");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  },
};
