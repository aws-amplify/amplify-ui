import { AuthenticatorMachineOptions } from '../../machines/authenticator';
import { AnalyticsEventOptions, recordAnalyticsEvent } from '../shared';

/**
 * Conditionally records a Authenticator analytics event with some default attribute(s)
 * @param authMachineOptions
 * @param eventOptions
 */
export function recordAuthenticatorAnalyticsEvent(
  authMachineOptions: AuthenticatorMachineOptions,
  eventOptions: AnalyticsEventOptions
) {
  if (authMachineOptions.enableAnalytics) {
    recordAnalyticsEvent({
      // add common Authenticator specific attributes
      ...eventOptions,
    });
  }
}
