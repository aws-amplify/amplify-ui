/**
 * Note: This file was copied from https://github.com/aws/aws-sdk-js-v3/blob/main/packages/middleware-websocket/src/websocket-fetch-handler.ts#L176
 * Because of this the file is not fully typed at this time but we should eventually work on fully typing this file.
 */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { formatUrl } from '@aws-sdk/util-format-url';
import {
  iterableToReadableStream,
  readableStreamtoIterable,
} from '@smithy/eventstream-serde-browser';
import { FetchHttpHandler } from '@smithy/fetch-http-handler';
import type { HttpRequest } from '@smithy/protocol-http';
import { HttpResponse } from '@smithy/protocol-http';
import type { Provider, RequestHandler, RequestHandlerMetadata } from './types';
import { WS_CLOSURE_CODE } from '../constants';

const DEFAULT_WS_CONNECTION_TIMEOUT_MS = 2000;

export const WEBSOCKET_CONNECTION_TIMEOUT_MESSAGE =
  'Websocket connection timeout';

const isWebSocketRequest = (request: HttpRequest) =>
  request.protocol === 'ws:' || request.protocol === 'wss:';

const isReadableStream = (payload: any): payload is ReadableStream =>
  typeof ReadableStream === 'function' && payload instanceof ReadableStream;

/**
 * Transfer payload data to an AsyncIterable.
 * When the ReadableStream API is available in the runtime(e.g. browser), and
 * the request body is ReadableStream, so we need to transfer it to AsyncIterable
 * to make the stream consumable by WebSocket.
 */
const getIterator = (stream: any): AsyncIterable<any> => {
  // Noop if stream is already an async iterable
  if (stream[Symbol.asyncIterator]) {
    return stream;
  }

  if (isReadableStream(stream)) {
    // If stream is a ReadableStream, transfer the ReadableStream to async iterable.
    return readableStreamtoIterable(stream);
  }

  // For other types, just wrap them with an async iterable.
  return {
    [Symbol.asyncIterator]: async function* () {
      yield stream;
    },
  };
};

/**
 * Convert async iterable to a ReadableStream when ReadableStream API
 * is available(browsers). Otherwise, leave as it is(ReactNative).
 */
const toReadableStream = <T>(asyncIterable: AsyncIterable<T>) =>
  typeof ReadableStream === 'function'
    ? iterableToReadableStream(asyncIterable)
    : asyncIterable;

export interface WebSocketFetchHandlerOptions {
  /**
   * The maximum time in milliseconds that the connection phase of a request
   * may take before the connection attempt is abandoned.
   */
  connectionTimeout?: number;
}

/**
 * Base handler for websocket requests and HTTP request. By default, the request input and output
 * body will be in a ReadableStream, because of interface consistency among middleware.
 * If ReadableStream is not available, like in React-Native, the response body
 * will be an async iterable.
 */
export class CustomWebSocketFetchHandler {
  public readonly metadata: RequestHandlerMetadata = {
    handlerProtocol: 'websocket/h1.1',
  };
  private config: WebSocketFetchHandlerOptions;
  private configPromise: Promise<WebSocketFetchHandlerOptions>;
  private readonly httpHandler: RequestHandler<any, any>;
  private readonly sockets: Record<string, WebSocket[]> = {};
  private readonly utf8decoder = new TextDecoder(); // default 'utf-8' or 'utf8'

  constructor(
    options?:
      | WebSocketFetchHandlerOptions
      | Provider<WebSocketFetchHandlerOptions>,
    httpHandler: RequestHandler<any, any> = new FetchHttpHandler()
  ) {
    this.httpHandler = httpHandler;
    if (typeof options === 'function') {
      this.config = {};
      this.configPromise = options().then((opts) => (this.config = opts ?? {}));
    } else {
      this.config = options ?? {};
      this.configPromise = Promise.resolve(this.config);
    }
  }

  /**
   * Destroys the WebSocketHandler.
   * Closes all sockets from the socket pool.
   */
  destroy(): void {
    for (const [key, sockets] of Object.entries(this.sockets)) {
      for (const socket of sockets) {
        socket.close(1000, `Socket closed through destroy() call`);
      }
      delete this.sockets[key];
    }
  }

  async handle(request: HttpRequest): Promise<{ response: HttpResponse }> {
    if (!isWebSocketRequest(request)) {
      return this.httpHandler.handle(request);
    }
    const url = formatUrl(request);
    const socket: WebSocket = new WebSocket(url);

    // Add socket to sockets pool
    if (!this.sockets[url]) {
      this.sockets[url] = [];
    }
    this.sockets[url].push(socket);

    socket.binaryType = 'arraybuffer';
    const { connectionTimeout = DEFAULT_WS_CONNECTION_TIMEOUT_MS } =
      await this.configPromise;
    await this.waitForReady(socket, connectionTimeout);
    const { body } = request;
    const bodyStream = getIterator(body);
    const asyncIterable = this.connect(socket, bodyStream);
    const outputPayload = toReadableStream(asyncIterable);
    return {
      response: new HttpResponse({
        statusCode: 200, // indicates connection success
        body: outputPayload,
      }),
    };
  }

