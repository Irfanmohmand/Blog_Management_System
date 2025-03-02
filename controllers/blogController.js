import { Blog } from "../models/blogModel.js";

export const createBlog = async (req, res) => {
  const { title, description, imgUrl } = req.body;

  await Blog.create({
    title,
    description,
    imgUrl,
    user: req.user
  })

  res.json({
    success: true,
    message: "Blog added successfully.."
  })
}


export const myBlog = async (req, res) => {
  const userId = req.user._id;
  const blog = await Blog.find({ user: userId });
  res.json({
    success: true,
    blog
  })
}


export const updateBlog = async (req, res) => {
  const { title, description, imgUrl } = req.body;

  const { id } = req.params;
  const blog = await Blog.findById(id)

  if (!blog)
    return res.status(404).json({
      success: true,
      message: "Invalid user"
    })

  blog.title = title,
    blog.description = description,
    blog.imgUrl = imgUrl

  blog.save();


  res.json({
    success: true,
    message: "Updating user",
    blog
  })
}


export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);

  if (!blog) return res.status(404).json({
    success: false,
    message: "Invalid user"
  })

  await blog.deleteOne();

  res.json({
    success: true,
    message: "blog deleted.."
  })
}