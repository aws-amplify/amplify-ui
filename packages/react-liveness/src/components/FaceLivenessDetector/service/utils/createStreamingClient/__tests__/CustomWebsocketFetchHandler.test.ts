// Copied from https://github.com/aws/aws-sdk-js-v3/blob/main/packages/middleware-websocket/src/websocket-fetch-handler.spec.ts

import { FetchHttpHandler } from '@smithy/fetch-http-handler';
import { HttpRequest } from '@smithy/protocol-http';
import WS from 'jest-websocket-mock';
import { WebSocket } from 'mock-socket';
import { PassThrough } from 'stream';
import { TextDecoder } from 'util';

import { CustomWebSocketFetchHandler } from '../CustomWebSocketFetchHandler';

jest.mock('@smithy/fetch-http-handler');

Object.defineProperty(window, 'TextDecoder', {
  writable: true,
  value: TextDecoder,
});

const mockHostname = 'localhost:6789';
const mockUrl = `ws://${mockHostname}/`;

describe(CustomWebSocketFetchHandler.name, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('should handle WebSocket connections', () => {
    beforeEach(() => {
      global.WebSocket = WebSocket;
    });

    afterEach(() => {
      WS.clean();
    });

    it('should contain protocol metadata', () => {
      const handler = new CustomWebSocketFetchHandler();
      expect(handler.metadata.handlerProtocol).toContain('websocket');
    });

    it('populates socket in socket pool based on handle() requests', async () => {
      const handler = new CustomWebSocketFetchHandler();
      new WS(mockUrl);

      // @ts-expect-error Property 'sockets' is private and only accessible within class 'WebSocketHandler'.
      expect(handler.sockets[mockUrl]).not.toBeDefined();

      await handler.handle(
        new HttpRequest({
          body: new PassThrough(),
          hostname: mockHostname,
          protocol: 'ws:',
        })
      );

      // @ts-expect-error Property 'sockets' is private and only accessible within class 'WebSocketHandler'.
      expect(handler.sockets[mockUrl]).toBeDefined();
      // @ts-expect-error Property 'sockets' is private and only accessible within class 'WebSocketHandler'.
      expect(handler.sockets[mockUrl].length).toBe(1);

      await handler.handle(
        new HttpRequest({
          body: new PassThrough(),
          hostname: mockHostname,
          protocol: 'ws:',
        })
      );

      // @ts-expect-error Property 'sockets' is private and only accessible within class 'WebSocketHandler'.
      expect(handler.sockets[mockUrl].length).toBe(2);
    });

    it('closes socket in socket pool on handler.destroy()', async () => {
      const handler = new CustomWebSocketFetchHandler();
      new WS(mockUrl);

      await handler.handle(
        new HttpRequest({
          body: new PassThrough(),
          hostname: mockHostname,
          protocol: 'ws:',
        })
      );

      // @ts-expect-error Property 'sockets' is private and only accessible within class 'WebSocketHandler'.
      const socket = handler.sockets[mockUrl][0];

      expect(socket.readyState).toBe(WebSocket.OPEN);
      handler.destroy();

      // Verify that socket.close() is called
      expect(socket.readyState).toBe(WebSocket.CLOSING);
    });

    it('should throw in output stream if input stream throws', async () => {
      expect.assertions(2);
      const handler = new CustomWebSocketFetchHandler();
      //Using Node stream is fine because they are also async iterables.
      const payload = new PassThrough();
      const server = new WS(mockUrl);
      const {
        response: { body: responsePayload },
      } = await handler.handle(
        new HttpRequest({
          body: payload,
          hostname: mockHostname,
          protocol: 'ws:',
        })
      );
      await server.connected;
      payload.emit('error', new Error('FakeError'));
      await expect(async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for await (const chunk of responsePayload) {
          /** pass */
        }
      }).rejects.toThrow('FakeError');

      // @ts-expect-error Property 'sockets' is private and only accessible within class 'WebSocketHandler'.
      expect(handler.sockets[mockUrl].length).toBe(0);
    });

    it('should return timeout error if cannot setup ws connection', async () => {
      const originalSetTimeout = globalThis.setTimeout;

      global.setTimeout = jest.fn(
        (fn: (...args: any[]) => void, ms?: number, ...args: any[]) => {
          return originalSetTimeout(fn, ms, ...args);
        }
      ) as unknown as typeof setTimeout;

      const connectionTimeout = 1000;
      const handler = new CustomWebSocketFetchHandler(async () => ({
        connectionTimeout,
      }));
      //Using Node stream is fine because they are also async iterables.
      const payload = new PassThrough();
      const mockInvalidHostname = 'localhost:9876';
      const mockInvalidUrl = `ws://${mockInvalidHostname}/`;

      await expect(
        handler.handle(
          new HttpRequest({
            body: payload,
            hostname: mockInvalidHostname, //invalid websocket endpoint
            protocol: 'ws:',
          })
        )
      ).rejects.toThrow('Websocket connection timeout');

      // @ts-expect-error Property 'sockets' is private and only accessible within class 'WebSocketHandler'.
      expect(handler.sockets[mockInvalidUrl].length).toBe(0);
      globalThis.setTimeout = originalSetTimeout;
    });

    it('should return timeout error if cannot setup ws connection', async () => {
      const originalFn = setTimeout;
      (global as any).setTimeout = jest.fn().mockImplementation(setTimeout);
      const connectionTimeout = 1000;
      const handler = new CustomWebSocketFetchHandler(async () => ({
        connectionTimeout,
      }));
      //Using Node stream is fine because they are also async iterables.
      const payload = new PassThrough();
      const mockInvalidHostname = 'localhost:9876';
      const mockInvalidUrl = `ws://${mockInvalidHostname}/`;

      try {
        await handler.handle(
          new HttpRequest({
            body: payload,
            hostname: mockInvalidHostname, //invalid websocket endpoint
            protocol: 'ws:',
          })
        );
      } catch (err: any) {
        expect(err).toBeDefined();
        expect(err.message).toBeDefined();
        expect(err.message).toBe('Websocket connection timeout');
        // @ts-expect-error Property 'sockets' is private and only accessible within class 'WebSocketHandler'.
        expect(handler.sockets[mockInvalidUrl].length).toBe(0);
      }
      (global as any).setTimeout = originalFn;
    });
  });

  describe('should handle http requests', () => {
    it('should create fetch http handler at construction', () => {
      new CustomWebSocketFetchHandler();
      expect(FetchHttpHandler).toBeCalled();
    });

    it('should make http request with fetch handler', async () => {
      const httpHandler = new FetchHttpHandler();
      const handler = new CustomWebSocketFetchHandler(undefined, httpHandler);
      const request = new HttpRequest({});
      try {
        await handler.handle(request);
      } catch (e) {}
      //@ts-ignore
      expect(httpHandler.__proto__.handle).toHaveBeenCalledWith(request);
    });
  });
});
