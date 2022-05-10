---
'@aws-amplify/ui': patch
---

This patch ensures refresh tokens are handled properly after expiration. 

Refresh tokens are used to refresh your idToken and accessToken. While it's uncommon for refresh tokens to expire in app due to their longevity (default 30 days), this would cause an early `tokenRefresh_failure` event on refresh which previously confused the authenticator. This is now handled properly from the Authenticator.

See https://github.com/aws-amplify/amplify-ui/pull/1863 for technical details. Note that token refresh is attempted when (1) on refresh, and (2) an Amplify API call is attempted but it gets back a token expiration exception.
