import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IVisitor extends Document {
    instagramLink: string;
    registered: boolean;
}

const VisitorSchema: Schema<IVisitor> = new mongoose.Schema(
    {
        instagramLink: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (value: string) {
                    // Regular expression for validating Instagram link format
                    const instagramLinkRegex = /^https?:\/\/(?:www\.)?instagram\.com\/\w+(?:\/\?taken-by=\w+)?$/;
                    return instagramLinkRegex.test(value);
                },
                message: 'Invalid Instagram link format'
            }
        },
        registered: { type: Boolean, required: true, default: false }
    },
    { timestamps: true }
);

const Visitor: Model<IVisitor> = mongoose.model<IVisitor>('Visitor', VisitorSchema);

export default Visitor;
