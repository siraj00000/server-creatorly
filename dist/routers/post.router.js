import { Router } from 'express';
import BlogPostController from '../controllers/blogPost.controller.js';
import { upload } from '../middleware/upload_file.middleware.js';
const blogPostRouter = Router();
blogPostRouter
    .post('/blog-post', upload.single('image'), BlogPostController.createBlogPost)
    .get('/blog-post', BlogPostController.fetchBlogs)
    .post('/blog-post/:id', BlogPostController.fetchSpecificBlogs);
export default blogPostRouter;
//# sourceMappingURL=post.router.js.map