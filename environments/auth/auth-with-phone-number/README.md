# Auth with Phone Number

This backend is configured with Amplify Admin UI:

- Authentication

  - `Phone Number` login mechanism

    ![SCreenshot of Phone Number configuration](screenshot-login.png)

  - `Preferred phone number` attribute

    (This was defaulted by Admin UI, not explicitly set)

    ![Screenshot of Preferred Phone Number attribute](screenshot-signup.png)

## Using this Backend

External contributors can re-create this backend by running:

```shell
amplify pull
```

Internal (Amplify UI team) contributors can use this backend directly by running:

```shell
amplify pull --appId d1eu44alh31kyw --envName staging --yes
```
