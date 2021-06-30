# Auth with Username (no attributes)

This backend is configured with Amplify CLI:

```shell
amplify init -y
```

- Authentication

  - `Username` login mechanism

    ```shell
    ❯ amplify add auth
    Using service: Cognito, provided by: awscloudformation

    The current configured provider is Amazon Cognito.

    Do you want to use the default authentication and security configuration? Default configuration
    Warning: you will not be able to edit these selections.
    How do you want users to be able to sign in? Username
    Do you want to configure advanced settings? No, I am done.
    ```

## Using this Backend

External contributors can re-create this backend by running:

```shell
amplify pull
```

Internal (Amplify UI team) contributors can use this backend directly by running:

```shell
amplify pull --appId d2zuq5rjkps8u4 --envName dev --yes
```
