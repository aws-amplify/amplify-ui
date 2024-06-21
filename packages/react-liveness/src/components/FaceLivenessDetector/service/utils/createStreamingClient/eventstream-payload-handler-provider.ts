/**
 * This file is copied from https://github.com/aws/aws-sdk-js-v3/blob/main/packages/middleware-websocket/src/eventstream-payload-handler-provider.ts
 * We had to copy this file so we could update the signing stream further down with the systemClockOffset
 */

import {
  Decoder,
  Encoder,
  EventStreamPayloadHandlerProvider,
  MessageSigner,
  Provider,
} from '@smithy/types';

import { EventStreamPayloadHandler } from './EventStreamPayloadHandler';

/** Customized event utils provider which allows configuring systemClockOffset */
export const eventStreamPayloadHandlerProvider: (
  systemClockOffset: number
) => EventStreamPayloadHandlerProvider =
  (systemClockOffset: number) =>
  (options: {
    utf8Encoder: Encoder;
    utf8Decoder: Decoder;
    messageSigner: Provider<MessageSigner>;
  }) => {
    return new EventStreamPayloadHandler({ ...options, systemClockOffset });
  };
