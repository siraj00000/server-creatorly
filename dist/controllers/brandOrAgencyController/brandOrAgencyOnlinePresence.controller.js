import BrandOrAgencyOnlinePresence from '../../models/brandOrAgencyModels/brandOrAgencyOnlinePresence.model.js';
class BrandOrAgencyOnlinePresenceController {
    async createBrandOrAgencyOnlinePresence(req, res, next) {
        try {
            const { category, websiteLink } = req.body;
            const brandOrAgencyOnlinePresence = new BrandOrAgencyOnlinePresence({
                category,
                websiteLink,
                user: req.user?._id
            });
            await brandOrAgencyOnlinePresence.save();
            res.status(201).json({
                success: true,
                message: 'Social link for brand/agency created successfully!'
            });
        }
        catch (error) {
            next(error);
        }
    }
    async fetchBrandOrAgencyOnlinePresence(req, res, next) {
        try {
            const brandOrAgencyOnlinePresence = await BrandOrAgencyOnlinePresence.find();
            res.status(200).json({ success: true, data: brandOrAgencyOnlinePresence });
        }
        catch (error) {
            next(error);
        }
    }
    async updateBrandOrAgencyOnlinePresence(req, res, next) {
        try {
            const socialLinkId = req.params.id;
            const updatedOnlinePresenceInfo = req.body;
            await BrandOrAgencyOnlinePresence.findByIdAndUpdate(socialLinkId, updatedOnlinePresenceInfo);
            res.status(200).json({
                success: true,
                msg: 'Social link for brand/agency updated successfully!'
            });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteBrandOrAgencyOnlinePresence(req, res, next) {
        try {
            const socialLinkId = req.params.id;
            await BrandOrAgencyOnlinePresence.findByIdAndDelete(socialLinkId);
            res.status(200).json({
                success: true,
                msg: 'Social link for brand/agency deleted successfully!'
            });
        }
        catch (error) {
            next(error);
        }
    }
}
export default new BrandOrAgencyOnlinePresenceController();
//# sourceMappingURL=brandOrAgencyOnlinePresence.controller.js.map