  updateHttpClientConfig(
    key: keyof WebSocketFetchHandlerOptions,
    value: WebSocketFetchHandlerOptions[typeof key]
  ): void {
    this.configPromise = this.configPromise.then((config) => {
      return {
        ...config,
        [key]: value,
      };
    });
  }

  httpHandlerConfigs(): WebSocketFetchHandlerOptions {
    return this.config ?? {};
  }

  /**
   * Removes all closing/closed sockets from the socket pool for URL.
   */
  private removeNotUsableSockets(url: string): void {
    this.sockets[url] = (this.sockets[url] ?? []).filter(
      (socket) =>
        !(
          socket.readyState === WebSocket.CLOSING ||
          socket.readyState === WebSocket.CLOSED
        )
    );
  }

  private waitForReady(
    socket: WebSocket,
    connectionTimeout: number
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.removeNotUsableSockets(socket.url);
        reject(new Error(WEBSOCKET_CONNECTION_TIMEOUT_MESSAGE));
      }, connectionTimeout);

      socket.onopen = () => {
        clearTimeout(timeout);
        resolve();
      };
    });
  }

  private connect(
    socket: WebSocket,
    data: AsyncIterable<Uint8Array>
  ): AsyncIterable<Uint8Array> {
    // To notify output stream any error thrown after response
    // is returned while data keeps streaming.
    let streamError: Error | undefined = undefined;

    // To notify onclose event that error has occurred.
    let socketErrorOccurred = false;

    // Buffer for messages that arrive before the consumer calls .next().
    // This prevents dropped messages when the server responds faster than
    // the client sets up its async iterator (race condition).
    const messageQueue: Uint8Array[] = [];
    let waitingResolve:
      | ((result: IteratorResult<Uint8Array, void>) => void)
      | null = null;
    let waitingReject: ((err?: unknown) => void) | null = null;
    let done = false;
    let endError: unknown = undefined;

    socket.onmessage = (event) => {
      const chunk = new Uint8Array(event.data);
      if (waitingResolve) {
        // Consumer is waiting for data — deliver immediately
        const resolve = waitingResolve;
        waitingResolve = null;
        waitingReject = null;
        resolve({ done: false, value: chunk });
      } else {
        // Consumer hasn't called .next() yet — buffer the message
        messageQueue.push(chunk);
      }
    };

    socket.onerror = (error) => {
      socketErrorOccurred = true;
      socket.close();
      done = true;
      endError = error;
      if (waitingReject) {
        const reject = waitingReject;
        waitingResolve = null;
        waitingReject = null;
        reject(error);
      }
    };

    socket.onclose = (event: CloseEvent) => {
      this.removeNotUsableSockets(socket.url);
      if (socketErrorOccurred) return;

      done = true;
      if (streamError) {
        endError = streamError;
      } else if (
        event.code !== WS_CLOSURE_CODE.SUCCESS_CODE &&
        event.code !== 1001
      ) {
        // Server closed the connection with an abnormal code (e.g. 4001
        // StreamIdleTimeout, 4003 SessionExpired, 1006 abnormal closure).
        endError = new Error(
          `Server ended the connection unexpectedly (code ${event.code}` +
            (event.reason ? `: ${event.reason}` : '') +
            ')'
        );
      }

      if (waitingResolve) {
        if (endError) {
          const reject = waitingReject!;
          waitingResolve = null;
          waitingReject = null;
          reject(endError);
        } else {
          const resolve = waitingResolve;
          waitingResolve = null;
          waitingReject = null;
          resolve({ done: true, value: undefined });
        }
      }
    };

    const outputStream: AsyncIterable<Uint8Array> = {
      [Symbol.asyncIterator]: () => ({
        next: () => {
          // If there are buffered messages, deliver the next one immediately
          if (messageQueue.length > 0) {
            return Promise.resolve({
              done: false,
              value: messageQueue.shift()!,
            } as IteratorResult<Uint8Array, void>);
          }

          // If the stream has ended, resolve/reject accordingly
          if (done) {
            if (endError) {
              return Promise.reject(
                endError instanceof Error
                  ? endError
                  : new Error('Stream ended with an error')
              );
            }
            return Promise.resolve({
              done: true,
              value: undefined,
            } as IteratorResult<Uint8Array, void>);
          }

          // Otherwise wait for the next message or close event
          return new Promise((_resolve, _reject) => {
            waitingResolve = _resolve;
            waitingReject = _reject;
          });
        },
      }),
    };

    const send = async (): Promise<void> => {
      try {
        for await (const inputChunk of data) {
          const decodedString = this.utf8decoder.decode(inputChunk);
          if (decodedString.includes('closeCode')) {
            const match = decodedString.match(/"closeCode":([0-9]*)/);
            if (match) {
              const closeCode = match[1];
              socket.close(parseInt(closeCode));
            }
            continue;
          }
          socket.send(inputChunk);
        }
      } catch (err) {
        // We don't throw the error here because the send()'s returned
        // would already be settled by the time sending chunk throws error.
        // Instead, notify the output stream to throw if there's exceptions
        if (err instanceof Error) {
          streamError = err;
        }
      } finally {
        // WS status code: https://tools.ietf.org/html/rfc6455#section-7.4
        socket.close(WS_CLOSURE_CODE.SUCCESS_CODE);
      }
    };

    send();

    return outputStream;
  }
}
