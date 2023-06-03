import mongoose from 'mongoose';
const creatorOnlinePresenceModel = new mongoose.Schema({
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
const CreatorOnlinePresence = mongoose.model('CreatorOnlinePresence', creatorOnlinePresenceModel);
export default CreatorOnlinePresence;
//# sourceMappingURL=creatorOnlinePresence.model.js.map