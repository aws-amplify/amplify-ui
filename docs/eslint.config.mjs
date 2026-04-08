import { defineConfig } from "eslint/config";
import nextConfig from "eslint-config-next";

export default defineConfig([
  {
    extends: [nextConfig],
    rules: {
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/refs": 'off',
      "react-hooks/immutability": 'off',
      'react-hooks/static-components': 'off'
    }
  },
]);
