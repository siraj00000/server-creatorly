import mongoose from 'mongoose';
const myBrandSchema = new mongoose.Schema({
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
}, {
    timestamps: true
});
myBrandSchema.statics.build = (attributes) => {
    return new MyBrand(attributes);
};
const MyBrand = mongoose.model('MyBrand', myBrandSchema);
export default MyBrand;
//# sourceMappingURL=myBrands.model.js.map