import mongoose from 'mongoose';
const blogPostSchema = new mongoose.Schema({
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
}, {
    timestamps: true
});
blogPostSchema.statics.build = (attributes) => {
    return new BlogPost(attributes);
};
const BlogPost = mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;
//# sourceMappingURL=blogPost.model.js.map