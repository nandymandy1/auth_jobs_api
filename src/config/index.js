import dotenv from "dotenv";
const { parsed } = dotenv.config();
export const { APP_DB, PORT, APP_SECRET, REFRESH_TOKEN } = parsed;
