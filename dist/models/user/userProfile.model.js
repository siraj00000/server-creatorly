import mongoose from 'mongoose';
const UserProfileSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: [true, 'Please provide a user ID'] },
    date_of_birth: { type: Date, required: [false, 'Please provide a date of birth'] },
    languages: { type: [String], required: [false, 'Please provide at least one language'] },
    gender: { type: String, required: [false, 'Please provide a gender'] },
    category: { type: [String], required: [false, 'Please provide a category'] },
    region: { type: String, required: [false, 'Please provide a region'] },
    about: { type: String, required: [false, 'Please provide information about yourself'] },
    contact_email: { type: String, required: [false, 'Please provide a contact email'] },
    profile_image_url: { type: String, required: [false, 'Please provide a profile image URL'] }
}, { timestamps: true });
const UserProfile = mongoose.model('UserProfile', UserProfileSchema);
export default UserProfile;
//# sourceMappingURL=userProfile.model.js.map