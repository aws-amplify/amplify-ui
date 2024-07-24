# Auth with Flexible Attributes

This environment requires an email (username) attribute for login/signup, and allows all remaining attributes to be read/written to. This enables a flexible experience for testing attribute management, as all attributes are configured but not required.

## Using this Backend

External contributors can re-create this backend by running:

```shell
amplify init
```

in the environments/auth/auth-flexible-attributes directory.

If you'd like to make changes to the configuration, run:

```
amplify init
amplify update auth
```

Then, go through the manual configuration to select read/write attributes.
