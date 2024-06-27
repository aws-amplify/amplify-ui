/**
 * This file is copied from https://github.com/aws/aws-sdk-js-v3/blob/main/packages/middleware-websocket/src/get-event-signing-stream.ts
 * We had to copy this file so we could override the signing date to include the system clock offset
 */

import { EventStreamCodec } from '@smithy/eventstream-codec';
import { MessageHeaders, MessageSigner } from '@smithy/types';
import { fromHex } from '@smithy/util-hex-encoding';

/**
 * Get a transform stream that signs the eventstream
 * Implementation replicated from @aws-sdk/eventstream-handler-node::EventSigningStream
 * but modified to be compatible with WHATWG stream interface
 */
export const getEventSigningTransformStream = (
  initialSignature: string,
  messageSigner: MessageSigner,
  eventStreamCodec: EventStreamCodec,
  systemClockOffset = 0
  // eslint-disable-next-line max-params
): TransformStream<Uint8Array, Uint8Array> => {
  let priorSignature = initialSignature;
  const transformer: Transformer<Uint8Array, Uint8Array> = {
    start() {},
    async transform(chunk, controller) {
      try {
        const now = new Date(Date.now() + systemClockOffset);
        const dateHeader: MessageHeaders = {
          ':date': { type: 'timestamp', value: now },
        };
        const signedMessage = await messageSigner.sign(
          {
            message: {
              body: chunk,
              headers: dateHeader,
            },
            priorSignature: priorSignature,
          },
          {
            signingDate: now,
          }
        );
        priorSignature = signedMessage.signature;
        const serializedSigned = eventStreamCodec.encode({
          headers: {
            ...dateHeader,
            ':chunk-signature': {
              type: 'binary',
              value: fromHex(signedMessage.signature),
            },
          },
          body: chunk,
        });
        controller.enqueue(serializedSigned);
      } catch (error) {
        controller.error(error);
      }
    },
  };
  return new TransformStream({ ...transformer });
};
