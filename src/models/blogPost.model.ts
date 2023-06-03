import mongoose, { Document, Model } from 'mongoose';

export interface BlogPostAttributes {
    title: string;
    blogPara: string;
    imageUrl: string;
}

export interface BlogPostModel extends Model<BlogPostDocument> {
    build(attributes: BlogPostAttributes): BlogPostDocument;
}

export interface BlogPostDocument extends Document, BlogPostAttributes {}

const blogPostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Blog title is required!'],
            trim: true,
            maxlength: 100
        },
        blogPara: {
            type: String,
            required: [true, 'Blog paragraph is required!'],
            trim: true
        },
        imageUrl: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

blogPostSchema.statics.build = (attributes: BlogPostAttributes) => {
    return new BlogPost(attributes);
};

const BlogPost = mongoose.model<BlogPostDocument, BlogPostModel>('BlogPost', blogPostSchema);

export default BlogPost;
