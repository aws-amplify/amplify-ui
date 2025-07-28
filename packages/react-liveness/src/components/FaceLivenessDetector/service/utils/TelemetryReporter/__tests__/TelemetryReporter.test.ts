import {
  createTelemetryReporterMiddleware,
  TelemetryReporter,
} from '../TelemetryReporter';

describe('getAttemptCountAndUpdateTimestamp', () => {
  let localStore: any;

  beforeEach(() => {
    localStore = {};

    Storage.prototype.getItem = jest.fn().mockImplementation((key) => {
      return key in localStore ? localStore[key] : null;
    });
    Storage.prototype.setItem = jest
      .fn()
      .mockImplementation((key, value) => (localStore[key] = value + ''));
    Storage.prototype.clear = jest
      .fn()
      .mockImplementation(() => (localStore = {}));
  });

  it('returns an attempt count of 1 on intitial call ', async () => {
    expect(TelemetryReporter.getAttemptCountAndUpdateTimestamp()).toBe(1);
  });

  it('returns an attempt count of 1 if timestamp is greater than 5 minutes ago', async () => {
    TelemetryReporter.timestamp = Date.now() - 600000;
    TelemetryReporter.attemptCount = 5;

    expect(TelemetryReporter.getAttemptCountAndUpdateTimestamp()).toBe(1);
  });

  it('returns an attempt count of 3 if timestamp is less than 5 minutes ago and count was at 2', async () => {
    TelemetryReporter.attemptCount = 2;
    expect(TelemetryReporter.getAttemptCountAndUpdateTimestamp()).toBe(3);
  });
});

describe('telemetryReporterMiddleware', () => {
  it('appends attempt count and pre check view enabled to query params', async () => {
    const middlewareResponse = await createTelemetryReporterMiddleware(
      1,
      true
    )(async (args) => {
      return {
        output: { SessionId: 'foobar', $metadata: {}, args },
        response: {},
      };
    })({
      request: { query: {} },
      input: {
        SessionId: '',
        VideoWidth: '',
        VideoHeight: '',
        ChallengeVersions: '',
      },
    });
    const query = (middlewareResponse.output as any).args.request.query;
    expect(query['attempt-count']).toBe('1');
    expect(query['precheck-view-enabled']).toBe('1');
  });
});
