---
"@aws-amplify/ui-react-liveness": patch
---

chore(liveness): pass in new challenge to createStreamingRequest and store in context. 
- Update context to extend to multiple types
- Export challenge type and supported challenges for consumption in the `ui-react-liveness` package

```
export const FACE_MOVEMENT_AND_LIGHT_CHALLENGE: ChallengeType = {
  type: 'FaceMovementAndLightChallenge',
  version: '1.0.0',
};
```
