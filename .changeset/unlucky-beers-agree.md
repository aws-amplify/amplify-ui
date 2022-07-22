---
"@aws-amplify/ui-react": patch
---

fix(ui-react): Collection search noResultsFound

As an Amplify UI app customer, when my search in a Collection component returns nothing, I should see the message "No results found" or custom text.

- When no results are returned, we render the text "No results found"
- Customer should be able to pass their own `ReactNode` for `noResultsfound`
- "No results found" should be translated into all of our currently supported languages
