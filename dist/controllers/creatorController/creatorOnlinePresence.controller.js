import CreatorOnlinePresence from '../../models/creatorModels/creatorOnlinePresence.model.js';
import { ErrorResponse } from '../../utils/error_response.utils.js';
import CreatorCustomLink from '../../models/creatorModels/creatorCustomLink.model.js';
import UserProfile from '../../models/user/userProfile.model.js';
class CreatorOnlinePresenceController {
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
            const creatorOnlinePresence = new CreatorOnlinePresence({
                category,
                links,
                user: req.user?._id,
                ...(instagramUsername && { instagramUserName: instagramUsername })
            });
            await creatorOnlinePresence.save();
            res.status(201).json({
                success: true,
                message: 'Social link for creator created successfully!'
            });
        }
        catch (error) {
            next(error);
        }
    }
    async fetchCreatorOnlinePresences(req, res, next) {
        try {
            const creatorOnlinePresence = await CreatorOnlinePresence.find();
            res.status(200).json({ success: true, data: creatorOnlinePresence });
        }
        catch (error) {
            next(error);
        }
    }
    async fetchLinkTree(req, res, next) {
        try {
            const { username } = req.params;
            if (!username) {
                throw new ErrorResponse(400, 'Not found!');
            }
            const creatorOnlinePresence = await CreatorOnlinePresence.findOne({ instagramUserName: username }, 'user instagramUserName');
            // Will get the link of the relevent user
            const creatorLinkTree = await CreatorCustomLink.findOne({ user_id: creatorOnlinePresence?.user }, 'customLink');
            const userProfile = await UserProfile.findOne({ user_id: creatorOnlinePresence?.user }, '_id profile_image_url');
            if (!creatorLinkTree) {
                throw new ErrorResponse(400, 'No links found!, please check username');
            }
            res.status(200).json({ success: true, data: { creatorLinkTree, userProfile, creatorOnlinePresence } });
        }
        catch (error) {
            next(error);
        }
    }
    async updateSocialLink(req, res, next) {
        try {
            const creatorOnlinePresenceId = req.params.id;
            const updatedSocialLinkInfo = req.body;
            await CreatorOnlinePresence.findByIdAndUpdate(creatorOnlinePresenceId, updatedSocialLinkInfo);
            res.status(200).json({
                success: true,
                msg: 'Social link for creator updated successfully!'
            });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteSocialLink(req, res, next) {
        try {
            const creatorOnlinePresenceId = req.params.id;
            await CreatorOnlinePresence.findByIdAndDelete(creatorOnlinePresenceId);
            res.status(200).json({
                success: true,
                msg: 'Social link for creator deleted successfully!'
            });
        }
        catch (error) {
            next(error);
        }
    }
}
export default new CreatorOnlinePresenceController();
//# sourceMappingURL=creatorOnlinePresence.controller.js.map