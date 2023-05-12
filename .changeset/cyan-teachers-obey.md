---
'@aws-amplify/ui-react-storage': minor
---

What changed:

- Added exposed filesRef for the Storage Manager component.
- This allows for clearing of the files list from a separate component where the Storage Manager component is being used.

Why was the change made:

- There was no easy way to clear the list of files without unmounting the component.
- This capability is important when using Storage Manager inside a form. After submit, clear all entries including uploaded files.

How should a customer update their code:

- No changes are required by the customer since the added prop is optional in the Storage Manager component.
- If customers want to take advantage of this change, they can create a files ref and include it in the Storage Manager component, then made calls to clearFiles from the ref.
