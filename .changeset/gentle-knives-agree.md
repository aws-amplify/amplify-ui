---
'@aws-amplify/ui-angular': patch
'@aws-amplify/ui-react': patch
'@aws-amplify/ui-vue': patch
---

Re-export `translations` from ui-[framework] packages. This lets you use `translations` directly:

```diff
- import { translations } from '@aws-amplify/ui';
+ import { translations } from '@aws-amplify/ui-[framework]';
```
