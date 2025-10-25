import api from "./api";

export const createSupportMessage = async (message) => {
  try {
    const res = await api.post("/user/api/support", { message });
    return res.data;
  } catch (error) {
    console.error("Support API Error:", error.response?.data || error.message);
    throw error;
  }
};

export const getAllSupportMessages = async (params = {}) => {
  try {
    const res = await api.get("/user/api/support", { params });
    return res.data;
  } catch (error) {
    console.error("Get All Support Messages Error:", error.response?.data || error.message);
    throw error;
  }
};