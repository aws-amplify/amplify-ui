Feature: Liveness Start Screen

  Test Liveness CDN

  Background:
    Given I'm running the example "/"
  
  @react
  Scenario: Blazeface CDN is up
    Then I request "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm" and get "200"
    And I request "https://tfhub.dev/tensorflow/tfjs-model/blazeface/1/default/1/model.json?tfjs-format=file" and get "200"
