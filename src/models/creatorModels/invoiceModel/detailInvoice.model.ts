import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the interface for the detailInvoice document
export interface IDetailInvoice extends Document {
    masterInvoiceId: mongoose.Types.ObjectId;
    itemName: string;
    rate: number;
    qty: number;
    amount: number;
    additional_detail: string;
}

// Create the schema for the detailInvoice
const detailInvoiceSchema: Schema<IDetailInvoice> = new mongoose.Schema(
    {
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
    }
);


// Create the model for the detailInvoice
const DetailInvoice: Model<IDetailInvoice> = mongoose.model<IDetailInvoice>('DetailInvoice', detailInvoiceSchema);

export default DetailInvoice;