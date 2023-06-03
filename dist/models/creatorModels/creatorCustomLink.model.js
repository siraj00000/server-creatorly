import mongoose from 'mongoose';
const creatorCustomLinkSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User ID is required']
    },
    customLink: {
        type: [
            {
                title: {
                    type: String,
                    required: [true, 'Title is required']
                },
                link: {
                    type: String,
                    required: [true, 'Link is required'],
                    validate: {
                        validator: function (v) {
                            return /https?:\/\/\S+/.test(v);
                        },
                        message: (props) => `${props.value} is not a valid link format!`
                    }
                }
            }
        ],
        required: [true, 'Custom links are required']
    }
}, { timestamps: true });
const CreatorCustomLink = mongoose.model('CreatorCustomLink', creatorCustomLinkSchema);
export default CreatorCustomLink;
//# sourceMappingURL=creatorCustomLink.model.js.map