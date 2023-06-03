import MultiCreatorCampaign from '../../models/brandOrAgencyModels/campaign_model/multiCreatorCampaign.model.js';
import SingleCampaign from '../../models/brandOrAgencyModels/campaign_model/singleCreatorCampaign.js';
import User from '../../models/user.model.js';
import moment from 'moment';
function splitRevenueDataByDays(data, startDate, endDate, numberOfDays) {
    const newData = [];
    const days = Math.ceil(moment(endDate).diff(startDate, 'days', true));
    const interval = Math.ceil(days / numberOfDays);
    for (let i = 0; i < numberOfDays; i++) {
        const start = moment(startDate).add(i * interval, 'days');
        const end = moment(startDate).add((i + 1) * interval, 'days');
        const filteredData = data.filter((d) => moment(d.createdAt).isBetween(start, end));
        const totalBudget = filteredData.reduce((acc, d) => acc + Number(d.budget), 0);
        const count = filteredData.length;
        newData.push({
            startDate: start,
            endDate: end,
            totalBudget: totalBudget,
            count: count
        });
    }
    return newData;
}
class SiteStatisticsController {
    async analytics(req, res, next) {
        try {
            const month = req.params.month; // Assuming month is in the format 'MM'
            const year = new Date().getFullYear(); // Get the current year
            const startDate = moment(`${month}-${year}`, 'MM-YYYY').startOf('month').toDate(); // Get the start date of the month
            const endDate = moment(`${month}-${year}`, 'MM-YYYY').add(1, 'month').startOf('month').toDate(); // Get the end date of the month
            // Count users created in the month based on their userType
            const [creatorUsersCount, brandAgencyUsersCount] = await Promise.all([
                User.aggregate([{ $match: { userType: 'creator', createdAt: { $gte: startDate, $lt: endDate } } }, { $count: 'creatorUsersCount' }]),
                User.aggregate([{ $match: { userType: 'brand/agency', createdAt: { $gte: startDate, $lt: endDate } } }, { $count: 'brandAgencyUsersCount' }])
            ]);
            // Count completed single/multi-creator campaigns in the month
            const [singleCreatorCampaignData, multiCreatorCampaignData] = await Promise.all([
                SingleCampaign.aggregate([{ $match: { status: 'completed', createdAt: { $gte: startDate, $lt: endDate } } }, { $project: { budget: { $toDouble: '$budget' }, createdAt: 1 } }]),
                MultiCreatorCampaign.aggregate([{ $match: { status: 'completed', createdAt: { $gte: startDate, $lt: endDate } } }, { $project: { budget: { $toDouble: '$budget' }, createdAt: 1 } }])
            ]);
            const totalCompletedCampaignData = [...singleCreatorCampaignData, ...multiCreatorCampaignData];
            const totalBudget = totalCompletedCampaignData.reduce((acc, d) => acc + Number(d.budget), 0);
            const totalCompletedCampaignCount = totalCompletedCampaignData.length;
            const singleCreatorCampaignCount = splitRevenueDataByDays(singleCreatorCampaignData, startDate, endDate, 5);
            const multiCreatorCampaignCount = splitRevenueDataByDays(multiCreatorCampaignData, startDate, endDate, 5);
            const totalBudgetByInterval = splitRevenueDataByDays(totalCompletedCampaignData, startDate, endDate, 5);
            const data = {
                creatorUsersCount: creatorUsersCount[0] ? creatorUsersCount[0].creatorUsersCount : 0,
                brandAgencyUsersCount: brandAgencyUsersCount[0] ? brandAgencyUsersCount[0].brandAgencyUsersCount : 0,
                singleCreatorCampaignCount,
                multiCreatorCampaignCount,
                totalCompletedCampaignCount,
                totalBudget,
                totalBudgetByInterval
            };
            res.status(200).json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    }
    //
    async siteAnalytics(req, res, next) {
        try {
            const month = req.params.month; // Assuming month is in the format 'MM'
            const year = new Date().getFullYear(); // Get the current year
            const startDate = moment(`${month}-${year}`, 'MM-YYYY').startOf('month').toDate(); // Get the start date of the month
            const endDate = moment(`${month}-${year}`, 'MM-YYYY').add(1, 'month').startOf('month').toDate(); // Get the end date of the month
            // Count users created in the month based on their userType
            const [creatorUsersCount, brandAgencyUsersCount] = await Promise.all([
                User.aggregate([{ $match: { userType: 'creator', createdAt: { $gte: startDate, $lt: endDate } } }, { $count: 'creatorUsersCount' }]),
                User.aggregate([{ $match: { userType: 'brand/agency', createdAt: { $gte: startDate, $lt: endDate } } }, { $count: 'brandAgencyUsersCount' }])
            ]);
            // Count completed single/multi-creator campaigns in the month
            const [singleCreatorCampaignCount, multiCreatorCampaignCount] = await Promise.all([
                SingleCampaign.aggregate([
                    { $match: { status: 'completed', createdAt: { $gte: startDate, $lt: endDate } } },
                    { $group: { _id: null, count: { $sum: 1 }, budget: { $sum: { $toDouble: '$budget' } } } }
                ]),
                MultiCreatorCampaign.aggregate([
                    { $match: { status: 'completed', createdAt: { $gte: startDate, $lt: endDate } } },
                    { $group: { _id: null, count: { $sum: 1 }, budget: { $sum: { $toDouble: '$budget' } } } }
                ])
            ]);
            const data = {
                creatorUsersCount: creatorUsersCount[0] ? creatorUsersCount[0].creatorUsersCount : 0,
                brandAgencyUsersCount: brandAgencyUsersCount[0] ? brandAgencyUsersCount[0].brandAgencyUsersCount : 0,
                singleCreatorCampaignCount,
                multiCreatorCampaignCount,
                totalCompletedCampaignCount: (singleCreatorCampaignCount && singleCreatorCampaignCount[0] ? singleCreatorCampaignCount[0].count : 0) +
                    (multiCreatorCampaignCount && multiCreatorCampaignCount[0] ? multiCreatorCampaignCount[0].count : 0),
                totalBudget: (singleCreatorCampaignCount && singleCreatorCampaignCount[0] ? singleCreatorCampaignCount[0].budget : 0) +
                    (multiCreatorCampaignCount && multiCreatorCampaignCount[0] ? multiCreatorCampaignCount[0].budget : 0)
            };
            res.status(200).json({
                success: true,
                data
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    /**
     * async getSiteStats
     */
    async getStats(req, res, next) {
        try {
            // Count campaigns created in the month
            const [creatorUsersCount, brandAgencyUsersCount, singleCreatorCampaignCount, multiCreatorCampaignCount] = await Promise.all([
                User.aggregate([{ $match: { userType: 'creator' } }, { $count: 'creatorUsersCount' }]),
                User.aggregate([{ $match: { userType: 'brand/agency' } }, { $count: 'brandAgencyUsersCount' }]),
                SingleCampaign.aggregate([{ $match: { status: 'completed' } }, { $group: { _id: null, count: { $sum: 1 }, budget: { $sum: { $toDouble: '$budget' } } } }]),
                MultiCreatorCampaign.aggregate([{ $match: { status: 'completed' } }, { $group: { _id: null, count: { $sum: 1 }, budget: { $sum: { $toDouble: '$budget' } } } }])
            ]);
            const data = {
                creatorUsersCount: creatorUsersCount[0] ? creatorUsersCount[0] : null,
                brandAgencyUsersCount: brandAgencyUsersCount[0] ? brandAgencyUsersCount[0] : null,
                singleCreatorCampaignCount,
                multiCreatorCampaignCount,
                totalCompletedCampaignCount: (singleCreatorCampaignCount && singleCreatorCampaignCount[0] ? singleCreatorCampaignCount[0].count : 0) +
                    (multiCreatorCampaignCount && multiCreatorCampaignCount[0] ? multiCreatorCampaignCount[0].count : 0),
                totalBudget: (singleCreatorCampaignCount && singleCreatorCampaignCount[0] ? singleCreatorCampaignCount[0].budget : 0) +
                    (multiCreatorCampaignCount && multiCreatorCampaignCount[0] ? multiCreatorCampaignCount[0].budget : 0)
            };
            res.status(200).json({
                success: true,
                data
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
}
export default new SiteStatisticsController();
//# sourceMappingURL=siteStatistics.controller.js.map