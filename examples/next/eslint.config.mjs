import { defineConfig } from "eslint/config";
import nextConfig from "eslint-config-next";

export default defineConfig([
  {
    extends: [nextConfig],
    rules: {
      'react-hooks/static-components': 'off'
    }
  },
]);
