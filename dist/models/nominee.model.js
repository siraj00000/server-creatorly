import mongoose from 'mongoose';
const NomineeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please add a valid email']
    },
    contact: {
        type: String,
        required: [true, 'Please add a contact'],
        trim: true,
        match: [/^[0-9]{10}$/, 'Please add a valid 10 digit contact number']
    },
    relation_to_nominee: {
        type: String,
        required: [true, 'Please add a relation to nominee'],
        trim: true
    },
    name_of_nominee: {
        type: String,
        required: [true, 'Please add the name of the nominee'],
        trim: true,
        maxlength: [50, 'Name of nominee can not be more than 50 characters']
    }
}, { timestamps: true });
const Nominee = mongoose.model('Nominee', NomineeSchema);
export default Nominee;
//# sourceMappingURL=nominee.model.js.map