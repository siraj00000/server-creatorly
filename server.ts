import express from 'express';
import http from 'http';
import Logging from './library/Logging.mjs';
import mongoose from 'mongoose';
import cloudinary from 'cloudinary';
import { config } from './src/config/config.js';
import { errorHandler } from './src/middleware/error_handler.middleware.js';

// Routes
import userRouter from './src/routers/user.router.js';
import creatorOnlinePresenceRouter from './src/routers/creatorRoutes/creatorOnlinePresence.router.js';
import brandOrAgencyOnlinePresenceRouter from './src/routers/brandOrAgencyRoutes/brandOrAgencyOnlinePresence.router.js';
import campaignRouter from './src/routers/brandOrAgencyRoutes/campaign.router.js';
import creatorCustomLinkRouter from './src/routers/creatorRoutes/creatorCustomLink.router.js';
import myBrandRouter from './src/routers/brandOrAgencyRoutes/myBrand.router.js';
import profileRouter from './src/routers/userRouters/profile.router.js';
import discoverCreatorRouter from './src/routers/brandOrAgencyRoutes/discoverCreators.router.js';
import singleCreatorCampaignRouter from './src/routers/brandOrAgencyRoutes/campaign_routers/singleCreatorCampaign.router.js';
import multiCreatorCampaignRouter from './src/routers/brandOrAgencyRoutes/campaign_routers/mulitCreatorCampaign.router.js';
import combinedCampaignRouter from './src/routers/brandOrAgencyRoutes/campaign_routers/combinedCampaign.router.js';
import statsRouter from './src/routers/statisticsRoutes/adminStatistics.router.js';
import invoiceRouter from './src/routers/creatorRoutes/invoice.router.js';
import visitorRouter from './src/routers/creatorRoutes/visitor.router.js';
import creatorStatsRouter from './src/routers/statisticsRoutes/creatorStatistics.router.js';
import brandStatsRouter from './src/routers/statisticsRoutes/brandStatistics.router.js';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const router = express();

/* connecting to database (MongoDB) */
mongoose
    .set({ strictQuery: false })
    .connect(config.mongo.url)
    .then(() => {
        Logging.info('MongoDB Connected');
        startServer();
    })
    .catch((error) => {
        Logging.error(error);
    });

/* Only start the server if Mongo connects  */
const startServer = () => {
    router.use((req, res, next) => {
        /* Log the Request */
        Logging.info(`Incomming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /* Log the Response */
            Logging.info(`Incomming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /* Routes */
    router.use('/api', userRouter);
    // brand
    router.use('/api', brandOrAgencyOnlinePresenceRouter);
    router.use('/api', myBrandRouter);
    router.use('/api', campaignRouter);
    router.use('/api', combinedCampaignRouter);
    router.use('/api', singleCreatorCampaignRouter);
    router.use('/api', multiCreatorCampaignRouter);
    router.use('/api', discoverCreatorRouter);
    // creator
    router.use('/api', creatorOnlinePresenceRouter);
    router.use('/api', creatorCustomLinkRouter);
    router.use('/api', invoiceRouter);
    router.use('/api', visitorRouter);
    // profile
    router.use('/api', profileRouter);
    // statistics
    router.use('/api', statsRouter);
    router.use('/api', creatorStatsRouter);
    router.use('/api', brandStatsRouter);

    /* Health Check */
    router.get('/ping', (req, res) => res.status(200).json({ message: 'pong' }));

    /* Error handling */
    router.use(errorHandler);

    const server = http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));

    process.on('unhandledRejection', (err, promise) => {
        console.log(`Logged Error ${err}`);
        server.close(() => process.exit(1));
    });
};
