# In-App Messaging with Pinpoint campaign

This backend is configured with Amplify CLI:

```shell
amplify init
```

You can configure your backend with Amplify In-App Messaging through the following steps:

```shell
amplify add notifications

? Choose the notification channel to enable: › In-App Messaging
```

The final Amplify In-App Messaging prompts can be configured to preference.

```shell
? Provide your pinpoint resource name: (inappmessaging)
```

Authentication for In-App Messaging can be configured for the backend environment to allow guest and unauthenticated users access to send analytics events. It can be added by following the CLI prompt

```shell
? Apps need authorization to send analytics events.
Do you want to allow guests and unauthenticated users to send analytics events?
(we recommend you allow this when getting started)  (Y/n) Y
```

Authentication can be configured to preference.

Run `amplify push` deploy the resource and update the In-App Messaging channel in the cloud. Pinpoint resources like Campaign can be set up at the url returned after running `amplify push`.
