---
'@aws-amplify/ui-react': patch
'@aws-amplify/ui': patch
---

This change removes an inconsistency in the heights of ratings between 0-1 (non-inclusive). This change was made per customer request via a raised issue. A customer would only need to update their code if they display ratings between 0-1 (non-inclusive).
