import { FaceLivenessDetectorProps } from '../../types';
import { AnalyticsEventOptions, recordAnalyticsEvent } from '../shared';

/**
 * Conditionally records a Liveness event with some default attribute(s)
 * @param flowProps
 * @param options
 */
export function recordLivenessAnalyticsEvent(
  flowProps: FaceLivenessDetectorProps,
  options: AnalyticsEventOptions
) {
  if (flowProps.enableAnalytics) {
    recordAnalyticsEvent({
      event: options.event,
      attributes: {
        sessionId: flowProps.sessionId,
        ...options.attributes,
      },
      metrics: options.metrics,
    });
  }
}

export const LIVENESS_EVENT_GET_READY_SCREEN = 'GetReadyScreen';
export const LIVENESS_EVENT_LIVENESS_CHECK_SCREEN = 'LivenessCheckScreen';
export const LIVENESS_EVENT_DISABLED_GET_READY_SCREEN =
  'DisabledGetReadyScreen';
