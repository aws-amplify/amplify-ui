---
'@aws-amplify/ui': patch
---

This patch ensures refresh tokens are handled properly after expiration. 

Refresh tokens are used to refresh your idToken and accessToken. While it's uncommon for refresh tokens to expire in app due to their longevity (default 30 days), this would cause an early `tokenRefresh_failure` event on refresh which previously confused the authenticator. This is now handled properly from the Authenticator.
