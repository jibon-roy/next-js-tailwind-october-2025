const checkEnvVar = (varName: string): string => {
  const value = process.env[varName];
  if (!value) {
    throw new Error(`Missing environment variable: ${varName}`);
  }
  return value;
};

const isProduction =
  checkEnvVar("NEXT_PUBLIC_NODE_ENV") === "production" ? true : false;

const envConfig = {
  BASE_URL: isProduction
    ? checkEnvVar("NEXT_PUBLIC_BASE_URL")
    : checkEnvVar("NEXT_PUBLIC_DEVELOPMENT_BASE_URL"),
  API_URL: isProduction
    ? checkEnvVar("NEXT_PUBLIC_API_URL")
    : checkEnvVar("NEXT_PUBLIC_DEVELOPMENT_API_URL"),
};

export default envConfig;
