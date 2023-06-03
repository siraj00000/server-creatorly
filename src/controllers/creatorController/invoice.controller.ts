import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../../utils/error_response.utils.js';
import { validateMimeType } from '../../utils/validate_mimetype.utils.js';
import cloudinary from 'cloudinary';
import DetailInvoice, { IDetailInvoice } from '../../models/creatorModels/invoiceModel/detailInvoice.model.js';
import MasterInvoice from '../../models/creatorModels/invoiceModel/masterInvoice.model.js';
import { removeTmp } from '../../utils/remove_folde.utils.js';

class InvoiceController {
    public async createInvoice(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Extract data from the request body
            const { invoice_name, invoice_number, date, due, note, signature } = req.body;
            let fromObject = JSON.parse(req.body.from);
            let toObject = JSON.parse(req.body.to);
            let total = JSON.parse(req.body.total);
            let detailInvoices = JSON.parse(req.body.detailInvoices);

            // Check if invoice_number already exists
            const existingInvoice = await MasterInvoice.findOne({ invoice_number });
            if (existingInvoice) {
                throw new ErrorResponse(400, 'Invoice number already exists');
            }

            let imageURL;
            if (req.file) {
                // Validate mimetype
                let isValidFile = validateMimeType(req.file.mimetype);
                if (!isValidFile) throw new ErrorResponse(400, 'Invalid image type');

                const result = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'invoice-images' });

                // Remove the temporary file
                removeTmp(req.file.path);

                imageURL = result.secure_url;
            }

            // Save the masterInvoice
            const masterInvoice = new MasterInvoice({
                user_id: req.user?.id,
                invoice_name,
                invoice_image: imageURL,
                invoice_number,
                date,
                due,
                note,
                signature,
                from: { ...fromObject },
                to: { ...toObject },
                total
            });

            await masterInvoice.save();

            // Save the detailInvoices with the masterInvoiceId
            const detailInvoicePromises = detailInvoices.map(async (detailInvoiceData: IDetailInvoice) => {
                const detailInvoice = new DetailInvoice({
                    ...detailInvoiceData,
                    masterInvoiceId: masterInvoice._id
                });
                await detailInvoice.save();
                return detailInvoice;
            });

            const detailInvoicesSaved = await Promise.all(detailInvoicePromises);

            res.status(201).json({
                success: true,
                message: 'Invoice created successfully',
                data: {
                    masterInvoice,
                    detailInvoices: detailInvoicesSaved
                }
            });
        } catch (error) {
            next(error);
        }
    }

    public async getSingleInvoice(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { masterInvoiceId } = req.params;

            // Fetch the master invoice
            const masterInvoice = await MasterInvoice.findOne({ _id: masterInvoiceId, user_id: req.user?.id });

            if (!masterInvoice) {
                throw new ErrorResponse(404, 'Master invoice not found');
            }

            // Fetch the detail invoices associated with the master invoice
            const detailInvoices = await DetailInvoice.find({ masterInvoiceId });

            res.status(200).json({
                success: true,
                data: {
                    masterInvoice,
                    detailInvoices
                }
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    public async getMasterInvoices(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Fetch the master invoice
            const masterInvoice = await MasterInvoice.find(
                { user_id: req.user?.id },
                { 'to.Name': 1, date: 1, due: 1, invoice_number: 1, 'total.balance_due': 1 }
            );

            // return (success, message, data) with 200 status
            res.status(200).json({
                success: true,
                message: 'Invoice fetched successfully',
                data: masterInvoice
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new InvoiceController();
