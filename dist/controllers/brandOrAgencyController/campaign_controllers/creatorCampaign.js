import SingleCampaign from '../../../models/brandOrAgencyModels/campaign_model/singleCreatorCampaign.js';
import MultiCreatorCampaign from '../../../models/brandOrAgencyModels/campaign_model/multiCreatorCampaign.model.js';
class CreatorCampaignsController {
    async fetchPendingCampaigns(req, res, next) {
        try {
            const multiCreatorCampaign = await MultiCreatorCampaign.find({ status: 'pending' }, '_id budget campaign_name campaign_image start_date end_date');
            const singleCreatorCampaign = await SingleCampaign.find({ status: 'pending' }, '_id budget campaign_name campaign_image start_date');
            const combinedCampaigns = [...multiCreatorCampaign, ...singleCreatorCampaign];
            res.status(200).json({
                success: true,
                data: combinedCampaigns
            });
        }
        catch (error) {
            next(error);
        }
    }
}
export default new CreatorCampaignsController();
//# sourceMappingURL=creatorCampaign.js.map