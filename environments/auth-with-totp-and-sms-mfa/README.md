# Auth with TOTP and SMS MFA

This backend is configured with Amplify Admin UI:

- Authentication

  - `Cognito` MFA setup

    ![Screenshot of Cognito MFA setup](screenshot-mfa.png)

  - Requires `email` as the "username" when signing up and logging in

## Using this Backend

External contributors can re-create this backend by running:

```shell
amplify pull
```

Internal (Amplify UI team) contributors can use this backend directly by running:

```shell
amplify pull --appId d37ggz5w8y1r2k --envName staging --yes
```
