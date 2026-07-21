---
'@aws-amplify/ui-react-storage': minor
---

feat(storage): folder download support in StorageBrowser

Enable downloading folders (and mixed file/folder selections) from the
`StorageBrowser` download action. Previously the download button was disabled
whenever the selection contained a folder.

Folders are expanded to their files at the view level before the download
runs: the `DownloadView` lists folder contents on open (with a "listing
folder contents" state), so the resolved files render as rows and the archive
is only dispatched once every selected folder is fully enumerated. Each file
preserves its folder-relative path inside the zip. A single-folder selection
names the archive after that folder; other selections use the longest common
ancestor directory of the downloaded files. Building on the service worker
streaming download, the zip transfer itself uses constant memory; folder
enumeration holds the file listing in memory and is capped at 5000 files per
download, above which the download is blocked with a message instead of
producing a truncated archive.

Also: individual expanded files can be removed from the pending download,
enumeration can be cancelled or retried, and empty/errored enumerations are
surfaced without starting a partial download.
