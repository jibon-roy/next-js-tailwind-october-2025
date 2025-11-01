const isProduction =
  process.env.NEXT_PUBLIC_NODE_ENV === "production" ? true : false;

const envConfig = {
  BASE_URL: isProduction
    ? process.env.NEXT_PUBLIC_BASE_URL
    : process.env.NEXT_PUBLIC_DEVELOPMENT_BASE_URL,
  API_URL: isProduction
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL,
};

export default envConfig;
