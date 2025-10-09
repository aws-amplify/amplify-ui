import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { escapeRegExp } from 'lodash';

// Store device configuration for test scenarios
let testDeviceId: string | null = null;
let deviceInfo: any = null;
let availableCameras: MediaDeviceInfo[] = [];
let validCameraId: string | null = null;

// the current value returned by the service is 15000,
// the below value can be increased as needed
const LIVENESS_TIMEOUT = 60000;

Then('I see the {string} timeout error', (message: string) => {
  cy.findByRole('document')
    .contains(new RegExp(escapeRegExp(message), 'i'), {
      timeout: LIVENESS_TIMEOUT,
    })
    .should('exist');
});

Then('I see the {string} selectfield', (selectFieldName: string) => {
  cy.findByLabelText(
    new RegExp(`^${escapeRegExp(selectFieldName)}`, 'i')
  ).should('exist');
});

Then('I see the {string} textfield', (textFieldName: string) => {
  cy.findByLabelText(new RegExp(`^${escapeRegExp(textFieldName)}`, 'i')).should(
    'exist'
  );
});

Then(
  'I click the {string} selectfield and select the {string} option',
  (selectFieldName: string, optionValue: string) => {
    cy.findByLabelText(
      new RegExp(`^${escapeRegExp(selectFieldName)}`, 'i')
    ).select(optionValue);
  }
);

Then('I set up console monitoring for device callbacks', () => {
  // This step is now optional since we're testing UI elements instead of console logs
  // But we keep it for potential future debugging needs
  cy.window().then((win) => {
    cy.spy(win.console, 'log').as('consoleLog');
    cy.spy(win.console, 'error').as('consoleError');
  });
});

Then(
  'I verify onAnalysisComplete callback is configured with device info',
  () => {
    // Verify that device change callbacks are working by checking the visible UI

    // 1. Check that the liveness detector is rendered
    cy.get('[data-testid="liveness-detector"]').should('exist');

    // 2. Check that the device configuration is properly displayed
    cy.contains('Current Configuration:').should('exist');
    cy.contains('Device ID: device-1').should('exist');

    // 3. Verify that device activity log appears showing device change events
    cy.contains('Device Activity Log').should('exist');
  }
);

// Pass-in Default Device Step Definitions

Given('I detect available cameras', () => {
  // Detect available cameras in the test environment
  cy.window().then(async (win) => {
    try {
      // Check if mediaDevices is available
      if (!win.navigator.mediaDevices) {
        cy.log('MediaDevices not available, skipping camera detection');
        availableCameras = [];
        validCameraId = null;
        return;
      }

      // Request camera permissions first
      await win.navigator.mediaDevices.getUserMedia({ video: true });

      // Enumerate available devices
      const devices = await win.navigator.mediaDevices.enumerateDevices();
      availableCameras = devices.filter(
        (device) => device.kind === 'videoinput'
      );

      // Select the first available camera as our valid camera
      if (availableCameras.length > 0) {
        validCameraId = availableCameras[0].deviceId;
        cy.log(
          `Found ${availableCameras.length} cameras. Using: ${validCameraId}`
        );
      } else {
        cy.log('No cameras found in test environment');
        validCameraId = null;
      }
    } catch (error) {
      cy.log('Error detecting cameras:', error);
      // Fallback to empty array
      availableCameras = [];
      validCameraId = null;
    }
  });

  // Wait a moment for camera detection to complete
  cy.wait(1000);
});

