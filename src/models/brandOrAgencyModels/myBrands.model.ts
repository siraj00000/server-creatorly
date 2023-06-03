import mongoose, { Document, Model } from 'mongoose';

export interface MyBrandAttributes {
    company_name: string;
    country: string;
    company_logo: string;
    about_brand: string;
    parent_brand_id: mongoose.Types.ObjectId;
}

export interface MyBrandModel extends Model<MyBrandDocument> {
    build(attributes: MyBrandAttributes): MyBrandDocument;
}

export interface MyBrandDocument extends Document, MyBrandAttributes {}

const myBrandSchema = new mongoose.Schema(
    {
        company_name: {
            type: String,
            required: [true, 'Company name is required!'],
            trim: true,
            maxlength: 100
        },
        country: {
            type: String,
            required: [true, 'Country is required!'],
            trim: true
        },
        company_logo: {
            type: String,
            required: [true, 'Company logo is required!']
        },
        about_brand: {
            type: String,
            required: [true, 'About brand is required!'],
            trim: true
        },
        parent_brand_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brand',
            required: [true, 'Parent brand ID is required']
        }
    },
    {
        timestamps: true
    }
);

myBrandSchema.statics.build = (attributes: MyBrandAttributes) => {
    return new MyBrand(attributes);
};

const MyBrand = mongoose.model<MyBrandDocument, MyBrandModel>('MyBrand', myBrandSchema);

export default MyBrand;
