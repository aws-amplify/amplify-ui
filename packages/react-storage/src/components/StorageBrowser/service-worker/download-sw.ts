/// <reference lib="webworker" />

// Service Worker for streaming zip downloads in StorageBrowser

declare const self: ServiceWorkerGlobalScope;
export type {}; // make this a module to avoid global scope pollution

// Stores the ReadableStream posted from the main thread, keyed by download ID,
// along with everything needed to release the keepalive hold for that id. The
// download ID embeds a timestamp to stay unique; the filename is carried
// separately so the timestamp never reaches the saved file name.
interface PendingDownload {
  stream: ReadableStream;
  filename: string;
  // Resolves the message handler's `waitUntil` promise once the matching fetch
  // consumes the stream, keeping the SW alive across the ack → navigation →
  // fetch gap so the browser cannot terminate the idle worker and lose the entry.
  release: () => void;
  // The safety-cap timer; refreshed on each keepalive and cleared once the fetch
  // consumes the stream.
  timer: ReturnType<typeof setTimeout>;
}
const pendingStreams = new Map<string, PendingDownload>();

// How long a stored stream is held without activity before the cap fires. The
// page pings `keepalive` every 10s while a batch is live, and each ping refreshes
// this timer, so an in-progress download never caps (even if the user sits on
// Chrome's "allow multiple downloads" prompt). The cap only fires once the pings
// stop — i.e. the navigation was abandoned or the page went away.
const CAP_MS = 30_000;

/**
 * (Re)schedules the safety-cap timer for a stored download. When it fires it
 * drops the entry and cancels the transferred stream's producer — not just our
 * reference. The readable was transferred from the page; if we only dropped it,
 * the page's zip writer would block on backpressure once the queue fills and the
 * download task would never settle. Cancelling rejects the page-side write so
 * the task ends FAILED (an Error reason keeps the handler's `err.message`
 * defined). Returns the timer handle to store on the PendingDownload.
 */
const scheduleCapTimeout = (
  downloadId: string
): ReturnType<typeof setTimeout> =>
  setTimeout(() => {
    const expired = pendingStreams.get(downloadId);
    pendingStreams.delete(downloadId);
    expired?.release();
    expired?.stream
      .cancel(new Error('Download expired before the browser requested it'))
      .catch(() => {});
  }, CAP_MS);

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
    // Refresh the safety cap for every stream still waiting for its fetch. The
    // ping proves the batch is still live, so a stored stream should not be
    // capped out from under an in-progress (or prompt-blocked) download.
    for (const [downloadId, pending] of pendingStreams) {
      clearTimeout(pending.timer);
      pending.timer = scheduleCapTimeout(downloadId);
    }
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

    // Hold this SW instance alive until the matching fetch consumes the stream.
    // The cap (refreshed by keepalive) ensures an abandoned navigation cannot
    // pin the worker or leak the stream forever.
    event.waitUntil(
      new Promise<void>((resolve) => {
        pendingStreams.set(downloadId, {
          stream,
          filename: resolvedFilename,
          release: resolve,
          timer: scheduleCapTimeout(downloadId),
        });
      })
    );
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
  // Pass through the worker's own script rather than treating it as a download
  // id. Register/update script fetches bypass the fetch handler per spec, so in
  // practice only a direct navigation to the script URL reaches here; this is a
  // guard. Derived from self.location so a rename/relocation of the file stays
  // correct without a hardcoded name.
  if (url.pathname === self.location.pathname) {
    return;
  }
  const downloadId = decodeURIComponent(rawId);
  const pending = pendingStreams.get(downloadId);

  if (!pending) {
    // Fail fast with a visible 410 rather than returning (which falls through to
    // the network, where the URL 404s and Chrome hangs with no error). A miss
    // means the SW restarted and lost the stream, or the id is stale.
    event.respondWith(
      new Response('Download expired or unavailable', {
        status: 410,
        headers: { 'Content-Type': 'text/plain' },
      })
    );
    return;
  }

  pendingStreams.delete(downloadId);
  // The fetch consumed the stream: cancel the no-longer-needed 30s cap timer and
  // release the keepalive hold. The respondWith stream now keeps the SW alive
  // for the transfer.
  clearTimeout(pending.timer);
  pending.release();

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
