## Build System Tests

Build System Tests is to create Apps using different Frameworks, Built Tools with Amplify UI and run build test against them.

### Github Action

There are two Github workflows:

- Build System Test
- Build System Test React Native (runs less frequently because the tests take longer)

### Local

In this _build-system-tests_ folder, run

```sh
$ npm run <MEGA-APP-NAME>
```

Note:
We test different environments by changing the NodeJS versions and npm/yarn versions on Github Workflows, which need to be changed manually when testing on local.

To change the node versions

```sh
nvm install <VERSION-NUMBER> # if hasn't installed
nvm use <VERSION-NUMBER>
```

### Troubleshooting

- If see the following error message:

> “Your global Angular CLI version (14.2.11) is greater than your local version (12.2.18). The local Angular CLI version is used.”

It might be a @angular/cli@12.2.18 installed in root-folder _node_modules_. Deleting it would resolve the error.
