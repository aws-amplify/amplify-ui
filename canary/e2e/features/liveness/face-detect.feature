Feature: Liveness Start Screen

  Test Liveness CDN

  Background:
    Given I'm running the example "/"
  
  @react
  Scenario: Blazeface CDN is up
    Then I request "https://cdn.liveness.rekognition.amazonaws.com/face-detection/tensorflow/tfjs-backend-wasm/4.11.0/tfjs-backend-wasm-simd.wasm" and get "200"
    Then I request "https://cdn.liveness.rekognition.amazonaws.com/face-detection/tensorflow-models/blazeface/1.0.2/model/model.json" and get "200"
