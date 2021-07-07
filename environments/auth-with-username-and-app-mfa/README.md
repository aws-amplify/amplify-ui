# Auth with Username and App MFA

This backend is configured with Amplify Admin UI:

- Authentication

  - `Username` login mechanism

    ![Screenshot of username configuration w/ App MFA required](screenshot-login.png)

  - `Username` sign up attribute

    (This was defaulted by Admin UI, not explicitly set)

    ![Screenshot of username sign up attribute](screenshot-signup.png)

## Using this Backend

External contributors can re-create this backend by running:

```shell
amplify pull
```

Internal (Amplify UI team) contributors can use this backend directly by running:

```shell
amplify pull --appId d3e0nts0azvghs --envName staging --yes
```
