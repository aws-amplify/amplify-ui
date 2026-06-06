---
'@aws-amplify/ui-angular': patch
---

fix(ui-angular): render authenticator route changes on Angular v22+

The Authenticator is driven by an xstate machine, and the component previously
relied on zone.js to trigger change detection when the machine transitioned
between routes. That implicit behavior is no longer guaranteed on Angular v22+,
which left the Authenticator stuck on its initial route and rendered an empty
component. Change detection now runs on every machine transition so the rendered
route always reflects the current machine state.
