import api from "./api";

export const getPublicStats = async () => {
  const res = await api.get("/user/api/dashboard/stats");
  return res.data.data;
};
