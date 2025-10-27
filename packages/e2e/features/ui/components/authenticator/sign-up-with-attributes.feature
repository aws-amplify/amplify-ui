Feature: Sign Up with Attributes

  Amazon Congito User Pools allow for standard OAuth attributes to be required:
  > https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html
  These are automatically persisted to `aws-exports.js` and rendered by the Authenticator.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-up-with-attributes"

  @angular @react @vue @svelte @react-native
  Scenario: Login mechanism set to "username"
    Then I see "Username" as a "text" field
    Then I see "Email" as an "email" field
    Then I see "Phone Number" as a "tel" field

  @angular @react @vue @svelte @react-native
  Scenario: Sign Up screen does not have Address
    Then I don't see "Address"

  @angular @react @vue @svelte @react-native
  Scenario: Sign Up screen has Birthdate
    Then I see "Birthdate" as a "date" field

  @angular @react @vue @svelte @react-native
  Scenario: Sign Up screen has Email
    Then I see "Email" as an "email" field

  @angular @react @vue @svelte
  Scenario: Sign Up screen has Family Name
    Then I see "Family Name" as a "text" field

  @angular @react @vue @svelte @react-native
  Scenario: Sign Up screen has Middle Name
    Then I see "Middle Name" as a "text" field

  @angular @react @vue @svelte
  Scenario: Sign Up screen does not have Gender
    Then I don't see "Gender"

  @angular @react @vue @svelte @react-native
  Scenario: Sign Up screen does not have Locale
    Then I don't see "Locale"

  @angular @react @vue @svelte @react-native
  Scenario: Sign Up screen has Given Name
    Then I see "Given Name" as a "text" field

  @angular @react @vue @svelte @react-native
  Scenario: Sign Up screen has Name
    Then I see "Name" as a "text" field

  @angular @react @vue @svelte @react-native
  Scenario: Sign Up screen has Nickname
    Then I see "Nickname" as a "text" field

  @angular @react @vue @svelte @react-native
  Scenario: Sign Up screen has Phone Number
    Then I see "Phone Number" as a "tel" field

  @angular @react @vue @svelte @react-native
  Scenario: Sign Up screen has Preferred Username
    Then I see "Preferred Username" as a "text" field

  @angular @react @vue @svelte @react-native
  Scenario: Sign Up screen does not have Picture
    Then I don't see "Picture"

  @angular @react @vue @svelte @react-native
  Scenario: Sign Up screen has Profile
    Then I see "Profile" as a "url" field

  @angular @react @vue @svelte @react-native
  Scenario: Sign Up screen does not have Updated At
    Then I don't see "Updated At"

  @angular @react @vue @svelte @react-native
  Scenario: Sign Up screen has Website
    Then I see "Website" as a "url" field

  @angular @react @vue @svelte @react-native
  Scenario: Sign Up screen does not have Zone Info
    Then I don't see "Zone Info"

  @angular @react @vue @svelte
  Scenario: Sign In Force New Password screen has correct attributes
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }' with fixture "force-change-password-with-attributes"
    When I click the "Sign In" tab
    When I type my "username" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Website" as a "url" field
    Then I don't see "Updated At"
    Then I see "Profile" as a "url" field
    Then I don't see "Picture"
    Then I see "Preferred Username" as a "text" field
    Then I see "Phone Number" as a "tel" field
    Then I see "Nickname" as a "text" field
    Then I see "Name" as a "text" field
    Then I see "Given Name" as a "text" field
    Then I don't see "Locale"
    Then I don't see "Gender"
    Then I see "Middle Name" as a "text" field
    Then I see "Zone Info" as a "text" field
    Then I see "Family Name" as a "text" field
    Then I don't see "Address"
