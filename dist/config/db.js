import mongoose from "mongoose";
import { config } from "./config.js";
import Logging from "../library/Logging.mjs";
const connectMongoDB = async () => {
    try {
        mongoose.set({ strictQuery: false });
        await mongoose.connect(config.mongo.url, {
            retryWrites: true,
            w: "majority",
        });
        Logging.info("DB connected successfully");
    }
    catch (error) {
        Logging.error(error);
    }
};
export default connectMongoDB;
//# sourceMappingURL=db.js.map