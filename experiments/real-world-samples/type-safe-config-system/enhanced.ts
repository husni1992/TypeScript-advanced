// Type definition for the configuration object
type Config = {
  v: number;
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
  };
  server: {
    port: number;
    startMessage: string;
    meta: {
      loc: Record<string, number>;
    };
  };
  featureFlags: {
    newFeature: boolean;
  };
};

export const config: Config = {
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

// Type for specifying the keys in the configuration object
// Supports nested keys up to two levels deep
type ConfigKey = keyof Config | `${keyof Config}.${string}` | `${keyof Config}.${string}.${string}`;

// Type for inferring the value type at a given key path in the configuration object
type ConfigValueType<K extends ConfigKey> = K extends `${infer T}.${infer U}` // T is 'database' . U is 'host'
  ? T extends keyof Config // if 'database' is a key of Config
    ? U extends keyof Config[T] // if 'host' is key of Config['database']
      ? Config[T][U]
      : K extends `${infer R}.${infer M}.${infer P}`
        ? R extends keyof Config
          ? M extends keyof Config[R]
            ? P extends keyof Config[R][M]
              ? Config[R][M][P]
              : "never3"
            : "never4"
          : "never5"
        : K extends keyof Config // if K is a key of Config at 1st level
          ? Config[K]
          : "never6"
    : "never7"
  : "never8";

export function getConfigValue<K extends ConfigKey>(key: K, _config: Config): ConfigValueType<K> {
  const parts = key.split(".");
  let result: any = _config;

  for (const part of parts) {
    result = result[part];
    if (result === undefined) {
      throw new Error(`Config key '${key}' not found.`);
    }
  }

  return result;
}

// Usage examples with inferred types
const dbHost = getConfigValue("database.host", config); // Correct, type string
const serverPort = getConfigValue("server.port", config); // Correct, type number
const newFeatureEnabled = getConfigValue("featureFlags.newFeature", config); // Correct, type boolean
const a = getConfigValue("v", config); // Correct, type boolean
const serverLoc = getConfigValue("server.meta.loc", config); // Correct, type boolean

// The following line should cause a TypeScript error:
// const unknownConfig = getConfigValue("unknown.property", config); // Should cause an error
