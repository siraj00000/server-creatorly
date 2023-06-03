import mongoose from 'mongoose';
const campaignAssignmentSchema = new mongoose.Schema({
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
}, { timestamps: true });
const CampaignAssignment = mongoose.model('CampaignAssignment', campaignAssignmentSchema);
export default CampaignAssignment;
//# sourceMappingURL=campaignAssignment.model.js.map