import { config, getConfigValue } from "./config-tool.after";

describe("Get config value", () => {
  it("should return database.host", () => {
    const res = getConfigValue("database.host", config);
    expect(res).toStrictEqual(config.database.host);
  });

  it("should return config under 3 levels -> server.meta.loc", () => {
    const res = getConfigValue("server.meta.loc", config);
    expect(res).toStrictEqual(config.server.meta.loc);
  });

  it("should fail to access non-existing config database.unknown", () => {
    expect(() => getConfigValue("database.unknown", config)).toThrow(
      "Config key 'database.unknown' not found.",
    );
  });
});
