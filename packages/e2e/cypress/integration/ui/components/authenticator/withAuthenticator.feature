@React
Feature: withAuthenticator

  `withAuthenticator` is an easy way to wrap your entire application with authentiation.

  ```js{1,9}
  import { withAuthenticator } from "@aws-amplify/ui-react"

  function App() {
  return (
  ...
  )
  }

  export default withAuthenticator(App)
  ```

  Example: Show the "Sign In" screen by default
    Given an application wrapped with withAuthenticator
    When I am not authenticated
    Then I see a "Sign In" button
