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

Note: the default text for `CODE_ARRIVAL` now includes its trailing period
(`It may take a minute to arrive.`) so that terminal punctuation is owned by
the translation; every bundled locale provides the period-inclusive value.
