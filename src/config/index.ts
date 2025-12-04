import dotenv from "dotenv";
dotenv.config();

const config = {
  postgres_url: process.env.POSTGRESS_URL,
};

export default config;
