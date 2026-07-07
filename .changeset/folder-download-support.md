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
preserves its folder-relative path inside the zip, and the archive is named
after the longest common ancestor directory of the downloaded files. Building
on the service worker streaming download, arbitrarily large folders download
with constant memory.

Also: individual expanded files can be removed from the pending download,
enumeration can be cancelled or retried, and empty/errored enumerations are
surfaced without starting a partial download.
