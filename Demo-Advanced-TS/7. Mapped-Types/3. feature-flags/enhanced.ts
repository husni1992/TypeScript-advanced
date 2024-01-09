// Defining features of the application
interface FeatureList {
  darkMode: boolean;
  newDashboard: boolean;
  betaTesting: boolean;
}

// Mapped type to represent the feature flags
type FeatureStatus = {
  [Feature in keyof FeatureList as `is${Capitalize<Feature>}Enabled`]: boolean;
};

// Using the mapped type to declare the state of each feature
const featureStatus: FeatureStatus = {
  isBetaTestingEnabled: true,
  isDarkModeEnabled: false,
  isNewDashboardEnabled: true,
};

// Function to check the status of a feature
function checkFeatureStatus(feature: keyof FeatureStatus): boolean {
  return featureStatus[feature];
}

const isDarkModeEnabled = checkFeatureStatus("isDarkModeEnabled");

export {};
