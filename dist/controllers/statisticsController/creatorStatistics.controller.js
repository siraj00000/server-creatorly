import moment from 'moment';
import MasterInvoice from '../../models/creatorModels/invoiceModel/masterInvoice.model.js';
import SingleCreatorCampaign from '../../models/brandOrAgencyModels/campaign_model/singleCreatorCampaign.js';
import MultiCreatorCampaign from '../../models/brandOrAgencyModels/campaign_model/multiCreatorCampaign.model.js';
class CreatorAnalyticsController {
    async analytics(req, res, next) {
        try {
            const month = parseInt(req.params.month); // Assuming month is provided as a number
            const year = new Date().getFullYear(); // Get the current year
            const startDate = moment(`${year}-${month}`, 'YYYY-MM').startOf('month').toDate(); // Get the start date of the month
            const endDate = moment(`${year}-${month}`, 'YYYY-MM').endOf('month').toDate(); // Get the end date of the month
            // Total Revenue Earned
            const totalRevenueData = await MasterInvoice.aggregate([
                {
                    $match: {
                        'total.total': { $gt: 0 },
                        date: { $gte: startDate, $lte: endDate },
                        user_id: req.user?._id
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$total.total' }
                    }
                }
            ]);
            const totalRevenueEarned = totalRevenueData.length > 0 ? totalRevenueData[0].total : 0;
            // Total No. of Campaigns (completed)
            const singleCreatorCampaignCount = await SingleCreatorCampaign.countDocuments({ status: 'completed' });
            const multiCreatorCampaignCount = await MultiCreatorCampaign.countDocuments({ status: 'completed' });
            const totalCampaigns = singleCreatorCampaignCount + multiCreatorCampaignCount;
            // Pending Payment
            const pendingPaymentData = await MasterInvoice.aggregate([
                {
                    $match: {
                        'total.balance_due': { $gt: 0 },
                        user_id: req.user?._id
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$total.balance_due' }
                    }
                }
            ]);
            const pendingPayments = pendingPaymentData.length > 0 ? pendingPaymentData[0].total : 0;
            const data = {
                revenueEarned: totalRevenueEarned,
                totalCampaigns,
                pendingPayments
            };
            res.status(200).json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    }
}
export default new CreatorAnalyticsController();
//# sourceMappingURL=creatorStatistics.controller.js.map