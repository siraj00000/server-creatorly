import SocialLink from '../models/userSocialLinks.modal.js';
import { ErrorResponse } from '../utils/error_response.utils.js';
class SocialLinkController {
    async createSocialLink(req, res, next) {
        try {
            const { category, links } = req.body;
            const instagramLink = links.instagram;
            let instagramUsername;
            if (instagramLink) {
                const regex = /^https?:\/\/(?:www\.)?instagram\.com\/([a-zA-Z0-9._]+)/;
                const match = instagramLink.match(regex);
                if (match) {
                    instagramUsername = match[1];
                }
                else {
                    throw new ErrorResponse(400, 'Invalid Instagram link format');
                }
            }
            const socialLink = new SocialLink({
                category,
                links,
                user: req.user?._id,
                ...(instagramUsername && { instagramUserName: instagramUsername })
            });
            await socialLink.save();
            res.status(201).json({
                success: true,
                message: 'Social link created successfully!'
            });
        }
        catch (error) {
            next(error);
        }
    }
    async fetchSocialLinks(req, res, next) {
        try {
            const socialLinks = await SocialLink.find();
            res.status(200).json({ success: true, data: socialLinks });
        }
        catch (error) {
            next(error);
        }
    }
    async updateSocialLink(req, res, next) {
        try {
            const socialLinkId = req.params.id;
            const updatedSocialLinkInfo = req.body;
            await SocialLink.findByIdAndUpdate(socialLinkId, updatedSocialLinkInfo);
            res.status(200).json({
                success: true,
                msg: 'Social link updated successfully!'
            });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteSocialLink(req, res, next) {
        try {
            const socialLinkId = req.params.id;
            await SocialLink.findByIdAndDelete(socialLinkId);
            res.status(200).json({
                success: true,
                msg: 'Social link deleted successfully!'
            });
        }
        catch (error) {
            next(error);
        }
    }
}
export default new SocialLinkController();
//# sourceMappingURL=socialLinks.controller.js.map