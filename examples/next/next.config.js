/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /**
   * Setting trailingSlash to true to resolve known bug with federated sign in redirect + next.js
   * https://github.com/aws-amplify/amplify-cli/issues/7359#issuecomment-812821315
   */
  trailingSlash: true,
  transpilePackages: [
    "@mediapipe/face_detection",
    "@tensorflow-models/face-detection",
    "@aws-amplify/ui-react-liveness",
    "maplibre-gl"
  ],
  pageExtensions: ["page.tsx"]
};

module.exports = nextConfig;
