---
'@aws-amplify/ui': patch
---

Fixed bug that displayed "usernamed undefined" when using a lambda that autoconfirms the user during sign up. The sign up would fail and redirect the user to sign in with the "username undefined" error. The user then would have to sign in again. This patch will now assign the correct credentials during sign up for users that are auto confirmed. 
