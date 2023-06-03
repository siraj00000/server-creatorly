import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICampaignAssignment extends Document {
    campaign_id: mongoose.Types.ObjectId;
    sub_brand_id: mongoose.Types.ObjectId;
    status: 'ongoing' | 'pending' | 'completed';
}

const campaignAssignmentSchema: Schema<ICampaignAssignment> = new mongoose.Schema(
    {
        campaign_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'campaigns',
            required: [true, 'Campaign ID is required']
        },
        sub_brand_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'mybrands',
            required: [true, 'brand ID is required']
        },
        status: {
            type: String,
            enum: ['ongoing', 'pending', 'completed'],
            default: 'pending',
            required: [true, 'Campaign status is required']
        }
    },
    { timestamps: true }
);

const CampaignAssignment: Model<ICampaignAssignment> = mongoose.model<ICampaignAssignment>('CampaignAssignment', campaignAssignmentSchema);

export default CampaignAssignment;