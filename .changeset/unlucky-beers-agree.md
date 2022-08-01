---
"@aws-amplify/ui-react": minor
---

fix(ui-react): Collection searchNoResultsFound

When no results are returned from searching a Collection, we render the text "No results found" by default
- Customer also has the option of passing their own `ReactNode` to the new `searchNoResultsFound` prop

  <Collection
    isSearchable
    searchNoResultsFound={
      <Flex justifyContent="center">
        <Text color="purple.80" fontSize="1rem">
          Nothing found, please try again
        </Text>
      </Flex>
    }
  >
    {collectionItems}
  </Collection>
