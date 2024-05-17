import {
  ATTEMPT_KEY,
  createTelemetryReporterMiddleware,
  getAttemptCount,
} from '../TelemetryReporter';

describe('getAttemptCount', () => {
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

  it('returns an attempt count of 1 if local storage is unset', async () => {
    expect(getAttemptCount()).toBe(1);
  });

  it('returns an attempt count of 1 if timestamp is greater than 5 minutes ago', async () => {
    localStore[ATTEMPT_KEY] = JSON.stringify({
      timestamp: Date.now() - 600000,
      count: 5,
    });
    expect(getAttemptCount()).toBe(1);
  });

  it('returns an attempt count of 3 if timestamp is less than 5 minutes ago and count was at 2', async () => {
    localStore[ATTEMPT_KEY] = JSON.stringify({
      timestamp: Date.now(),
      count: 2,
    });
    expect(getAttemptCount()).toBe(3);
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
