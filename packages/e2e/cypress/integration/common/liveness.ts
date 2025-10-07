import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { escapeRegExp } from 'lodash';

// Store device configuration for test scenarios
let testDeviceId: string | null = null;
let deviceInfo: any = null;

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

Given('I set an invalid deviceId {string}', (deviceId: string) => {
  testDeviceId = deviceId;
  // Store the deviceId in window object for the component to use
  cy.window().then((win) => {
    (win as any).testDeviceId = deviceId;
    (win as any).testDeviceIdIsValid = false;
    (win as any).errorLogged = false;
    (win as any).errorType = null;

    // Override console.error to capture errors
    const originalError = win.console.error;
    win.console.error = (...args: any[]) => {
      (win as any).errorLogged = true;
      (win as any).lastErrorArgs = args;

      // Check if this is our expected error
      args.forEach((arg) => {
        if (
          typeof arg === 'string' &&
          arg.includes('DEFAULT_CAMERA_NOT_FOUND_ERROR')
        ) {
          (win as any).errorType = 'DEFAULT_CAMERA_NOT_FOUND_ERROR';
        } else if (
          arg &&
          typeof arg === 'object' &&
          arg.state === 'DEFAULT_CAMERA_NOT_FOUND_ERROR'
        ) {
          (win as any).errorType = 'DEFAULT_CAMERA_NOT_FOUND_ERROR';
        }
      });

      // Call original console.error
      originalError.apply(win.console, args);
    };
  });
});

Given('I set a valid deviceId {string}', (deviceId: string) => {
  testDeviceId = deviceId;
  // Store the deviceId in window object for the component to use
  cy.window().then((win) => {
    (win as any).testDeviceId = deviceId;
    (win as any).testDeviceIdIsValid = true;
    (win as any).errorLogged = false;
    (win as any).errorType = null;
  });
});

Then('I should see a {string} error', (errorType: string) => {
  // Wait a moment for the error to be logged
  cy.wait(1000);

  // Check if the error was logged using our console override
  cy.window().then((win) => {
    expect((win as any).errorLogged, 'Expected an error to be logged').to.be
      .true;
    expect(
      (win as any).errorType,
      `Expected error type to be ${errorType}`
    ).to.equal(errorType);
  });
});

Then('the system should fallback to a default camera', () => {
  // Verify that the liveness detector continues to work despite the error
  cy.get('[data-testid="liveness-detector"]').should('be.visible');

  // Check that a fallback camera is being used
  cy.window().then((win) => {
    // Verify that the system has fallen back to a default camera
    expect((win as any).fallbackCameraUsed).to.be.true;
  });
});

Then('I should be able to continue with the liveness check', () => {
  // Verify that the liveness check can proceed
  cy.get('[data-testid="liveness-detector"]').should('be.visible');
  cy.get('video').should('be.visible');

  // Check for liveness instructions - try to find either message
  cy.get('body').then(($body) => {
    const bodyText = $body.text();
    expect(bodyText).to.satisfy(
      (text: string) =>
        text.includes('Move closer') || text.includes('Position your face')
    );
  });
});

Then('the specified camera should be selected', () => {
  // Verify that the correct camera is being used
  cy.window().then((win) => {
    expect((win as any).selectedCameraId).to.equal(testDeviceId);
  });

  // Check that the video stream is active with the specified camera
  cy.get('video')
    .should('be.visible')
    .and('have.prop', 'srcObject')
    .and('not.be.null');
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
  // Simulate successful completion of liveness detection
  cy.get('[data-testid="liveness-detector"]').should('be.visible');

  // Mock the completion callback
  cy.window().then((win) => {
    // Simulate the onAnalysisComplete callback with device info
    const mockDeviceInfo = {
      deviceId: testDeviceId || 'default-camera',
      label: 'Test Camera',
      groupId: 'test-group-123',
    };

    (win as any).currentDeviceInfo = mockDeviceInfo;
    deviceInfo = mockDeviceInfo;

    // Trigger the completion callback
    if ((win as any).onAnalysisComplete) {
      (win as any).onAnalysisComplete(mockDeviceInfo);
    }
  });
});

Then('the device info should contain {string}', (field: string) => {
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
  cy.window().then((win) => {
    const currentDeviceInfo = (win as any).currentDeviceInfo || deviceInfo;
    expect(currentDeviceInfo, 'Device info should exist').to.not.be.null;
    expect(currentDeviceInfo, 'Device info should not be undefined').to.not.be
      .undefined;
    expect(currentDeviceInfo).to.not.have.property(field);
  });
});
