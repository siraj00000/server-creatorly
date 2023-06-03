import mongoose from 'mongoose';
// Create the schema for the masterInvoice
const masterInvoiceSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    invoice_name: {
        type: String,
        required: [true, 'Please provide the invoice name.'] // Specify the custom error message for required field
    },
    invoice_image: {
        type: String
    },
    invoice_number: {
        type: String,
        unique: true,
        required: [true, 'Please provide the invoice number.'] // Specify the custom error message for required field
    },
    date: {
        type: Date,
        required: [true, 'Please provide the invoice date.'] // Specify the custom error message for required field
    },
    due: {
        type: Date
    },
    note: {
        type: String
    },
    signature: {
        type: String
    },
    from: {
        type: {
            Name: { type: String, required: [true, 'Please provide the sender name.'] },
            Email: { type: String, required: [true, 'Please provide the sender email.'] },
            Address: { type: String, required: [false, 'Please provide the sender address.'] },
            Phone: { type: String, required: [false, 'Please provide the sender phone number.'] },
            BusinessNumber: { type: String, required: [false, 'Please provide the sender business number.'] } // Specify the custom error message for required field
        },
        required: [true, 'Please provide the sender information.'] // Specify the custom error message for required field
    },
    to: {
        type: {
            Name: { type: String, required: [true, 'Please provide the recipient name.'] },
            Email: { type: String, required: [true, 'Please provide the recipient email.'] },
            Address: { type: String, required: [true, 'Please provide the recipient address.'] },
            Phone: { type: String, required: [false, 'Please provide the recipient phone number.'] },
            Mobile: { type: String, required: [false, 'Please provide the recipient mobile number.'] },
            Fax: { type: String, required: [false, 'Please provide the recipient fax number.'] } // Specify the custom error message for required field
        },
        required: [true, 'Please provide the recipient information.'] // Specify the custom error message for required field
    },
    total: {
        type: {
            subTotal: { type: Number, required: [true, 'Please provide the subtotal.'] },
            tax: { type: Number, required: [true, 'Please provide the tax amount.'] },
            discount: { type: Number, required: [true, 'Please provide the discount amount.'] },
            total: { type: Number, required: [true, 'Please provide the total amount.'] },
            balance_due: { type: Number, required: [true, 'Please provide the balance due amount.'] } // Specify the custom error message for required field
        },
        required: [true, 'Please provide the total information.'] // Specify the custom error message for required field
    }
}, {
    timestamps: true
});
// Create the model for the masterInvoice
const MasterInvoice = mongoose.model('MasterInvoice', masterInvoiceSchema);
export default MasterInvoice;
//# sourceMappingURL=masterInvoice.model.js.map