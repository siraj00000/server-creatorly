import mongoose from 'mongoose';
const socialLinkSchema = new mongoose.Schema({
    category: {
        type: [String],
        required: true
    },
    links: {
        type: Object,
        required: true,
        validate: {
            validator: (links) => {
                const validKeys = ['instagram', 'facebook', 'youtube', 'twitter', 'linkedin'];
                for (const key in links) {
                    if (!validKeys.includes(key)) {
                        return false;
                    }
                    const link = links[key];
                    if (!link.match(/^(http|https):\/\/[^ "]+$/)) {
                        return false;
                    }
                    if (key === 'instagram' && !link.includes('/')) {
                        return false;
                    }
                }
                return true;
            },
            message: 'Links must be valid URLs and must include a valid Instagram link with a username'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    instagramUserName: {
        type: String,
        unique: true,
        sparse: true
    }
}, { timestamps: true });
const SocialLink = mongoose.model('SocialLink', socialLinkSchema);
export default SocialLink;
//# sourceMappingURL=userSocialLinks.modal.js.map