/// <reference lib="webworker" />

// Service Worker for streaming zip downloads in StorageBrowser

declare const self: ServiceWorkerGlobalScope;
export type {}; // make this a module to avoid global scope pollution

// Stores the ReadableStream (and its user-facing filename) posted from the main
// thread, keyed by download ID. The download ID embeds a timestamp to stay
// unique; the filename is carried separately so the timestamp never reaches the
// saved file name.
interface PendingDownload {
  stream: ReadableStream;
  filename: string;
}
const pendingStreams = new Map<string, PendingDownload>();

// Skip waiting to activate immediately on first install (no navigation required)
self.addEventListener('install', () => {
  self.skipWaiting();
});

// Claim clients immediately so navigator.serviceWorker.controller is available
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Receive stream from main thread via MessageChannel
self.addEventListener('message', (event) => {
  // Security: only accept messages from same-origin clients. A service worker
  // exclusively communicates with pages it controls, which are same-origin by
  // definition. Rejecting mismatched origins guards against cross-origin
  // senders attempting to inject or hijack download streams.
  if (event.origin !== self.location.origin) {
    return;
  }

  const data = event.data as {
    type?: string;
    downloadId?: string;
    filename?: string;
    stream?: ReadableStream;
  };

  if (data.type === 'keepalive') {
    // Extend SW lifetime to prevent Firefox's 30s idle timeout from terminating
    // the worker while streaming. Each keepalive holds the SW alive for 15s,
    // overlapping with the 10s ping interval from the page.
    event.waitUntil(new Promise((resolve) => setTimeout(resolve, 15_000)));
    return;
  }

  const { downloadId, filename, stream } = data as {
    downloadId: string;
    filename?: string;
    stream: ReadableStream;
  };
  if (downloadId && stream) {
    // Fall back to the id's last path segment only if no explicit filename was
    // provided (older callers); the page normally sends `${folder}.zip`.
    const resolvedFilename =
      filename ?? downloadId.split('/').pop() ?? 'download.zip';
    pendingStreams.set(downloadId, { stream, filename: resolvedFilename });
    // Acknowledge receipt so the main thread knows it's safe to trigger the download
    if (event.ports[0]) {
      event.ports[0].postMessage({ ready: true });
    }
  }
});

// Intercept fetch requests matching the download URL pattern
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (!url.pathname.startsWith('/amplify-storage-download/')) return;

  // The download id is percent-encoded by the browser when the <a> navigation
  // fires (folder names may contain spaces or other URL-unsafe characters), so
  // decode it before looking up the stream stored under the unencoded key.
  const rawId = url.pathname.split('/amplify-storage-download/')[1];
  const downloadId = decodeURIComponent(rawId);
  const pending = pendingStreams.get(downloadId);

  if (!pending) return;

  pendingStreams.delete(downloadId);

  const { stream, filename } = pending;
  event.respondWith(
    new Response(stream, {
      headers: {
        // RFC 5987 extended notation encodes arbitrary UTF-8 (including quotes
        // and backslashes that S3 keys may legally contain) without escaping.
        // `filename` is the user-facing name sent by the page (e.g. folder.zip),
        // NOT the timestamped internal downloadId.
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(
          filename
        )}`,
        'Content-Type': 'application/octet-stream',
      },
    })
  );
});
