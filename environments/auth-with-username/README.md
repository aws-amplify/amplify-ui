# Auth with Username

This backend is configured with Amplify Admin UI:

- Authentication

  - `Username` login mechanism

    ![SCreenshot of Username configuration](screenshot.png)

  - `Preferred Username` attribute

    (This was defaulted by Admin UI, not explicitly set)

    ![Screenshot of Preferred Username attribute](screenshot2.png)

## Using this Backend

External contributors can re-create this backend by running:

```shell
amplify pull
```

Internal (Amplify UI team) contributors can use this backend directly by running:

```shell
amplify pull --appId dbffpda9986dp --envName staging --yes
```
