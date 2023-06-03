import SingleCreatorCampaign from '../../models/brandOrAgencyModels/campaign_model/singleCreatorCampaign.js';
import MultiCreatorCampaign from '../../models/brandOrAgencyModels/campaign_model/multiCreatorCampaign.model.js';
class BrandAnalyticsController {
    async brandAnalytics(req, res, next) {
        try {
            // Total Campaigns Executed
            const executedCampaigns = await Promise.all([SingleCreatorCampaign.countDocuments({ status: 'completed' }), MultiCreatorCampaign.countDocuments({ status: 'completed' })]);
            const totalCampaignsExecuted = executedCampaigns.reduce((total, count) => total + count, 0);
            // Proposals
            const approvedProposals = await Promise.all([SingleCreatorCampaign.countDocuments({ status: 'approved' }), MultiCreatorCampaign.countDocuments({ status: 'approved' })]);
            const totalProposals = approvedProposals.reduce((total, count) => total + count, 0);
            // Total Campaigns Pending
            const pendingCampaigns = await Promise.all([SingleCreatorCampaign.countDocuments({ status: 'pending' }), MultiCreatorCampaign.countDocuments({ status: 'pending' })]);
            const totalCampaignsPending = pendingCampaigns.reduce((total, count) => total + count, 0);
            const data = {
                totalCampaignsExecuted,
                totalProposals,
                totalCampaignsPending
            };
            res.status(200).json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    }
}
export default new BrandAnalyticsController();
//# sourceMappingURL=brandStatistics.controller.js.map