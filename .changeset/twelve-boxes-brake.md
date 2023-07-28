---
"@aws-amplify/ui": minor
"@aws-amplify/ui-react": minor
---

New component: Breadcrumbs!

A composable component for displaying breadcrumb navigation

```jsx
    <Breadcrumbs>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="/category">Category</Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>
        <Breadcrumbs.Link href="/category/type">Type</Breadcrumbs.Link>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item isCurrent>
        <Breadcrumbs.Link href="/category/type/item">Item</Breadcrumbs.Link>
      </Breadcrumbs.Item>
    </Breadcrumbs>
```
