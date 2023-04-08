# Liveness

This backend is configured with Amplify Admin UI:

- Authentication

  - `Email` login mechanism
  - Unauthenticated access is allowed

## Using this Backend

External contributors can re-create this backend by following the instructions in the [README.md](../README.md) file.

Internal (Liveness team) contributors can use this backend directly by:

### Prerequisites

- Have console-access to 413330344011(livenesssampleserverapp-app)

### Steps

1. Ensure you have the Amplify CLI tool installed as well as the internal `isengardcli` tool installed.
1. In a new terminal window, use `isengardcli` to assume the shared `livenesssampleserverapp-app` account and manually set your region to `us-east-1` and role to `Admin`:
   ```shell
   isengardcli assume livenesssampleserverapp-app --role Admin --region us-east-1
   ```
   This will configure a local AWS profile which uses temporary access keys from our shared `livenesssampleserverapp-app` account that can be used for accessing our shared environments.
1. From Isengard, navigate to 413330344011 Admin console or using [https://tiny.amazon.com/1k31d1u4c/IsenLink](https://tiny.amazon.com/1k31d1u4c/IsenLink)
1. Run the following command to pull the credentials
   ```shell
   yarn pull
   ```
1. Accept all the default settings
