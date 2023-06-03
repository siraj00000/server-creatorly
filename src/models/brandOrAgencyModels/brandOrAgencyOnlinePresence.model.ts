import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IBrandOnlinePresence extends Document {
    category: string[];
    websiteLink: string;
    user: mongoose.Types.ObjectId;
}

const BrandOnlinePresenceModel: Schema<IBrandOnlinePresence> = new mongoose.Schema(
    {
        category: {
            type: [String],
            required: true
        },
        websiteLink: {
            type: String,
            required: true,
            validate: {
                validator: (link: string) => {
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
    },
    { timestamps: true }
);

const BrandOnlinePresence: Model<IBrandOnlinePresence> = mongoose.model<IBrandOnlinePresence>('BrandOnlinePresence', BrandOnlinePresenceModel);

export default BrandOnlinePresence;
