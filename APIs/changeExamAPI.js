import api from "./api";

export const getMyExams = async () => {
  const res = await api.get("/user/api/me/exam");
  return res.data;
};

export const addExam = async (examId) => {
  const res = await api.post("/user/api/me/exams", { examId });
  return res.data;
};

export const setCurrentExam = async (examId) => {
  const res = await api.patch("/user/api/me/exams/current", { examId });
  return res.data;
};

export const removeExam = async (examId) => {
  const res = await api.delete(`/user/api/me/exams/${examId}`);
  return res.data;
};

export const getMainCategories = async () => {
  const res = await api.get('/user/api/main');
  return res.data.categories || [];
};

export const getSubCategoriesBySlug = async (slug) => {
const res = await api.get(`/user/api/main/${slug}/categories`);
return res.data.categories || [];
};


export const getSubCategoriesByParent = async (parentId) => {
const res = await api.get(`/user/api/categories/parent/${parentId}`);
return res.data.categories || [];
};
