# Auth with Passwordless

This backend is configured manually via AWS Console and Amplify CLI as passwordless features are not supported by Amplify CLI/Admin UI.

- Authentication
  - `Email` login mechanism
  - Passwordless authentication methods:
    - Email OTP
    - SMS OTP
    - WebAuthn/Passkeys
  - Password authentication (traditional)
  - Preferred challenge: EMAIL_OTP

## Configuration

This environment uses a manually configured Cognito User Pool with passwordless authentication enabled.

## Setup Steps

This environment was created following the `auth-with-totp-mfa` example pattern:

1. Created Cognito User Pool manually with USER_AUTH flow support
2. Created Identity Pool and IAM roles
3. Initialized Amplify project and imported Cognito resources
4. Manually configured passwordless authentication in Cognito User Pool via AWS Console

## Using this Backend

Pull the existing configuration:

```shell
yarn pull
```

External contributors can re-create this backend by running:

```shell
amplify init
```
