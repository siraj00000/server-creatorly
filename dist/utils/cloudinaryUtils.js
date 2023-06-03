import cloudinary from 'cloudinary';
import Logging from '../library/Logging.mjs';
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadImageToCloudinary = async (file) => {
    try {
        const result = await cloudinary.v2.uploader.upload(file.path);
        return result.secure_url;
    }
    catch (error) {
        Logging.error(error);
        throw new Error('Failed to upload image to Cloudinary');
    }
};
export default uploadImageToCloudinary;
//# sourceMappingURL=cloudinaryUtils.js.map