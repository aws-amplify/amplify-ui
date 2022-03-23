---
"@aws-amplify/ui-react": minor
---

Adds the optional `hasMorePages` prop to the Pagination component

The reason this is necessary is because sometimes the totalPages count is unknown when pagination occurs at the API level.

Resulting conditions:

- Current behavior of totalPages prop stays the same, which determines the page numbers to show
- A new hasMorePages prop is added to Pagination component
- When hasMorePages is true, and the customer is at the end of the pages (e.g. 10 of 10), then the next button will NOT be disabled
- When hasMorePages is false, and the customer is at the end of the pages (e.g. 10 of 10), then the next button WILL be disabled
