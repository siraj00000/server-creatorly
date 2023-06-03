import mongoose from 'mongoose';
const UserPOCSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: [true, 'Please provide a user ID'] },
    name: { type: String, required: [true, 'Please provide a name'] },
    email: { type: String, required: [true, 'Please provide an email'] },
    phone: { type: String, required: [true, 'Please provide a phone number'] },
    designation: { type: String, required: [true, 'Please provide a designation'] }
}, { timestamps: true });
const UserPOC = mongoose.model('UserPOC', UserPOCSchema);
export default UserPOC;
//# sourceMappingURL=userPOC.mode.js.map