import mongoose from 'mongoose';
const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    imageUrl: {
        type: String,
        required: true
    }
});
blogPostSchema.statics.build = (attributes) => {
    return new BlogPost(attributes);
};
const BlogPost = mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;
//# sourceMappingURL=BlogPostSchema.js.map