import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import crypto from 'crypto';
const emailRegex = new RegExp(`^\\b[A-Za-z0-9._%+-]+@(?!(${[
    'gmail\\.com',
    'google\\.com',
    'yahoo\\.com',
    'hotmail\\.com',
    'aol\\.com',
    'outlook\\.com',
    'live\\.com',
    'icloud\\.com',
    'mail\\.com',
    'protonmail\\.com',
    'zoho\\.com',
    'yandex\\.com',
    'outlook\\.jp'
].join('|')}))[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b`);
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: false,
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please add a phone number']
    },
    userType: {
        type: String,
        required: [true, 'Please add user']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        trim: true,
        match: [emailRegex, 'Business email is requried']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false,
        match: [/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/, 'Password must contain at least 8 characters with at least one uppercase letter, one special character, and one number']
    },
    role: {
        type: String,
        enum: ['1', '2', '3'],
        default: '2'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, { timestamps: true });
// Encrypt user password before saving to database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});
// Match user password with stored hash
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
// Generate JWT token for user
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id }, config.jwt.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};
// To reset password
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
    return resetToken;
};
const User = mongoose.model('User', userSchema);
export default User;
//# sourceMappingURL=user.model.js.map