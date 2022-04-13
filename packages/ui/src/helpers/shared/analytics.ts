import { Analytics } from '@aws-amplify/analytics';
import type { AnalyticsEvent } from '@aws-amplify/analytics/lib/types';

export interface AnalyticsEventOptions extends AnalyticsEvent {
  // Add more Amplify UI specific options
}

/**
 * Record an event with Amplify Analytics
 * @param event
 */
export function recordAnalyticsEvent(event: AnalyticsEventOptions) {
  Analytics.record(event).catch(() => {
    // no-op
  });
}
