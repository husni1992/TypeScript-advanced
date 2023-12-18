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

// Usage examples: The variables' types are not inferred and default to 'any' in the IDE, as TypeScript
// does not infer types from the string path provided to the getConfigValue method.
// The challenge is to dynamically determine and enforce the correct type based on the configuration path string.
const dbHost = getConfigValue("database.host", config); // Correct, type string
const serverPort = getConfigValue("server.port", config); // Correct, type number
const newFeatureEnabled = getConfigValue("featureFlags.newFeature", config); // Correct, type boolean
const v = getConfigValue("v", config); // Correct, type boolean
const serverLoc = getConfigValue("server.meta.loc", config); // Correct, type boolean
