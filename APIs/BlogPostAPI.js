import userApi from "./api";

export const getAllPublishedBlogs = async () => {
  const res = await userApi.get("/user/api/blogs");
  return res.data;
};

export const getPublishedBlogBySlug = async (slug) => {
  const res = await userApi.get(`/user/api/blogs/${slug}`);
  return res.data;
};
