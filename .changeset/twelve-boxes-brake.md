---
"@aws-amplify/ui": minor
"@aws-amplify/ui-react": minor
---

New component: Breadcrumbs!

A composable component for displaying breadcrumb navigation

```jsx
  <Breadcrumbs items={[
    {
      href: '/',
      label: 'Home'
    },
    {
      href: '/category',
      label: 'Category'
    },
    {
      href: '/category/type',
      label: 'Type'
    },
  ]} />
```

```jsx
  <Breadcrumbs.Container>
    {breadcrumbs.map(({ href, label }, idx) => {
      const isCurrent = breadcrumbs.length - 1 === idx;
      return (
        <Breadcrumbs.Item>
          <Breadcrumbs.Link isCurrent={isCurrent} href={href}>{label}</Breadcrumbs.Link>
          {isCurrent ? null : <Breadcrumbs.Separator>/</Breadcrumbs.Separator>}
        </Breadcrumbs.Item>
      )}
    )}
  </Breadcrumbs.Container>
```
