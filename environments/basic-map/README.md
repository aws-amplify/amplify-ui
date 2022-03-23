# Basic Map

This backend is configured with Amplify CLI:

```shell
amplify init
```

Name the application and select desired options.

- Geo

  The Amplify Geo environment provides an API for the Map UI component through Amazon Location Service. You can configure your backend with Amplify Geo through the following steps:

  ```shell
  amplify add geo
  ? Select which capability you want to add: › Map (visualize the geospatial data)
  ```

  Amplify Geo requires authentication to be configured for the backend environment. It can be added by following the CLI prompt

  ```shell
  ? geo category resources require auth (Amazon Cognito). Do you want to add auth now? (Y/n) › Y
  ```

  Authentication can be configured to preference.

  The final Amplify Geo prompts can be configured to preference.

  ```shell
  ? Provide a name for the Map: › default
  ? Who can access this Map? › Authorized and Guest users
  ? Are you tracking commercial assets for your business in your app? › No, I do not track devices or I only need to track consumers' personal devices
  ? Do you want to configure advanced settings? (y/N) › N
  ```

## Using this Backend

External contributors can re-create this backend by running:

```shell
amplify pull
```

Internal (Amplify UI team) contributors can use this backend directly by running the following command from this environment's directory:

```shell
yarn pull
```
