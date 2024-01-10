import { ConfigStore } from "./ConfigStore";

type Foo = {
  air: {
    foo: Record<string, any>;
    x: "FOO" | "BAR";
  };
};

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
      bar: {
        a: "FIREFOX" | "CHROME" | "SAFARI";
      };
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
      bar: {
        a: "FIREFOX",
      },
    },
  },
  featureFlags: {
    newFeature: true,
  },
};

const configStore = new ConfigStore<Config>(config);
const browser = configStore.getConfig("featureFlags.newFeature");

export {};
