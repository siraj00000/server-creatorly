import CreatorCustomLink from '../../models/creatorModels/creatorCustomLink.model.js';
import { ErrorResponse } from '../../utils/error_response.utils.js';
class CreatorCustomLinkController {
    async createCustomLink(req, res, next) {
        try {
            const { customLink } = req.body;
            const newCustomLink = new CreatorCustomLink({ user_id: req.user?._id, customLink });
            await newCustomLink.save();
            res.status(201).json({
                success: true,
                message: 'Creator link created',
                data: newCustomLink
            });
        }
        catch (error) {
            next(error);
        }
    }
    async fetchCustomLinks(req, res, next) {
        try {
            const customLinks = await CreatorCustomLink.find();
            res.status(200).json({
                success: true,
                data: customLinks
            });
        }
        catch (error) {
            next(error);
        }
    }
    async fetchCustomLinkById(req, res, next) {
        try {
            const customLink = await CreatorCustomLink.findById(req.params.id);
            if (!customLink) {
                throw new ErrorResponse(404, 'Custom link not found');
            }
            res.status(200).json({
                success: true,
                message: 'Creator link updated',
                data: customLink
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateCustomLinkById(req, res, next) {
        try {
            const { user_id, customLink } = req.body;
            const updatedCustomLink = await CreatorCustomLink.findByIdAndUpdate(req.params.id, { user_id, customLink }, { new: true });
            if (!updatedCustomLink) {
                throw new ErrorResponse(404, 'Custom link not found');
            }
            res.status(200).json({
                success: true,
                message: 'Creator link updated',
                data: updatedCustomLink
            });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteCustomLinkById(req, res, next) {
        try {
            const deletedCustomLink = await CreatorCustomLink.findByIdAndDelete(req.params.id);
            if (!deletedCustomLink) {
                throw new ErrorResponse(404, 'Custom link not found');
            }
            res.status(200).json({
                success: true,
                message: 'Creator link deleted',
                data: deletedCustomLink
            });
        }
        catch (error) {
            next(error);
        }
    }
}
export default new CreatorCustomLinkController();
//# sourceMappingURL=creatorCustomLink.controller.js.map