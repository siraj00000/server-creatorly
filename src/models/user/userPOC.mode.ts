import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUserPOC extends Document {
    user_id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    designation: string;
}

const UserPOCSchema: Schema<IUserPOC> = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, required: [true, 'Please provide a user ID'] },
        name: { type: String, required: [true, 'Please provide a name'] },
        email: { type: String, required: [true, 'Please provide an email'] },
        phone: { type: String, required: [true, 'Please provide a phone number'] },
        designation: { type: String, required: [true, 'Please provide a designation'] }
    },
    { timestamps: true }
);

const UserPOC: Model<IUserPOC> = mongoose.model<IUserPOC>('UserPOC', UserPOCSchema);

export default UserPOC;
