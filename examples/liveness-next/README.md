This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setup

Before starting, if you are running the sample app locally against the beta endpoint you can copy over the `.env.example` file to a `.env` file. This overrides the current prod liveness endpoint to the gamma endpoint which this sample app is allow listed for.

Also ensure that you have pulled down the liveness environment following instructions in the [README](https://github.com/aws-amplify/amplify-ui-staging/blob/289bec48abecfda3396ef0d4f5d1644cd05f7377/environments/liveness/README.md).

## Getting Started

First, get the credentials for a liveness account that has access to our CodeArtifact repo. You may need to request console access to the account. You will need these commands to run `yarn` or `yarn setup` in the root of the monorepo.

```bash
ada credentials update --account=081249381366 --provider=isengard --role=Admin --once #liveness-alpha
# or
isengardcli assume 081249381366
```

Afterwards, in the root of the monorepo run

```bash
yarn
yarn build
# or
yarn setup
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or in the root of the monorepo
yarn liveness-next-example dev
```

Open [http://localhost:3000/liveness-next-example](http://localhost:3000/liveness-next-example) with your browser to see the liveness example.

You can start editing the page by modifying `pages/index.page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
