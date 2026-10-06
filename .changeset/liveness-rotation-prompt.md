---
'@aws-amplify/ui-react-liveness': patch
---

feat(liveness): prompt instead of failing when the device is rotated mid-check

Rotating the device during a check no longer needs to end it. The camera frame
is fixed for the session's lifetime, so only the rendered box changes, and the
stream keeps recording either way. The component now shows a non-fatal prompt
asking the user to hold the device still, announced through an `aria-live`
region, and clears it as soon as the original orientation is restored.

The prompt is deliberately not open-ended. A liveness session expires three
minutes after it is created and a session id cannot be reused, so a user who
obeys slowly would otherwise wait out the session and see an opaque failure
rather than something they can act on. If the prompt stands for 15 seconds the
check times out with the usual retryable message.

Adds `hintHoldDeviceStillText` to the hint display text.

Also fixes the orientation listener's cleanup, which passed a new function to
`removeEventListener` and so never removed the listener it added.
