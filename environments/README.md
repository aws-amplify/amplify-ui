# Backend Environments

This folder contains a list of pre-built Amplify backends for use with manual & automated testing.

## Zero Configuration

These environments rely on `@aws-amplify/cli@latest` (v6.4.0+) to work.

## Using an Existing Backend Environment

For manual and end-to-end testing, example applications will use a particular backend environment by pulling the `aws-exports.js` file from the `environments/{BACKEND_ENVIRONMENT}/src` directory. To use an existing backend environment, please use the following instructions.

### External Contributors

1. You will need an AWS account and the Amplify CLI installed and configured to use your AWS profile. Follow the "[Amplify Getting Started: Prerequisites](https://docs.amplify.aws/start/getting-started/installation/q/integration/js)" tutorial to set up your AWS account and configure the Amplify CLI tool. _Note: Only follow the "Prerequisites" tutorial. Do not move on to the "Set up fullstack project" tutorial._
1. In a terminal, `cd` into the environment you want to use for testing your changes and initialize the environment using your own AWS account with `amplify init`. For example:
   ```shell
   cd environments/auth-with-email && amplify init
   ```
   - You will be asked a couple of questions by the `amplify` interactive prompt. For `Enter a name for the environment` and `Choose your default editor`, you can answer them as you prefer.
   - For `Select the authentication method you want to use`, select `AWS profile` and choose the profile you configured in step 1.
1. Run the following command to push up the local environment configuration to the environment you just initialized in your AWS account:
   ```shell
   amplify push
   ```
   - Answer `Yes` to the prompt `Are you sure you want to continue?`. This command may take several minutes to complete.
1. Run the following command to open the Amplify Admin UI to see your environment:
   ```shell
   amplify console
   ```
   - Answer `Amplify admin UI` to the prompt `Which site do you want to open?`. Your environment is now configured for local testing.
     _Note: Following the above steps may generate some changes in the environment's directory. You are safe to `git checkout` those changes._

## Creating a Backend Environment

When an existing backend doesn't match your needs (or requires changes), you can create a new backend via the [Amplify Admin](https://console.aws.amazon.com/amplify/home?region=us-east-1#/) or the [Amplify CLI](https://docs.amplify.aws/cli).

### With Admin UI

1. Open https://console.aws.amazon.com/amplify/home?region=us-east-1#/ and click "All apps":

   ![](screenshot.1.png)

1. Under "New app", click "Create app backend":

   ![](screenshot.2.png)

1. Enter a descriptive name for this environment (e.g. `auth-with-username`) and click "Confirm deployment":

   ![](screenshot.3.png)

1. Click "Open Admin UI":

   ![](screenshot.4.png)

1. Enable your backend categories.

   For [auth-with-username](auth-with-username), we clicked "Enable authentication":

   ![](screenshot.5.png)

1. Configure your category or categories:

   For [auth-with-username](auth-with-username), we added the `Username` login mechanism:

   ![](auth-with-username/screenshot.png)

1. Click "Save and deploy" then wait a few minutes:

   ![](screenshot.6.png)

1. Finally, you'll have "Local setup instructions" in the top-right:

   ```shell
   amplify pull --appId dbffpda9986p --envName staging
   ```

   ![](screenshot.7.png)

1. Next, in your terminal create a folder for this environment:

   ```shell
   cd environments

   # Change change this next line to match your app name
   mkdir auth-with-username
   cd $_
   ```

1. Run the `amplify pull ...` command from Admin UI:

   ```shell
   amplify pull --appId dbffpda9986p --envName staging --yes
   ```

   (Passing `--yes` will skip `amplify init` props and select defaults automatically)

🎉 You now have a local `amplify` & `src/aws-exports.js` environment!

### Committing a Backend Environment

After creating a new backend environment for local development, it can be useful to commit the configuration for future use in testing or collaboration.

1. First, create a `README.md` that describes what makes this backend unique ([example](auth-with-username/README.md))
1. Create a `package.json` file for the environment with a `yarn pull` script that uses the pull command from step 8 above:

   ```json
   // environments/auth-with-username/package.json
   {
     "private": true,
     "name": "my-custom-environment",
     "version": "0.0.1",
     "scripts": {
       "pull": "amplify pull --appId dbffpda9986p --envName staging"
     }
   }
   ```

   If your backend was created with the Amplify CLI, you'll need to enable Admin UI for it:

   1. Within the environment, run `amplify console` to view the Auth backend.
   1. Select the backend.
   1. Click `Set up admin UI`

      ![app settings screen](./screenshot.8.png)

   1. Toggle `Enable admin UI (All environments)` to `On`.
   1. Click `Open Admin UI`
   1. Finally, select `Local setup instructions` to get your `--appId` and `--envName`

1) Stage all changes in the new environment as you normally would and commit the changes:

   ```shell
   # Within environments/my-custom-environment:
   git add .

   # This will add `amplify`, `src`, and `.gitignore` generated by `amplify pull`
   git commit -m "Add my-custom-environment backend"
   ```
