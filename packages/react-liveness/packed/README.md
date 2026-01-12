### Packed Dependencies

Usually this is avoided as much as possible, but various environment support
requires us to sometimes provide dependencies prepacked.

### List of packed Dependencies

| name                                       | dependency                                                                                                                                      | reason                                                         |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| tensorflow-models-face-detection-1.0.3.tgz | [@tensorflow-models/face-detection@1.0.3](https://www.npmjs.com/package/@tensorflow-models/face-detection/v/1.0.3) needed for ui-react-liveness | Turbopack compatibility breaks due to typescript configuration |
