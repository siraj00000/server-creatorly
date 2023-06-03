import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ISingleCampaign extends Document {
    brand_id: mongoose.Types.ObjectId;
    // campaign detail
    sub_brand_ids: string[];
    campaign_name: string;
    campaign_image: {
        url: string;
    };
    campaign_brief: string;
    campaign_objective: string;
    start_date: Date;
    // product detail
    budget: string;
    product_link: string;
    about_product: string;
    // choose creator
    creators_id: string;
    // campaign status
    status: 'pending' | 'approved' | 'denied' | 'ongoing' | 'completed';
}

const campaignSchema: Schema<ISingleCampaign> = new mongoose.Schema(
    {
        campaign_name: {
            type: String,
            required: [true, 'Campaign name is required'],
            trim: true,
            maxlength: [50, 'Name can not be more than 50 characters']
        },
        campaign_image: {
            url: {
                type: String,
                required: false
            }
        },
        campaign_brief: {
            type: String,
            required: [true, 'Campaign brief is required']
        },
        campaign_objective: {
            type: String,
            required: [true, 'Campaign objective is required']
        },
        start_date: {
            type: Date,
            required: [true, 'Start date is required']
        },
        budget: {
            type: String,
            required: [true, 'Budget is required']
        },
        product_link: {
            type: String,
            required: [true, 'Product link is required'],
            validate: {
                validator: function (v: string) {
                    return /https?:\/\/\S+/.test(v);
                },
                message: (props) => `${props.value} is not a valid link format!`
            }
        },
        about_product: {
            type: String
        },
        creators_id: {
            type: String,
            required: true
        },
        brand_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        sub_brand_ids: {
            type: [String],
            required: true
        },
        status: {
            type: String,
            enum: ['ongoing', 'approved', 'pending', 'completed', 'denied'],
            default: 'pending',
            required: [true, 'Campaign status is required']
        }
    },
    { timestamps: true }
);

const SingleCampaign: Model<ISingleCampaign> = mongoose.model<ISingleCampaign>('Single-Creator-Campaign', campaignSchema);

export default SingleCampaign;
