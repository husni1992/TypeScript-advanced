type PathUnion<T, Path extends string = ""> = {
  [Prop in keyof T]: T[Prop] extends object
    ? PathUnion<T[Prop], `${Path}${Path extends "" ? "" : "."}${Prop & string}`>
    : `${Path}${Path extends "" ? "" : "."}${Prop & string}`;
}[keyof T];

type PathType<T, Path extends string, CurrentPath extends string = ""> = Path extends CurrentPath
  ? T
  : T extends object
    ? {
        [K in keyof T]: PathType<
          T[K],
          Path,
          `${CurrentPath}${CurrentPath extends "" ? "" : "."}${K & string}`
        >;
      }[keyof T]
    : never;

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
      bar: {
        a: "FIREFOX" | "CHROME";
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
      loc: true,
      bar: {
        a: "FIREFOX",
      },
    },
  },
  featureFlags: {
    newFeature: true,
  },
};

let path: PathUnion<Config> = "server.meta.loc";
let type: PathType<Config, "server.meta.loc">; // boolean

function ConfigManager<C>() {
  return function getConfig<T extends PathUnion<C>>(path: T, config): PathType<C, T> {
    const parts = path.split(".");
    let result: any = config;

    for (const part of parts) {
      result = result[part];
      if (result === undefined) {
        throw new Error(`Config key '${path}' not found.`);
      }
    }

    return result;
  };
}

const r = ConfigManager<Config>()("server.meta.bar.a", config);

export {};
