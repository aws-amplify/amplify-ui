# @aws-amplify/ui-angular

## Getting Started

Please see [CONTRIBUTING.md](../../../../CONTRIBUTING.md#aws-amplifyui-angular) to get started.

## Development Structure

```bash

projects/ui-angular/
├── src/ # contains src files for UI library code.
│   ├── lib/
│   |   ├── common/ # helpers, types, and constants
│   |   ├── components/ # helpers, types, and constants
|   |   |   ├── [COMPONENT-NAME]/ # Authenticator, ChatBot, S3, etc
|   |   |   |   ├── components/ # contains all composing Angular components
|   |   |   |   └── [COMPONENT-NAME].module.ts
|   |   └── directives/
|   |   └── primitives/
|   |   └── services/
├── legacy/ # contains re-expors of legacy web components
│   └── src/
│   └── package.json # required by ng-packagr to setup secondary entry points
└── package.json # name: `@aws-amplify/ui-angular`, private: false
                 # contains dependencies that library needs (e.g. xstate)

```
