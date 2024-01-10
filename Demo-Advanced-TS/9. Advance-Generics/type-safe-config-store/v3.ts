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

type Deep<T, Path extends string = never> = {
  [Prop in keyof T]: T[Prop] extends object
    ? Deep<T[Prop], Prop & string>
    : [Path] extends [never]
      ? Prop
      : `${Path}.${Prop & string}`;
}[keyof T];

let Good: Deep<Config> = "database.host";
let r2: Deep<Config> = "meta.loc";

export {};
