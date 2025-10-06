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
