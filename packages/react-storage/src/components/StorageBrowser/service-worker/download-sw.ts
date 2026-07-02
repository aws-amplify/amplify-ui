/// <reference lib="webworker" />

// Service Worker for streaming zip downloads in StorageBrowser

declare const self: ServiceWorkerGlobalScope;
export type {}; // make this a module to avoid global scope pollution

// Stores ReadableStreams posted from the main thread, keyed by download ID
const pendingStreams = new Map<string, ReadableStream>();

// Claim clients immediately so navigator.serviceWorker.controller is available
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Receive stream from main thread via MessageChannel
self.addEventListener('message', (event) => {
  const { downloadId, stream } = event.data as {
    downloadId: string;
    stream: ReadableStream;
  };
  if (downloadId && stream) {
    pendingStreams.set(downloadId, stream);
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

  const downloadId = url.pathname.split('/amplify-storage-download/')[1];
  const stream = pendingStreams.get(downloadId);

  if (!stream) return;

  pendingStreams.delete(downloadId);

  const filename = decodeURIComponent(downloadId.split('/').pop()!);
  event.respondWith(
    new Response(stream, {
      headers: {
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Type': 'application/octet-stream',
      },
    })
  );
});
