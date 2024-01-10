type Deep<T, Path extends string = ""> = T extends object
  ? {
      [Prop in keyof T]: Prop extends string
        ? Deep<T[Prop], `${Path}${Path extends "" ? "" : "."}${Prop & string}`>
        : never;
    }[keyof T]
  : { path: Path; type: T };

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

type AllPaths = Deep<Config>;

// Extract the type of a specific path
type TypeOfPath<T, Path extends string> = T extends { path: Path; type: infer TP } ? TP : never;

type ServerMetaLocType = TypeOfPath<AllPaths, "server.meta.loc">; // should be boolean
