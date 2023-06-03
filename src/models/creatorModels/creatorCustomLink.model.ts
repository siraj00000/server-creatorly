import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICreatorCustomLink extends Document {
    user_id: mongoose.Types.ObjectId;
    customLink: Array<{ title: string; link: string }>;
}

const creatorCustomLinkSchema: Schema<ICreatorCustomLink> = new mongoose.Schema(
    {
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
                            validator: function (v: string) {
                                return /https?:\/\/\S+/.test(v);
                            },
                            message: (props: { value: any; }) => `${props.value} is not a valid link format!`
                        }
                    }
                }
            ],
            required: [true, 'Custom links are required']
        }
    },
    { timestamps: true }
);

const CreatorCustomLink: Model<ICreatorCustomLink> = mongoose.model<ICreatorCustomLink>('CreatorCustomLink', creatorCustomLinkSchema);

export default CreatorCustomLink;
