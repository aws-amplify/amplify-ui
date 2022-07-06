import { Message } from '@aws-sdk/eventstream-codec';

export function getLivenessVideoEvent(buffer: Uint8Array): Message {
  return {
    headers: {
      ':message-type': {
        type: 'string',
        value: 'event',
      },
      ':event-type': {
        type: 'string',
        value: 'VideoEvent',
      },
      ':content-type': {
        type: 'string',
        value: 'application/octet-stream',
      },
    },
    body: buffer,
  };
}

export function getLivenessClientSessionInfoEvent(buffer: Uint8Array): Message {
  return {
    headers: {
      ':message-type': {
        type: 'string',
        value: 'event',
      },
      ':event-type': {
        type: 'string',
        value: 'ClientSessionInformationEvent',
      },
      ':content-type': {
        type: 'string',
        value: 'application/json',
      },
    },
    body: buffer,
  };
}
