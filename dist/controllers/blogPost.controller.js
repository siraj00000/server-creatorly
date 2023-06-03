import BlogPost from '../models/blogPost.model.js';
import cloudinary from 'cloudinary';
import { ErrorResponse } from '../utils/error_response.utils.js';
import { validateMimeType } from '../utils/validate_mimetype.utils.js';
import { removeTmp } from '../utils/remove_folde.utils.js';
import { ObjectId } from 'mongodb';
class BlogPostController {
    async createBlogPost(req, res, next) {
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
                blogPara: req.body.blogPara,
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
    async fetchBlogs(req, res, next) {
        try {
            const posts = await BlogPost.find().limit(3).sort({ _id: -1 });
            res.status(200).json({
                success: true,
                data: posts
            });
        }
        catch (error) {
            next(error);
        }
    }
    async fetchSpecificBlogs(req, res, next) {
        try {
            const { id } = req.params;
            let singleBlogPost;
            let allBlogPost;
            if (id && ObjectId.isValid(id)) {
                singleBlogPost = await BlogPost.findOne({ _id: id });
                const query = { _id: { $ne: new ObjectId(id) } };
                allBlogPost = await BlogPost.find(query).limit(3).sort({ _id: -1 });
            }
            else {
                allBlogPost = await BlogPost.find().limit(3).sort({ _id: -1 });
            }
            res.status(200).json({
                success: true,
                data: {
                    singleBlogPost: singleBlogPost || allBlogPost[0],
                    blogs: allBlogPost
                }
            });
        }
        catch (error) {
            next(error);
        }
    }
}
export default new BlogPostController();
//# sourceMappingURL=blogPost.controller.js.map