import { Request, Response, NextFunction } from 'express';
import SingleCampaign from '../../../models/brandOrAgencyModels/campaign_model/singleCreatorCampaign.js';
import MultiCreatorCampaign from '../../../models/brandOrAgencyModels/campaign_model/multiCreatorCampaign.model.js';
import { ErrorResponse } from '../../../utils/error_response.utils.js';

class CreatorCampaignsController {
    public async fetchPendingCampaigns(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const pipeline = [
                {
                    $match: {
                        status: 'pending'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        budget: 1,
                        campaign_name: 1,
                        campaign_image: 1,
                        start_date: 1,
                        end_date: { $ifNull: ['$end_date', null] } // adds 'null' value for missing end_date field
                    }
                },
                {
                    $unionWith: {
                        coll: 'single-creator-campaigns',
                        pipeline: [
                            {
                                $match: {
                                    status: 'pending'
                                }
                            },
                            {
                                $project: {
                                    _id: 1,
                                    budget: 1,
                                    campaign_name: 1,
                                    campaign_image: 1,
                                    start_date: 1,
                                    end_date: { $literal: null } // adds 'null' value for missing end_date field
                                }
                            }
                        ]
                    }
                }
            ];

            const combinedCampaigns = await MultiCreatorCampaign.aggregate(pipeline);

            res.status(200).json({
                success: true,
                data: combinedCampaigns
            });
        } catch (error) {
            next(error);
        }
    }

    public async fetchApprovedCampaigns(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const pipeline = [
                {
                    $match: {
                        status: 'approved'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        budget: 1,
                        campaign_name: 1,
                        campaign_image: 1,
                        start_date: 1,
                        end_date: { $ifNull: ['$end_date', null] } // adds 'null' value for missing end_date field
                    }
                },
                {
                    $unionWith: {
                        coll: 'single-creator-campaigns',
                        pipeline: [
                            {
                                $match: {
                                    status: 'approved'
                                }
                            },
                            {
                                $project: {
                                    _id: 1,
                                    budget: 1,
                                    campaign_name: 1,
                                    campaign_image: 1,
                                    start_date: 1,
                                    end_date: { $literal: null } // adds 'null' value for missing end_date field
                                }
                            }
                        ]
                    }
                }
            ];

            const combinedCampaigns = await MultiCreatorCampaign.aggregate(pipeline);

            res.status(200).json({
                success: true,
                data: combinedCampaigns
            });
        } catch (error) {
            next(error);
        }
    }

    public async fetchDeniedCampaigns(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const pipeline = [
                {
                    $match: {
                        status: 'denied'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        budget: 1,
                        campaign_name: 1,
                        campaign_image: 1,
                        start_date: 1,
                        end_date: { $ifNull: ['$end_date', null] } // adds 'null' value for missing end_date field
                    }
                },
                {
                    $unionWith: {
                        coll: 'single-creator-campaigns',
                        pipeline: [
                            {
                                $match: {
                                    status: 'denied'
                                }
                            },
                            {
                                $project: {
                                    _id: 1,
                                    budget: 1,
                                    campaign_name: 1,
                                    campaign_image: 1,
                                    start_date: 1,
                                    end_date: { $literal: null } // adds 'null' value for missing end_date field
                                }
                            }
                        ]
                    }
                }
            ];

            const combinedCampaigns = await MultiCreatorCampaign.aggregate(pipeline);

            res.status(200).json({
                success: true,
                data: combinedCampaigns
            });
        } catch (error) {
            next(error);
        }
    }

    public async updateCampaignbyId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { body } = req;

            const [singleCampaign, multiCampaign] = await Promise.all([
                SingleCampaign.findOneAndUpdate({ _id: id }, body, { new: true }),
                MultiCreatorCampaign.findOneAndUpdate({ _id: id }, body, { new: true })
            ]);

            if (!singleCampaign && !multiCampaign) {
                throw new ErrorResponse(404, 'Campaign1 not found');
            }

            res.status(200).json({
                success: true,
                message: 'Campaign updated successfully'
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new CreatorCampaignsController();
