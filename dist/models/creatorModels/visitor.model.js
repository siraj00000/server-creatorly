import mongoose from 'mongoose';
const VisitorSchema = new mongoose.Schema({
    instagramLink: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                // Regular expression for validating Instagram link format
                const instagramLinkRegex = /^https?:\/\/(?:www\.)?instagram\.com\/\w+(?:\/\?taken-by=\w+)?$/;
                return instagramLinkRegex.test(value);
            },
            message: 'Invalid Instagram link format'
        }
    },
    registered: { type: Boolean, required: true, default: false }
}, { timestamps: true });
const Visitor = mongoose.model('Visitor', VisitorSchema);
export default Visitor;
//# sourceMappingURL=visitor.model.js.map