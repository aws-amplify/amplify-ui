---
"@aws-amplify/ui-react-core": patch
"@aws-amplify/ui-react": patch
"@aws-amplify/ui": patch
---

build: updates to support Node ESM

Confirmed that both #3155 and #3206 are fixed without having to apply any workaround

Also, test out the changes with the following frameworks/tools:

| Name  | Tested? | Notes | 
|---|---|---|
| Next.js@11, 12, 13  | ✅ |   |
| Gatsby | ✅ | Works with ESM. Not support loading CJS build |
| Remix | ✅ |  | 
| Astro | ✅ | Works with ESM. Not support loading CJS build | 
| webpack | ✅ |   |
| Vite | ✅ | Works with ESM. Not support loading CJS build | 
| Rollup | ✅ | Works with ESM. Not support loading CJS build | 
| esbuild | ✅ |   | 
| Parcel | ✅ |   | 
| Snowpack | ✅ | Need `--polyfill-node` to fix JS incompatibility in dev mode, but is a known [issue](https://github.com/FredKSchott/snowpack/discussions/718) | 