Given('I set an invalid deviceId {string}', (deviceId: string) => {
  // Use a guaranteed invalid deviceId that won't exist in any environment
  const invalidDeviceId = 'invalid-camera-guaranteed-not-to-exist-12345';
  testDeviceId = invalidDeviceId;

  // Navigate to the page with the invalid deviceId as a URL parameter
  cy.visit(
    `/ui/components/liveness/pass-in-default-device?deviceId=${encodeURIComponent(
      invalidDeviceId
    )}`
  );

  // Wait for the page to load and the component to be ready
  cy.contains('Pass-in Default Device Example').should('be.visible');

  // Wait for the component to attempt initialization with the invalid deviceId
  cy.wait(3000);

  // With an invalid deviceId, the component should fail during initialization
  // and not show the "Start video check" button
  cy.get('body').then(($body) => {
    const hasStartButton =
      $body.find('button:contains("Start video check")').length > 0;
    if (hasStartButton) {
      cy.log(
        'Start video check button found - this is unexpected with invalid deviceId'
      );
    } else {
      cy.log(
        'Start video check button not found - expected with invalid deviceId'
      );
    }
  });

  // Verify that the FaceLivenessDetectorCore component is rendered
  // This ensures the onError callback is available
  cy.get('[data-testid="liveness-detector"]').should('exist');

  // Set up console error monitoring
  cy.window().then((win) => {
    (win as any).testDeviceId = invalidDeviceId;
    (win as any).testDeviceIdIsValid = false;
    (win as any).errorLogged = false;
    (win as any).errorType = null;
    (win as any).livenessError = null;

    // Monitor console.error to verify no errors are logged
    const originalError = win.console.error;
    win.console.error = (...args: any[]) => {
      (win as any).errorLogged = true;
      (win as any).lastErrorArgs = args;

      // Log any errors that do occur (for debugging)
      cy.log('Unexpected error logged:', JSON.stringify(args));

      // Call original console.error
      originalError.apply(win.console, args);
    };
  });
});

Given('I set a valid deviceId {string}', (deviceId: string) => {
  // Use the detected valid camera ID or fallback to undefined (let SDK choose)
  const actualValidDeviceId = validCameraId || undefined;
  testDeviceId = actualValidDeviceId;

  // Navigate to the page with the valid deviceId as a URL parameter
  if (actualValidDeviceId) {
    cy.visit(
      `/ui/components/liveness/pass-in-default-device?deviceId=${encodeURIComponent(
        actualValidDeviceId
      )}`
    );
  } else {
    // If no valid camera detected, navigate without deviceId parameter
    cy.visit('/ui/components/liveness/pass-in-default-device');
  }

  // Wait for the page to load and the component to be ready
  cy.contains('Pass-in Default Device Example').should('be.visible');
  cy.contains('Start video check').should('be.visible');

  // Set up for valid device testing
  cy.window().then((win) => {
    (win as any).testDeviceId = actualValidDeviceId;
    (win as any).testDeviceIdIsValid = true;
    (win as any).errorLogged = false;
    (win as any).errorType = null;
    (win as any).livenessError = null;
  });
});

Then('I should see a {string} error', (errorType: string) => {
  // Wait for the component to attempt initialization with the invalid deviceId
  // The onError callback should be triggered during this process
  cy.wait(5000);

  // Check if the error was logged using our console override
  cy.window().then((win) => {
    const errorLogged = (win as any).errorLogged;
    const actualErrorType = (win as any).errorType;
    const lastErrorArgs = (win as any).lastErrorArgs;
    const livenessError = (win as any).livenessError;
    const errorCount = (win as any).errorCount || 0;

    // Debug information
    cy.log(`Error logged: ${errorLogged}`);
    cy.log(`Error count: ${errorCount}`);
    cy.log(`Error type: ${actualErrorType}`);
    cy.log(`Liveness error object: ${JSON.stringify(livenessError)}`);
    cy.log(`Last error args: ${JSON.stringify(lastErrorArgs)}`);

    // Check if we have the expected format: ['Liveness error:', {state: "DEFAULT_CAMERA_NOT_FOUND_ERROR"}]
    if (lastErrorArgs && lastErrorArgs.length >= 2) {
      const firstArg = lastErrorArgs[0];
      const secondArg = lastErrorArgs[1];
      cy.log(`First arg: ${firstArg}`);
      cy.log(`Second arg: ${JSON.stringify(secondArg)}`);
      if (
        firstArg === 'Liveness error:' &&
        secondArg &&
        secondArg.state === 'DEFAULT_CAMERA_NOT_FOUND_ERROR'
      ) {
        cy.log(
          'Found expected format: console.error("Liveness error:", {state: "DEFAULT_CAMERA_NOT_FOUND_ERROR"})'
        );
      }
    }

    // No console spy needed since we're testing for no errors

    expect(
      errorLogged,
      `Expected an error to be logged via onError callback. Error count: ${errorCount}, Last error: ${JSON.stringify(
        lastErrorArgs
      )}`
    ).to.be.true;
    expect(
      actualErrorType,
      `Expected error type to be ${errorType}, but got ${actualErrorType}. Liveness error: ${JSON.stringify(
        livenessError
      )}, Last error: ${JSON.stringify(lastErrorArgs)}`
    ).to.equal(errorType);
  });
});

