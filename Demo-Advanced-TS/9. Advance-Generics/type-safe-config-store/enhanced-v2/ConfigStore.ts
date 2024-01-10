/**
 * Generates a union of string literal types representing the paths to each property in object T.
 * It recursively traverses the properties of T to construct the paths.
 *
 * @typeparam T - The type of the object to generate paths from.
 * @typeparam Path - A string literal accumulating the current path. Defaults to an empty string.
 */
// @ts-ignore
type PathUnion<T, Path extends string = ""> = {
  [Prop in keyof T]: T[Prop] extends object
    ? PathUnion<T[Prop], `${Path}${Path extends "" ? "" : "."}${Prop & string}`>
    : `${Path}${Path extends "" ? "" : "."}${Prop & string}`;
}[keyof T];

/**
 * Resolves to the type at a given path within object T. The path is specified as a string literal.
 * It recursively traverses the object T to resolve the type at the specified path.
 *
 * @typeparam T - The type of the object to resolve the path type from.
 * @typeparam Path - The string literal representing the path whose type is to be resolved.
 * @typeparam CurrentPath - Internal use for accumulating the path during recursion. Defaults to an empty string.
 *
 * @note This type uses deep type recursion and has a `@ts-ignore` to suppress TypeScript's depth limit error.
 */
// @ts-ignore
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

/**
 * A configuration store class that allows type-safe access to configuration properties.
 *
 * @typeparam C - The type of the configuration object.
 */
export class ConfigStore<C> {
  private config: C;

  /**
   * Creates an instance of the configuration store with the provided configuration object.
   *
   * @param config - The configuration object of type C.
   */
  constructor(config: C) {
    this.config = config;
  }

  /**
   * Retrieves a configuration value for a given path. The path is type-safe and must
   * correspond to a valid path within the configuration object. The method returns
   * the type corresponding to the path.
   *
   * @typeparam T - The type inferred from the path, representing the type of the configuration value.
   * @param path - The path to the configuration value.
   * @returns The configuration value at the specified path.
   * @throws Will throw an error if the configuration key specified by the path is not found.
   *
   * @note This method uses a `@ts-ignore` to suppress TypeScript's depth limit error in `PathType`.
   */
  // @ts-ignore
  getConfig<T extends PathUnion<C>>(path: T): PathType<C, T> {
    const parts = path.split(".");
    let result: any = this.config;

    for (const part of parts) {
      result = result[part];
      if (result === undefined) {
        throw new Error(`Config key '${path}' not found.`);
      }
    }

    return result;
  }
}
