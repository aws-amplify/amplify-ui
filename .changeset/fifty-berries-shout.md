---
"@aws-amplify/ui-react-storage": patch
---

fix(storage): fix defaultFiles

Previously if you added `defaultFiles` to the StorageManager you would get weird behavior saying it was uploading when it actually wasn't. Also if you passed null or improper file objects you would get an error. 
