Feature: Native Map Method

  Using the native maplibre-gl methods.

  @react
  Scenario Outline: Native "flyTo" method should change map viewport
    Given I'm running the example "ui/components/geo/<example>"
    And the map is loaded
    When I see the map load
    Then I click the button to transition the map
    Then I see the map viewport transition

    Examples:
    |              example |
    | map-with-forward-ref |
    |         use-map-hook |
