export const FeatureFlagSection = ({ children, featureFlag }) => {
  if (!featureFlag) return null;
  return children;
};
