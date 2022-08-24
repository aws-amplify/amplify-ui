# Auth with All Attributes

This environment allows users to sign in using a username, email, or phone number. Allowing users to sign in using multiple aliases requires configuring your `auth` backend using the Amplify CLI.

## Configuring the Backend

To configure your application's `auth` backend to allow multiple sign in aliases, follow these steps:

1. In your application's root directory, add authentication using the Amplify CLI:

   ```shell
   $ amplify --version
   # 6.1.0
   $ amplify init
   # Accept defaults
   $ amplify add auth
   ```

1. When prompted `Do you want to use the default authentication and security configuration?`,
   select `Default configuration`
1. When prompted `How do you want users to be able to sign in?`, select `Username`
1. When prompted `Do you want to configure advanced settings?`,
   select `Yes, I want to make some additional changes.`
1. When prompted `What attributes are required for signing up?`, select:

   - Address
   - Birthdate
   - Email
   - Family Name
   - Middle Name
   - Gender
   - Locale
   - Given Name
   - Name
   - Nickname
   - Phone Number
   - Preferred Username
   - Picture
   - Profile
   - Updated At
   - Website
   - Zone Info

1. When prompted `Do you want to enable any of the following capabilities?`, select none.

## Using this Backend

Follow the general instructions for internal and external contributors for [using an existing backend environment](../README.md#Using-an-Existing-Backend-Environment).
