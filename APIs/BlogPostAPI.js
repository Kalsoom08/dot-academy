import api from "./api";

export const getAllPublishedBlogs = async () => {
  const res = await api.get("/user/api/blogs");
  return res.data;
};

export const getBlogBySlug = async (slug) => {
  const res = await api.get(`/user/api/blogs/${slug}`);
  return res.data;
};
