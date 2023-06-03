import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICreatorOnlinePresence extends Document {
    category: string[];
    links: {
        instagram?: string;
        facebook?: string;
        youtube?: string;
        twitter?: string;
        linkedin?: string;
    };
    user: mongoose.Types.ObjectId;
    instagramUserName?: string;
}

const creatorOnlinePresenceModel: Schema<ICreatorOnlinePresence> = new mongoose.Schema(
    {
        category: {
            type: [String],
            required: true
        },
        links: {
            type: Object,
            required: true,
            validate: {
                validator: (links: any) => {
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
    },
    { timestamps: true }
);

const CreatorOnlinePresence: Model<ICreatorOnlinePresence> = mongoose.model<ICreatorOnlinePresence>('CreatorOnlinePresence', creatorOnlinePresenceModel);

export default CreatorOnlinePresence;
