// Defining features of the application
interface FeatureList {
  darkMode: boolean;
  newDashboard: boolean;
  betaTesting: boolean;
}

// Using the mapped type to declare the state of each feature
const features: FeatureList = {
  darkMode: true,
  newDashboard: false,
  betaTesting: true,
};

// Function to check the status of a feature
function checkFeatureStatus(feature: string): boolean {
  return features[feature];
}

const isBetaTestingEnabled = checkFeatureStatus("betaTesting");
const isDarkModeEnabled = checkFeatureStatus("darkMode");

// goal is to convert keys to this
/*
  isBetaTestingEnabled: true,
  isDarkModeEnabled: false,
  isNewDashboardEnabled: true,
*/

export {};
