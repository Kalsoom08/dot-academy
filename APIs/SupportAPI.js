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

export const getMySupportMessages = async () => {
  const res = await api.get("/user/api/support/my");
  return res.data;
};

export const getAllSupportMessages = async () => {
  const res = await api.get("/user/api/support");
  return res.data;
};

export const deleteSupportMessage = async (id) => {
  const res = await api.delete(`/user/api/support/${id}`);
  return res.data;
};
