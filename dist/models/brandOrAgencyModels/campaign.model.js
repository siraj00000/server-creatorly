import mongoose from 'mongoose';
const campaignSchema = new mongoose.Schema({
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
    gender_of_audience: {
        type: [String],
        required: [true, 'Gender of audience is required']
    },
    location: {
        type: [String],
        required: [true, 'Location is required']
    },
    age_of_audience: {
        type: {
            min: {
                type: Number,
                required: [true, 'Minimum age of audience is required'],
                min: [13, 'Age of audience should be at least 13 years'],
                max: [80, 'Age of audience should not exceed 80 years']
            },
            max: {
                type: Number,
                required: [true, 'Maximum age of audience is required'],
                min: [13, 'Age of audience should be at least 13 years'],
                max: [80, 'Age of audience should not exceed 80 years']
            }
        }
    },
    hashtags: {
        type: String,
        required: [true, 'Hashtags are required']
    },
    start_date: {
        type: Date,
        required: [true, 'Start date is required']
    },
    end_date: {
        type: Date,
        required: [true, 'End date is required']
    },
    type_of_influencers: {
        type: [String],
        required: [true, 'Type of influencers is required']
    },
    social_media_platform: {
        type: [String],
        required: [true, 'Social media platform is required']
    },
    creator_category: {
        type: [String],
        required: [true, 'Creator category is required']
    },
    budget: {
        type: String,
        required: [true, 'Budget is required']
    },
    product_link: {
        type: String,
        required: [true, 'Product link is required'],
        validate: {
            validator: function (v) {
                return /https?:\/\/\S+/.test(v);
            },
            message: (props) => `${props.value} is not a valid link format!`
        }
    },
    about_product: {
        type: String
    },
    creators_id: {
        type: [String],
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
        enum: ['ongoing', 'pending', 'completed', 'denied'],
        default: 'pending',
        required: [true, 'Campaign status is required']
    }
}, { timestamps: true });
const Campaign = mongoose.model('Campaign', campaignSchema);
export default Campaign;
//# sourceMappingURL=campaign.model.js.map