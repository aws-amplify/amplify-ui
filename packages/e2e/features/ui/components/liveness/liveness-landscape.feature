Feature: Liveness Detector in landscape

  Mobile landscape used to be blocked before the check started. These scenarios
  cover the orientations and viewports that block reached.

  Note: `cy.viewport` cannot reproduce a real device's orientation-settle
  timing or physical rendering, so these scenarios do not replace the manual
  device validation.

  @react
  Scenario Outline: Start the check in landscape
    Given I'm running the example "ui/components/liveness" on a mobile device in "landscape"
    Given I set the viewport to <width> by <height>
    Then I do not see "Landscape orientation not supported"
    Then I do not see "Rotate your device to portrait (vertical) orientation."
    Then I see the "Start video check" button
    Then I click the "Start video check" button
    Then I see "liveness-detector" element

    Examples:
      | width | height |
      | 800   | 360    |
      | 915   | 412    |
      | 740   | 360    |

  @react
  Scenario: Rotating mid-check prompts instead of failing
    Given I'm running the example "ui/components/liveness" on a mobile device in "portrait"
    Given I set the viewport to 412 by 915
    Then I click the "Start video check" button
    Then I see "liveness-detector" element
    # the camera module renders before recording starts, and the prompt only
    # exists during recording; this hint is the first recording-only text
    Then I see "Move closer"
    When I rotate the device to "landscape"
    Given I set the viewport to 915 by 412
    Then I see "Hold your device still and keep it in the same orientation."
    Then I do not see "Landscape orientation not supported"
    Then I see "liveness-detector" element

  @react
  Scenario: Returning to the original orientation clears the prompt
    Given I'm running the example "ui/components/liveness" on a mobile device in "portrait"
    Given I set the viewport to 412 by 915
    Then I click the "Start video check" button
    Then I see "liveness-detector" element
    Then I see "Move closer"
    When I rotate the device to "landscape"
    Then I see "Hold your device still and keep it in the same orientation."
    When I rotate the device to "portrait"
    Then I do not see "Hold your device still and keep it in the same orientation."
    # still recording, so the prompt cleared rather than the check ending
    Then I see "Move closer"
