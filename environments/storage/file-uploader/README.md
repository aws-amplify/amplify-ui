# File Uploader

This backend is configured with Amplify CLI:

```shell
amplify init
```

Name the application and select desired options.

- Storage

The storage/file-uploader environment provides an API for the File Uploader component through the Amazon S3 storage. You can configure your backend with Amplify S3 Storage through the following steps.

To begin you must first add the an Amplify Auth backend.

```shell
amplify add auth
? Do you want to use the default authentication and security configuration? Default configuration
? How do you want users to be able to sign in? Username
? Do you want to configure advanced settings?  No, I am done.
```

To deploy the service, run the push command:

```shell
amplify push
```

Next, you must add Amplify storage.

```shell
amplify add storage
? Please select from one of the below mentioned services (Use arrow keys)
❯ Content (Images, audio, video, etc.)
  NoSQL Database
```

The CLI will walk you though the options to enable Auth, if not enabled previously, and name your S3 bucket. To update your backend run:

```shell
amplify push
```
