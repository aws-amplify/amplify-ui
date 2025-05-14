import type {
  StartFaceLivenessSessionCommandInput,
  StartFaceLivenessSessionCommandOutput,
} from '@aws-sdk/client-rekognitionstreaming';
import type { HttpRequest } from '@smithy/protocol-http';
import type {
  BuildHandler,
  BuildHandlerArguments,
  BuildHandlerOutput,
} from '@smithy/types';

const DEFAULT_ATTEMPT_COUNT_TIMEOUT = 300000; // 5 minutes / 300000 ms

// Telemetry data is for internal use only and should not be depended upon or used by the customer
export class TelemetryReporter {
  static attemptCount = 0;
  static timestamp = Date.now();

  static getAttemptCountAndUpdateTimestamp(): number {
    const timeSinceLastAttempt = Date.now() - TelemetryReporter.timestamp;
    if (timeSinceLastAttempt > DEFAULT_ATTEMPT_COUNT_TIMEOUT) {
      TelemetryReporter.attemptCount = 1;
    } else {
      TelemetryReporter.attemptCount += 1;
    }

    TelemetryReporter.timestamp = Date.now();

    return TelemetryReporter.attemptCount;
  }
}

export const createTelemetryReporterMiddleware =
  (attemptCount: number, preCheckViewEnabled: boolean) =>
  (
    next: BuildHandler<
      StartFaceLivenessSessionCommandInput,
      StartFaceLivenessSessionCommandOutput
    >
  ) =>
  async (
    args: BuildHandlerArguments<StartFaceLivenessSessionCommandInput>
  ): Promise<BuildHandlerOutput<StartFaceLivenessSessionCommandOutput>> => {
    (args.request as HttpRequest).query['attempt-count'] =
      attemptCount.toString();
    (args.request as HttpRequest).query['precheck-view-enabled'] =
      preCheckViewEnabled ? '1' : '0';

    const result = await next(args);
    return result;
  };
