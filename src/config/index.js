import dotenv from "dotenv";
const { parsed } = dotenv.config();

export const PORT = process.env.PORT || parsed.PORT;
export const { APP_DB, APP_SECRET, REFRESH_TOKEN } = parsed;