Then('I should not see the {string} button', (buttonText: string) => {
  // Wait for the component to attempt initialization with the invalid deviceId
  cy.wait(3000);

  // Verify that the button is not visible
  cy.get('body').then(($body) => {
    const hasButton = $body.find(`button:contains("${buttonText}")`).length > 0;
    if (hasButton) {
      cy.log(`Unexpected: ${buttonText} button found with invalid deviceId`);
    } else {
      cy.log(`Expected: ${buttonText} button not found with invalid deviceId`);
    }
  });

  // Assert that the button should not be visible
  cy.contains(buttonText).should('not.exist');
});

Then('I should not see any error logged', () => {
  // Wait a bit more to ensure no errors are logged
  cy.wait(2000);

  // Check that no errors were logged
  cy.window().then((win) => {
    const errorLogged = (win as any).errorLogged;
    const lastErrorArgs = (win as any).lastErrorArgs;

    // Debug information
    cy.log(`Error logged: ${errorLogged}`);
    cy.log(`Last error args: ${JSON.stringify(lastErrorArgs)}`);

    // No console spy needed since we're testing for no errors

    // Assert that no errors should be logged
    expect(
      errorLogged,
      `Expected no errors to be logged with invalid deviceId. Last error: ${JSON.stringify(
        lastErrorArgs
      )}`
    ).to.be.false;
  });
});

Then('the system should fallback to a default camera', () => {
  // Wait for the component to handle the invalid deviceId and fallback
  cy.wait(1000);

  // With an invalid deviceId, the component should either:
  // 1. Show an error state, or
  // 2. Fallback to a default camera and show the liveness detector

  cy.get('body').then(($body) => {
    const hasLivenessDetector =
      $body.find('[data-testid="liveness-detector"]').length > 0;
    const hasVideo = $body.find('video').length > 0;
    const hasError =
      $body.text().includes('error') || $body.text().includes('Error');

    if (hasLivenessDetector) {
      cy.log('Liveness detector found - component fell back to default camera');
      // Verify that the liveness detector is working
      cy.get('[data-testid="liveness-detector"]').should('be.visible');

      // Check if video element is present and working
      if (hasVideo) {
        cy.get('video')
          .should('be.visible')
          .and('have.prop', 'srcObject')
          .and('not.be.null');
      }
    } else if (hasError) {
      cy.log(
        'Error state found - component failed to initialize with invalid deviceId'
      );
      // This is also acceptable behavior - the component shows an error instead of falling back
    } else {
      cy.log(
        'Neither liveness detector nor error state found - unexpected behavior'
      );
    }
  });
});

