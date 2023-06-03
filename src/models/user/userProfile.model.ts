import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUserProfile extends Document {
    user_id: mongoose.Types.ObjectId;
    date_of_birth: Date;
    languages: string[];
    gender: string;
    category: string[];
    region: string;
    about: string;
    contact_email: string;
    profile_image_url: string
}

const UserProfileSchema: Schema<IUserProfile> = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, required: [true, 'Please provide a user ID'] },
        date_of_birth: { type: Date, required: [false, 'Please provide a date of birth'] },
        languages: { type: [String], required: [false, 'Please provide at least one language'] },
        gender: { type: String, required: [false, 'Please provide a gender'] },
        category: { type: [String], required: [false, 'Please provide a category'] },
        region: { type: String, required: [false, 'Please provide a region'] },
        about: { type: String, required: [false, 'Please provide information about yourself'] },
        contact_email: { type: String, required: [false, 'Please provide a contact email'] },
        profile_image_url: { type: String, required: [false, 'Please provide a profile image URL'] }
    },
    { timestamps: true }
);

const UserProfile: Model<IUserProfile> = mongoose.model<IUserProfile>('UserProfile', UserProfileSchema);

export default UserProfile;
