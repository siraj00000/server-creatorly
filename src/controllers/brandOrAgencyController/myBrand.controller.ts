import { Request, Response, NextFunction } from 'express';
import cloudinary from 'cloudinary';
import { ObjectId } from 'mongodb';
import MyBrand from '../../models/brandOrAgencyModels/myBrands.model.js';
import { removeTmp } from '../../utils/remove_folde.utils.js';
import { validateMimeType } from '../../utils/validate_mimetype.utils.js';
import { ErrorResponse } from '../../utils/error_response.utils.js';

class MyBrandController {
    public async createMyBrand(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.file) {
                throw new ErrorResponse(400, 'Company logo is required');
            }

            let isValidFile = validateMimeType(req.file?.mimetype);
            if (!isValidFile) throw new ErrorResponse(400, 'Invalid image type');

            const result = await cloudinary.v2.uploader.upload(req.file?.path, { folder: 'my-brand' });

            // remove temp file
            removeTmp(req.file.path);

            const myBrand = await MyBrand.create({
                company_name: req.body.company_name,
                country: req.body.country,
                company_logo: result.secure_url,
                about_brand: req.body.about_brand,
                parent_brand_id: req.user?._id
            });

            res.status(201).json({
                success: true,
                message: 'Brand created successfully.',
                data: myBrand
            });
        } catch (error) {
            next(error);
        }
    }

    public async fetchMyBrands(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const myBrands = await MyBrand.where({ parent_brand_id: req.user?.id }).find();

            res.status(200).json({
                success: true,
                message: 'brands fetched',
                data: myBrands
            });
        } catch (error) {
            next(error);
        }
    }

    public async fetchSpecificMyBrand(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            let singleMyBrand;
            let allMyBrands;
            if (id && ObjectId.isValid(id)) {
                singleMyBrand = await MyBrand.findOne({ _id: id });
                const query = { _id: { $ne: new ObjectId(id) } };
                allMyBrands = await MyBrand.find(query).limit(3).sort({ _id: -1 });
            } else {
                allMyBrands = await MyBrand.find().limit(3).sort({ _id: -1 });
            }

            res.status(200).json({
                success: true,
                data: {
                    singleMyBrand: singleMyBrand || allMyBrands[0],
                    myBrands: allMyBrands
                }
            });
        } catch (error) {
            next(error);
        }
    }

    public async updateMyBrand(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const updatedBrand = await MyBrand.findByIdAndUpdate(id, req.body, { new: true });

            if (!updatedBrand) {
                throw new ErrorResponse(404, 'Brand not found');
            }

            res.status(200).json({
                success: true,
                message: 'Brand updated successfully',
                data: updatedBrand
            });
        } catch (error) {
            next(error);
        }
    }

    public async deleteMyBrand(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            if (!ObjectId.isValid(id)) {
                throw new ErrorResponse(400, 'Invalid brand ID');
            }

            const myBrand = await MyBrand.findOne({ _id: id });

            if (!myBrand) {
                throw new ErrorResponse(404, 'Brand not found');
            }

            // Delete brand logo from cloudinary
            const publicId = myBrand.company_logo.split('/').pop()?.split('.')[0];
            await cloudinary.v2.uploader.destroy(`my-brand/${publicId}`);

            await MyBrand.deleteOne({ _id: id });

            res.status(200).json({
                success: true,
                message: 'Brand deleted successfully.',
                data: {}
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new MyBrandController();
