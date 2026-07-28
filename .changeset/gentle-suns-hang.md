---
'@aws-amplify/ui': patch
---

fix(ui): render locale-correct punctuation in Authenticator delivery messages (i18n)

`getDeliveryMessageText` joined the translated delivery-message fragments with a
hardcoded ASCII period, producing incorrect punctuation for locales whose
sentence terminator differs — e.g. Japanese and Chinese (which use the
ideographic full stop `。`) and Thai (which uses none). The terminator is now
derived from the script of the surrounding translated copy, so each locale
renders its own punctuation.

This is an internal change with no public API impact: no translation keys are
added or changed, the `translate()` signature is unchanged, existing customer
vocabulary overrides on the documented keys keep working, and English output is
byte-identical. Fixes #6966.
