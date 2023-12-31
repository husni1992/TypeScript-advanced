// This is only for the demonstration of TS feature, utility type "Record",
// there are areas of improvements to align with best practices, but not important in the context of this demo app.
// feature #5 Type aliases are custom type definitions to simplify complex type signatures
type FeatureDetails = {
  enabled: boolean;
  description: string;
};

// feature #12 Literal Types enable string values as valid return types.
type Feature = "ENABLE_RATE_LIMIT" | "ENABLE_MODIFYING_HOBBIES";

const featureFlags: Record<Feature, FeatureDetails> = {
  ENABLE_RATE_LIMIT: { enabled: true, description: "Rate limiting" },
  ENABLE_MODIFYING_HOBBIES: { enabled: true, description: "Hobbies endpoint" },
};

class FeatureFlags {
  private static instance: FeatureFlags;

  // feature #13 Utility Types "Record" constructs an object type whose property keys are Keys and whose property values are Type
  private flags: Record<Feature, FeatureDetails>;

  constructor(flags: Record<Feature, FeatureDetails> = featureFlags) {
    this.flags = flags;
  }

  getFlag(key: Feature): FeatureDetails {
    return this.flags[key];
  }

  updateFlag(key: Feature, enabled: boolean) {
    if (this.flags[key]) {
      this.flags[key] = { ...this.flags[key], enabled };
      return;
    }
  }

  public static getInstance(): FeatureFlags {
    if (!FeatureFlags.instance) {
      FeatureFlags.instance = new FeatureFlags();
    }

    return FeatureFlags.instance;
  }
}

export const featureFlagInstance = FeatureFlags.getInstance();
