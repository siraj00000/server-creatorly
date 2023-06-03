import BlogPost from '../models/BlogPostSchema.js';
import cloudinary from 'cloudinary';
import { ErrorResponse } from '../utils/errorResponse.js';
import { validateMimeType } from '../utils/validateMimeType.js';
import { removeTmp } from '../utils/removeFolder.js';
class BlogPostController {
    async fetchBlogs(req, res, next) {
        try {
            const posts = await BlogPost.find();
            res.status(200).json({
                success: true,
                data: posts
            });
        }
        catch (error) {
            next(error);
        }
    }
    async CreateBlogPost(req, res, next) {
        try {
            if (!req.file) {
                throw new ErrorResponse(400, 'Image is required');
            }
            let isValidFile = validateMimeType(req.file?.mimetype);
            if (!isValidFile)
                throw new ErrorResponse(400, 'Invalid image type');
            const result = await cloudinary.v2.uploader.upload(req.file?.path, { folder: 'blog-post' });
            // remove temp file
            removeTmp(req.file.path);
            const post = await BlogPost.create({
                title: req.body.title,
                imageUrl: result.secure_url
            });
            res.status(201).json({
                success: true,
                data: post
            });
        }
        catch (error) {
            next(error);
        }
    }
}
export default new BlogPostController();
//# sourceMappingURL=BlogPostController.js.map