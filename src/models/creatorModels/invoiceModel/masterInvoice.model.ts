import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the interface for the masterInvoice document
export interface IMasterInvoice extends Document {
    user_id: mongoose.Types.ObjectId;
    invoice_name: string;
    invoice_image: string;
    invoice_number: string;
    date: Date;
    due: Date;
    note: string;
    signature: string;
    from: {
        Name: string;
        Email: string;
        Address: string;
        Phone: string;
        BusinessNumber: string;
    };
    to: {
        balance_due: number;
        total: number;
        Name: string;
        Email: string;
        Address: string;
        Phone: string;
        Mobile: string;
        Fax: string;
    };
    total: {
        subTotal: number;
        tax: number;
        discount: number;
        total: number;
        balance_due: number;
    };
}

// Create the schema for the masterInvoice
const masterInvoiceSchema: Schema<IMasterInvoice> = new mongoose.Schema(
    {
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
                Name: { type: String, required: [true, 'Please provide the sender name.'] }, // Specify the custom error message for required field
                Email: { type: String, required: [true, 'Please provide the sender email.'] }, // Specify the custom error message for required field
                Address: { type: String, required: [false, 'Please provide the sender address.'] }, // Specify the custom error message for required field
                Phone: { type: String, required: [false, 'Please provide the sender phone number.'] }, // Specify the custom error message for required field
                BusinessNumber: { type: String, required: [false, 'Please provide the sender business number.'] } // Specify the custom error message for required field
            },
            required: [true, 'Please provide the sender information.'] // Specify the custom error message for required field
        },
        to: {
            type: {
                Name: { type: String, required: [true, 'Please provide the recipient name.'] }, // Specify the custom error message for required field
                Email: { type: String, required: [true, 'Please provide the recipient email.'] }, // Specify the custom error message for required field
                Address: { type: String, required: [true, 'Please provide the recipient address.'] }, // Specify the custom error message for required field
                Phone: { type: String, required: [false, 'Please provide the recipient phone number.'] }, // Specify the custom error message for required field
                Mobile: { type: String, required: [false, 'Please provide the recipient mobile number.'] }, // Specify the custom error message for required field
                Fax: { type: String, required: [false, 'Please provide the recipient fax number.'] } // Specify the custom error message for required field
            },
            required: [true, 'Please provide the recipient information.'] // Specify the custom error message for required field
        },
        total: {
            type: {
                subTotal: { type: Number, required: [true, 'Please provide the subtotal.'] }, // Specify the custom error message for required field
                tax: { type: Number, required: [true, 'Please provide the tax amount.'] }, // Specify the custom error message for required field
                discount: { type: Number, required: [true, 'Please provide the discount amount.'] }, // Specify the custom error message for required field
                total: { type: Number, required: [true, 'Please provide the total amount.'] }, // Specify the custom error message for required field
                balance_due: { type: Number, required: [true, 'Please provide the balance due amount.'] } // Specify the custom error message for required field
            },
            required: [true, 'Please provide the total information.'] // Specify the custom error message for required field
        }
    },
    {
        timestamps: true
    }
);

// Create the model for the masterInvoice
const MasterInvoice: Model<IMasterInvoice> = mongoose.model<IMasterInvoice>('MasterInvoice', masterInvoiceSchema);

export default MasterInvoice;