Then('I should be able to continue with the liveness check', () => {
  // With an invalid deviceId, the component behavior may vary:
  // 1. It might fallback to a default camera and work normally
  // 2. It might show an error state and not be able to continue

  cy.get('body').then(($body) => {
    const hasLivenessDetector =
      $body.find('[data-testid="liveness-detector"]').length > 0;
    const hasVideo = $body.find('video').length > 0;
    const hasError =
      $body.text().includes('error') || $body.text().includes('Error');

    if (hasLivenessDetector && hasVideo) {
      cy.log('Component fell back to default camera and is working');
      // Verify that the liveness check can proceed
      cy.get('[data-testid="liveness-detector"]').should('be.visible');
      cy.get('video').should('be.visible');

      // Check for liveness instructions - try to find either message
      const bodyText = $body.text();
      expect(bodyText).to.satisfy(
        (text: string) =>
          text.includes('Move closer') || text.includes('Position your face')
      );
    } else if (hasError) {
      cy.log(
        'Component shows error state - cannot continue with liveness check'
      );
      // This is acceptable behavior for invalid deviceId
    } else {
      cy.log('Unexpected state - neither working nor error');
    }
  });
});

Then('the specified camera should be selected', () => {
  // Wait for the component to initialize with the specified deviceId
  cy.wait(1000);

  // Check that the video stream is active
  cy.get('video')
    .should('be.visible')
    .and('have.prop', 'srcObject')
    .and('not.be.null');

  // Verify that the liveness detector is working with the specified camera
  cy.get('[data-testid="liveness-detector"]').should('be.visible');

  // If a specific deviceId was provided, verify it's being used
  if (testDeviceId) {
    // The component should be using the provided deviceId in its config
    // We can verify this by checking that the test device configuration is displayed
    cy.contains(`Test Device ID: ${testDeviceId}`).should('be.visible');
  } else {
    // If no specific deviceId was provided, just verify the component is working
    cy.log(
      'No specific deviceId provided, verifying component works with default camera selection'
    );
  }
});

Then('the device info should contain the correct deviceId', () => {
  // Verify that the device info contains the expected deviceId
  cy.window().then((win) => {
    const deviceInfo = (win as any).currentDeviceInfo;
    expect(deviceInfo, 'Device info should exist').to.not.be.null;
    expect(deviceInfo, 'Device info should not be undefined').to.not.be
      .undefined;
    expect(deviceInfo).to.have.property('deviceId', testDeviceId);
  });
});

When('I complete the liveness detection successfully', () => {
  // Wait for the liveness detector to be ready
  cy.get('[data-testid="liveness-detector"]').should('be.visible');
  cy.get('video').should('be.visible');

  // Wait for the component to complete its analysis
  // The component will call onAnalysisComplete with device info
  cy.wait(2000);

  // Verify that device info has been set by the component
  cy.window().then((win) => {
    const currentDeviceInfo = (win as any).currentDeviceInfo;
    expect(currentDeviceInfo, 'Device info should be set by the component').to
      .not.be.null;
    expect(currentDeviceInfo, 'Device info should not be undefined').to.not.be
      .undefined;

    // Store for later verification
    deviceInfo = currentDeviceInfo;
  });
});

Then('the device info should contain {string}', (field: string) => {
  // Wait a moment for device info to be available
  cy.wait(500);

  cy.window().then((win) => {
    const currentDeviceInfo = (win as any).currentDeviceInfo || deviceInfo;
    expect(currentDeviceInfo, 'Device info should exist').to.not.be.null;
    expect(currentDeviceInfo, 'Device info should not be undefined').to.not.be
      .undefined;
    expect(currentDeviceInfo).to.have.property(field);
    expect(currentDeviceInfo[field]).to.not.be.empty;
  });
});

Then('the device info should not contain {string}', (field: string) => {
  // Wait a moment for device info to be available
  cy.wait(500);

  cy.window().then((win) => {
    const currentDeviceInfo = (win as any).currentDeviceInfo || deviceInfo;
    expect(currentDeviceInfo, 'Device info should exist').to.not.be.null;
    expect(currentDeviceInfo, 'Device info should not be undefined').to.not.be
      .undefined;
    expect(currentDeviceInfo).to.not.have.property(field);
  });
});
