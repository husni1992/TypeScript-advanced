import { getConfig } from "./v4-fixed";

// Example Usage
type Config = {
  v: number;
  foo: string;
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
      loc: boolean;
    };
  };
  featureFlags: {
    newFeature: boolean;
  };
};

export const config: Config = {
  v: 0,
  foo: "sasa",
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
      loc: true,
    },
  },
  featureFlags: {
    newFeature: true,
  },
};

const host = getConfig("v", config);
