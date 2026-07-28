---
'@aws-amplify/ui-react-liveness': patch
---

Widen `@aws-sdk/client-rekognitionstreaming` to `^3.974.0` and `@aws-sdk/util-format-url` to `^3.972.37`. The previous exact pin on `3.967.0` transitively pinned `@aws-sdk/core@3.967.0` -> `@aws-sdk/xml-builder@3.965.0` -> `fast-xml-parser@5.2.5`, which consumers could not override without a forced resolution and which triggers scanner findings for CVE-2026-26278 and CVE-2026-25896. From `3.974.0` onward the SDK ranges its own `@aws-sdk/core` dependency, which resolves to a `@aws-sdk/xml-builder` that no longer depends on `fast-xml-parser` at all, and future SDK patches now flow through without another pin bump.
