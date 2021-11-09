Feature: Sign Up with Attributes

  Amazon Congito User Pools allow for standard OAuth attributes to be required:
  > https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html
  These are automatically persisted to `aws-exports.js` and rendered by the Authenticator.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-up-with-attributes"

  @todo-angular @react @todo-vue
  Scenario: Login mechanism set to "username"
    Then I see "Username" as a "text" field
    And I see "Email" as an "email" field
    And I see "Phone Number" as a "tel" field

  @todo-angular @react @todo-vue
  Scenario: Sign Up screen does not have Address
    Then I don't see "Address"

  @todo-angular @react @todo-vue  
  Scenario: Sign Up screen has Birthdate
    Then I see "Birthdate" as a "date" field

  @todo-angular @react @todo-vue  
  Scenario: Sign Up screen has Email
    Then I see "Email" as an "email" field

  @todo-angular @react @todo-vue  
  Scenario: Sign Up screen has Family Name
    Then I see "Family Name" as a "text" field

  @todo-angular @react @todo-vue  
  Scenario: Sign Up screen has Middle Name
    Then I see "Middle Name" as a "text" field

  @todo-angular @react @todo-vue  
  Scenario: Sign Up screen does not have Gender
    Then I don't see "Gender"

  @todo-angular @react @todo-vue  
  Scenario: Sign Up screen does not have Locale
    Then I don't see "Locale"

  @todo-angular @react @todo-vue  
  Scenario: Sign Up screen has Given Name
    Then I see "Given Name" as a "text" field

  @todo-angular @react @todo-vue  
  Scenario: Sign Up screen has Name
    Then I see "Name" as a "text" field

  @todo-angular @react @todo-vue  
  Scenario: Sign Up screen has Nickname
    Then I see "Nickname" as a "text" field

  @todo-angular @react @todo-vue  
  Scenario: Sign Up screen has Phone Number
    Then I see "Phone Number" as a "tel" field

  @todo-angular @react @todo-vue  
  Scenario: Sign Up screen has Preferred Username
    Then I see "Preferred Username" as a "text" field

  @todo-angular @react @todo-vue  
  Scenario: Sign Up screen does not have Picture
    Then I don't see "Picture"

  @todo-angular @react @todo-vue  
  Scenario: Sign Up screen has Profile
    Then I see "Profile" as a "url" field

  @todo-angular @react @todo-vue  
  Scenario: Sign Up screen does not have Updated At
    Then I don't see "Updated At"

  @todo-angular @react @todo-vue  
  Scenario: Sign Up screen has Website
    Then I see "Website" as a "url" field

  @todo-angular @react @todo-vue  
  Scenario: Sign Up screen does not have Zone Info
    Then I don't see "Zone Info"

