export const config = {
  v: 0,
  database: {
    host: "localhost",
    port: 5432,
    username: "user",
    password: "pass",
  },
  server: {
    port: 3000,
    startMessage: "Server is running...",
    meta: {
      loc: { Amsterdam: 1 },
    },
  },
  featureFlags: {
    newFeature: true,
  },
};

// Function to get a configuration value
export function getConfigValue(key, _config): any {
  return key.split(".").reduce((o: any, i: any) => {
    const value = o[i];
    if (!value) {
      throw new Error("Config not found!");
    }

    return o[i];
  }, _config);
}

const dbHost = getConfigValue("database.host", config); // Correct, type string
const serverPort = getConfigValue("server.port", config); // Correct, type number
const newFeatureEnabled = getConfigValue("featureFlags.newFeature", config); // Correct, type boolean
const v = getConfigValue("v", config); // Correct, type boolean
const serverLoc = getConfigValue("server.meta.loc", config); // Correct, type boolean
