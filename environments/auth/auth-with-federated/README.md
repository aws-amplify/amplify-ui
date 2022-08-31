# Auth with Facebook

This backend is configured with Amplify Admin UI:

- Authentication

      	- `Email` is a required attribute, if not using a social provider to sign in
      	- `Amazon`, `Facebook`, and `Google` are all supported to sign in with
      	- No screenshots are included as they contain secret IDs for the web apps

## Using this Backend

External contributors can re-create this backend by running:

```shell
amplify pull
```

Internal (Amplify UI team) contributors can use this backend directly by running:

- NOTE: do _not_ pass in the `--yes` flag, as that can sometimes cause issues with the CLI not recognizing certain existing environment variables

```shell
amplify pull --appId d1nsdyzry4zj8u --envName staging
```
