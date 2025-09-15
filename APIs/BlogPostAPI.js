import userApi from "./api";

export const getAllPublishedBlogs = async () => {
  const res = await api.get("/admin/api/blogs/published");
  return res.data;
};

export const getBlogBySlug = async (slug) => {
  const res = await api.get(`/admin/api/blogs/${slug}`);
  return res.data;
};
