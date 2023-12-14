// Configuration object with poor type definitions
type DeepKeySplit<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ""
  ? []
  : S extends `${infer T}${D}${infer U}`
  ? [T, ...DeepKeySplit<U, D>]
  : [S];

type DeepAccess<Type, Keys extends string[]> = {
  0: Type;
  1: Keys[0] extends keyof Type ? Type[Keys[0]] : never;
  2: Keys[0] extends keyof Type
    ? Keys[1] extends keyof Type[Keys[0]]
      ? Type[Keys[0]][Keys[1]]
      : never;
  3: Keys[0] extends keyof Type
    ? Keys[1] extends keyof Type[Keys[0]]
      ? Keys[2] extends keyof Type[Keys[0]][Keys[1]]
        ? Type[Keys[0]][Keys[1]][Keys[2]]
        : never
      : never
    : never;
  // You can continue to add more levels as needed
}[Keys['length']];

export type GenericPartialType<Type, KeyToAccess = string> = 
  KeyToAccess extends string
    ? DeepAccess<Type, DeepKeySplit<KeyToAccess, ".">>
    : never;


type Configuration = {
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
      server: string;
    };
  };
  featureFlags: {
    newFeature: boolean;
  };
};


export const config: Configuration = {
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
      server: "linux",
    },
  },
  featureFlags: {
    newFeature: true,
  },
};

// Function to get a configuration value
export function getConfigValue(key: string, _config: Configuration): any {
  return key.split(".").reduce((o: any, i: any) => {
    const value = o[i];
    if (!value) {
      throw new Error("Config not found!");
    }

    return o[i];
  }, _config);
}

// Examples of using the configuration
const dbHost = getConfigValue("database.host", config); // Should be a string
// const serverPort = getConfigValue("server.port", config); // Should be a number
// const unknownConfig = getConfigValue("unknown.property", config); // Should ideally cause a compile-time error
