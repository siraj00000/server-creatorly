import dotenv from 'dotenv';
dotenv.config();

const MONGO_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGODB_PASSWORD}@cluster0.cp5kzsu.mongodb.net/Creatorly`;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

const JWT_SECRET = process.env.JWT_SECRET || "";

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    },
    jwt: {
        JWT_SECRET
    }
};
