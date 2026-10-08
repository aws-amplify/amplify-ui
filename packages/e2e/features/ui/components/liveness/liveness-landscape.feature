Feature: Liveness Detector in landscape

  Mobile landscape used to be blocked before the check started. These
  scenarios cover the orientations and viewports that block reached, plus what
  a rotation does once recording is under way.

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
  Scenario: Rotating mid-check fails with a rotation error, not a face fit timeout
    Given I'm running the example "ui/components/liveness" on a mobile device in "portrait"
    Given I set the viewport to 412 by 915
    Then I click the "Start video check" button
    Then I see "liveness-detector" element
    # the camera module renders before recording starts, and a rotation only
    # ends the attempt during recording; this hint is the first
    # recording-only text
    Then I see "Move closer"
    When I rotate the device to "landscape"
    Given I set the viewport to 915 by 412
    Then I see "Device rotation detected"
    Then I see the "Try again" button
    # the attempt used to be decided by the 7s oval fit timeout, so the user
    # was told their face did not fit
    Then I do not see "Face didn't fit inside oval in time limit. Try again and completely fill the oval with face in it."
    Then I do not see "Landscape orientation not supported"

  @react
  Scenario: Rotating before the check starts does not fail it
    Given I'm running the example "ui/components/liveness" on a mobile device in "portrait"
    Given I set the viewport to 412 by 915
    Then I see the "Start video check" button
    When I rotate the device to "landscape"
    Given I set the viewport to 915 by 412
    Then I do not see "Device rotation detected"
    Then I do not see "Landscape orientation not supported"
    Then I click the "Start video check" button
    Then I see "liveness-detector" element
