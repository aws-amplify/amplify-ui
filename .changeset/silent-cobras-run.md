---
"@aws-amplify/ui-react-liveness": patch
---

feat(liveness): expose systemClockOffset to override rekognition client config.

If there is a clock skew greater than five minutes, you can optionally pass `systemClockOffset` to the `FaceLivenessDetectorCore` config, which will be applied as an offset to signing times. 
```
<FaceLivenessDetectorCore
  ...
  config={{
    systemClockOffset:
      createLivenessSessionApiData['systemClockOffset'],
  }}
/>
```
