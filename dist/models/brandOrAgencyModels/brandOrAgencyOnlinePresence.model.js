import mongoose from 'mongoose';
const BrandOnlinePresenceModel = new mongoose.Schema({
    category: {
        type: [String],
        required: true
    },
    websiteLink: {
        type: String,
        required: true,
        validate: {
            validator: (link) => {
                return link.match(/^(http|https):\/\/[^ "]+$/);
            },
            message: 'Link must be a valid URL'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });
const BrandOnlinePresence = mongoose.model('BrandOnlinePresence', BrandOnlinePresenceModel);
export default BrandOnlinePresence;
//# sourceMappingURL=brandOrAgencyOnlinePresence.model.js.map