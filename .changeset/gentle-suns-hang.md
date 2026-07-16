---
'@aws-amplify/ui': patch
---

fix(ui): make Authenticator delivery message punctuation translation-owned (i18n)

`getDeliveryMessageText` appended hardcoded ASCII periods to translated
delivery messages, producing incorrect punctuation for non-Latin locales
(e.g. Japanese, which uses the ideographic full stop `。`, and Thai, which
uses none). Punctuation is now owned by each translation: `translate()`
accepts interpolation `values`, and composite `DELIVERY_MESSAGE_*` keys with
`{destination}`/`{arrivalMessage}` placeholders are added across all locale
dictionaries. English output is unchanged. Fixes #6966.
