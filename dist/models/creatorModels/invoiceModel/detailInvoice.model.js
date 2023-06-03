import mongoose from 'mongoose';
// Create the schema for the detailInvoice
const detailInvoiceSchema = new mongoose.Schema({
    masterInvoiceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MasterInvoice',
        required: [true, 'Please provide the master invoice ID.'] // Specify the custom error message for required field
    },
    itemName: {
        type: String,
        required: [true, 'Please provide the item name.'] // Specify the custom error message for required field
    },
    rate: {
        type: Number,
        required: [true, 'Please provide the rate.'] // Specify the custom error message for required field
    },
    qty: {
        type: Number,
        required: [true, 'Please provide the quantity.'] // Specify the custom error message for required field
    },
    amount: {
        type: Number,
        required: [true, 'Please provide the amount.'] // Specify the custom error message for required field
    },
    additional_detail: {
        type: String
    }
});
// Create the model for the detailInvoice
const DetailInvoice = mongoose.model('DetailInvoice', detailInvoiceSchema);
export default DetailInvoice;
//# sourceMappingURL=detailInvoice.model.js.map