import {
  getLivenessVideoEvent,
  getLivenessClientSessionInfoEvent,
} from '../liveness-event-utils';

describe('getLivenessVideoEvent', () => {
  it('should return an event stream message', () => {
    const input = Buffer.from([]);
    const message = getLivenessVideoEvent(input);

    expect(message.body).toEqual(input);
    expect(message.headers[':event-type'].value).toEqual('VideoEvent');
    expect(message.headers[':content-type'].value).toEqual(
      'application/octet-stream'
    );
  });
});

describe('getLivenessClientSessionInfoEvent', () => {
  it('should return an event stream message', () => {
    const input = Buffer.from([]);
    const message = getLivenessClientSessionInfoEvent(input);

    expect(message.body).toEqual(input);
    expect(message.headers[':event-type'].value).toEqual(
      'ClientSessionInformationEvent'
    );
    expect(message.headers[':content-type'].value).toEqual('application/json');
  });
});
