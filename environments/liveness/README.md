# Liveness

This backend is configured with Amplify Admin UI:

- Authentication

  - `Email` login mechanism
  - Unauthenticated access is allowed

## Using this Backend

External contributors can re-create this backend by following the instructions in the [README.md](../README.md) file.

Internal (Liveness team) contributors can use this backend directly by:

1. Ensure you have the Amplify CLI tool installed as well as the internal `isengardcli` tool installed.
2. In a new terminal window, use `isengardcli` to assume the shared `rekognition-liveness-sdk-models-alpha` account and manually set your region to `us-east-1` and role to `Admin`:
   ```shell
   isengardcli assume rekognition-liveness-sdk-models-alpha --role Admin --region us-east-1
   ```
   This will configure a local AWS profile which uses temporary access keys from our shared `rekognition-liveness-sdk-models-alpha` account that can be used for accessing our shared environments.
3. Run the following command to pull the credentials
   ```shell
   yarn pull
   ```
