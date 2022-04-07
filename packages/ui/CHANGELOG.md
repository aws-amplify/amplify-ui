# @aws-amplify/ui

## 3.6.1

### Patch Changes

- [#1643](https://github.com/aws-amplify/amplify-ui/pull/1643) [`68cf0494f`](https://github.com/aws-amplify/amplify-ui/commit/68cf0494f15356af54ee5aa0b4749cdd9a104aca) Thanks [@wlee221](https://github.com/wlee221)! - Get user attributes after force-new-password is completed

* [#1625](https://github.com/aws-amplify/amplify-ui/pull/1625) [`e799d32a4`](https://github.com/aws-amplify/amplify-ui/commit/e799d32a4a298e526a3469ee813597a1d09dfd58) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Fix broken references in default theme and changing `defaultTheme` to be exported as `BaseTheme` type rather than `WebTheme` because we don't need to be using a `WebTheme` as it has extra stuff only the provider needs. If you want to get a defaultTheme of `WebTheme` type you can run `createTheme()`

- [#1625](https://github.com/aws-amplify/amplify-ui/pull/1625) [`e799d32a4`](https://github.com/aws-amplify/amplify-ui/commit/e799d32a4a298e526a3469ee813597a1d09dfd58) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Fix broken references in default theme and changing `defaultTheme` to be exported as `BaseTheme` type rather than `WebTheme` because we don't need to be using a `WebTheme` as it has extra stuff only the provider needs. If you want to get a defaultTheme of `WebTheme` type you can run `createTheme()`

## 3.6.0

### Minor Changes

- [#1629](https://github.com/aws-amplify/amplify-ui/pull/1629) [`ab9aef8f3`](https://github.com/aws-amplify/amplify-ui/commit/ab9aef8f329612abc2818db6b4477377aaa3ca62) Thanks [@ErikCH](https://github.com/ErikCH)! - Added new Geo components. Including the MapView and GeoCoder with documentation at https://ui.docs.amplify.aws/components/geo

* [#1598](https://github.com/aws-amplify/amplify-ui/pull/1598) [`992c5f6fb`](https://github.com/aws-amplify/amplify-ui/commit/992c5f6fb3eb3c1c5a9514029c4c17f53d8d7b5b) Thanks [@zchenwei](https://github.com/zchenwei)! - feat: adding determinate loader support

  **_Example:_**

  To use determinate loader, set `isDeterminate` to `true` and pass `percentage`

  ```jsx
  import * as React from 'react';
  import { Loader } from '@aws-amplify/ui-react';

  export const DeterminateLoaderExample = () => {
    const [percentage, setPercentage] = React.useState(0);
    React.useEffect(() => {
      const clearID = setInterval(() => {
        setPercentage((percentage) => {
          if (percentage < 100) {
            return percentage + 1;
          }
          return 0;
        });
      }, 1000);
      return () => clearInterval(clearID);
    }, []);
    return (
      <>
        <Loader percentage={percentage} isDeterminate />
        <Loader variation="linear" percentage={percentage} isDeterminate />
      </>
    );
  };
  ```

  To hide the percentage text, set `isPercentageTextHidden` to `true`

  ```jsx
  import { Loader } from '@aws-amplify/ui-react';

  export const LoaderIsPercentageTextHiddenExample = () => {
    return <Loader percentage={60} isDeterminate isPercentageTextHidden />;
  };
  ```

## 3.5.1

### Patch Changes

- [#1628](https://github.com/aws-amplify/amplify-ui/pull/1628) [`ff74c1d1c`](https://github.com/aws-amplify/amplify-ui/commit/ff74c1d1cab859d977dfc0638f0193af842d2bbd) Thanks [@reesscot](https://github.com/reesscot)! - Revert Geo package release

## 3.5.0

### Minor Changes

- [#1607](https://github.com/aws-amplify/amplify-ui/pull/1607) [`4d0a8424e`](https://github.com/aws-amplify/amplify-ui/commit/4d0a8424e2592be52a59e610f0eb1068c6ab0d5a) Thanks [@ErikCH](https://github.com/ErikCH)! - Added new Geo components. Including the MapView and GeoCoder with documentation at https://ui.docs.amplify.aws/components/geo

### Patch Changes

- [#1617](https://github.com/aws-amplify/amplify-ui/pull/1617) [`e20720a89`](https://github.com/aws-amplify/amplify-ui/commit/e20720a894ccb2cfcc7ede7160299e082ec76fd2) Thanks [@hbuchel](https://github.com/hbuchel)! - fix: remove double border on TextField outer components

* [#1608](https://github.com/aws-amplify/amplify-ui/pull/1608) [`4dee728f2`](https://github.com/aws-amplify/amplify-ui/commit/4dee728f25735ce8bc8793806a395dfcee579522) Thanks [@reesscot](https://github.com/reesscot)! - Remove sourcemaps from rollup build

## 3.4.1

### Patch Changes

- [#1600](https://github.com/aws-amplify/amplify-ui/pull/1600) [`c00b0f016`](https://github.com/aws-amplify/amplify-ui/commit/c00b0f0161f4df56c3d2ec75ffe0d2975bb859ac) Thanks [@ErikCH](https://github.com/ErikCH)! - Fixed bug that made the input on the Setup TOTP to display twice

## 3.4.0

### Minor Changes

- [#1569](https://github.com/aws-amplify/amplify-ui/pull/1569) [`6d3981c4a`](https://github.com/aws-amplify/amplify-ui/commit/6d3981c4a26721361e4461d206b0b37d72d67dbd) Thanks [@zchenwei](https://github.com/zchenwei)! - build: setting up Rollup for bundling

  Both `@aws-amplify/ui-react` and `@aws-amplify/ui` cannot be tree shaken before because we bundle it in a wrong way. With `preserveModule` in Rollup, we make them tree-shakeble friendly.

  With webpack, we can see tree shaking is taking effect now

  ```jsx
  // index.tsx
  import * as React from 'react';
  import ReactDOM from 'react-dom';
  import '@aws-amplify/ui-react/styles.css';

  import { App } from './App';

  ReactDOM.render(<App />, document.getElementById('root'));

  // App.tsx
  import * as React from 'react';
  import { Loader } from '@aws-amplify/ui-react';

  export const App = () => {
    return <Loader />;
  };
  ```

  main.js size
  | Before | After |
  | ----------- | ----------- |
  | 1.7M | 161.1k |

### Patch Changes

- [#1580](https://github.com/aws-amplify/amplify-ui/pull/1580) [`1ac9cda71`](https://github.com/aws-amplify/amplify-ui/commit/1ac9cda712dc7eb7bc7293999340e05059648c93) Thanks [@wlee221](https://github.com/wlee221)! - fix(authenticator): look for current user on routed apps whenever app refreshes

* [#1588](https://github.com/aws-amplify/amplify-ui/pull/1588) [`d47da90a6`](https://github.com/aws-amplify/amplify-ui/commit/d47da90a68d936e2cc22a972a876ef10aca0eaf3) Thanks [@0618](https://github.com/0618)! - fix authenticator modal layout position

## 3.3.2

### Patch Changes

- [#1544](https://github.com/aws-amplify/amplify-ui/pull/1544) [`7910c04b5`](https://github.com/aws-amplify/amplify-ui/commit/7910c04b55cb32e3e8a70c3966f509ea43a0dc64) Thanks [@wlee221](https://github.com/wlee221)! - refactor(xstate): Use named actions instead of inline actions. No TS runtime / type changes.

* [#1545](https://github.com/aws-amplify/amplify-ui/pull/1545) [`30e3155ac`](https://github.com/aws-amplify/amplify-ui/commit/30e3155ac70d3f82c00da562332ce701ade45817) Thanks [@wlee221](https://github.com/wlee221)! - Bump xstate to `^4.30.6`

## 3.3.1

### Patch Changes

- [#1484](https://github.com/aws-amplify/amplify-ui/pull/1484) [`8b72277ab`](https://github.com/aws-amplify/amplify-ui/commit/8b72277ab8bd7ad64fa298a9d509572318ac8db2) Thanks [@wlee221](https://github.com/wlee221)! - refactor: share default form fields generation logic

* [#1484](https://github.com/aws-amplify/amplify-ui/pull/1484) [`8b72277ab`](https://github.com/aws-amplify/amplify-ui/commit/8b72277ab8bd7ad64fa298a9d509572318ac8db2) Thanks [@wlee221](https://github.com/wlee221)! - Default `labelHidden` to false. This can be adjusted in a later PR for better UX.

- [#1514](https://github.com/aws-amplify/amplify-ui/pull/1514) [`5ca96c4a8`](https://github.com/aws-amplify/amplify-ui/commit/5ca96c4a81722aca00caecb35dc98d17588c6ff1) Thanks [@amirHossein-Ebrahimi](https://github.com/amirHossein-Ebrahimi)! - feat: Add repository information to UI packages

* [#1522](https://github.com/aws-amplify/amplify-ui/pull/1522) [`1e9c6c031`](https://github.com/aws-amplify/amplify-ui/commit/1e9c6c031b1e5401c456365f0ff3187ed35c6f22) Thanks [@wlee221](https://github.com/wlee221)! - Fix phone number label in reset-password

## 3.3.0

### Minor Changes

- [#1492](https://github.com/aws-amplify/amplify-ui/pull/1492) [`0bfe79caa`](https://github.com/aws-amplify/amplify-ui/commit/0bfe79caa63b037c1c9633c240b35203799f2fab) Thanks [@ErikCH](https://github.com/ErikCH)! - Added new password complexity errors that will show during sign up. Based on the zero-config

### Patch Changes

- [#1496](https://github.com/aws-amplify/amplify-ui/pull/1496) [`ebcc7e610`](https://github.com/aws-amplify/amplify-ui/commit/ebcc7e610fda12f74ba6c5bd6dda89bc4849b898) Thanks [@enes-sahin](https://github.com/enes-sahin)! - Add Turkish as supported language to Authenticator

## 3.2.1

### Patch Changes

- [#1474](https://github.com/aws-amplify/amplify-ui/pull/1474) [`05a1fa3c3`](https://github.com/aws-amplify/amplify-ui/commit/05a1fa3c3970f04bb87a336aafe87cf3f1946107) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Adding `labelPosition` to Radio and RadioGroupField

  ```jsx
  <RadioGroupField label="Language" name="language" labelPosition="start">
    <Radio value="html">html</Radio>
    <Radio value="css">css</Radio>
    <Radio value="javascript">javascript</Radio>
  </RadioGroupField>
  ```

* [#1483](https://github.com/aws-amplify/amplify-ui/pull/1483) [`b97cb9126`](https://github.com/aws-amplify/amplify-ui/commit/b97cb91264d03eed0ce248909708eed112eb9aec) Thanks [@0618](https://github.com/0618)! - - fix a11y erros on docs homepage
  - fix type errors
  - rename css class

- [#1472](https://github.com/aws-amplify/amplify-ui/pull/1472) [`ef5dff599`](https://github.com/aws-amplify/amplify-ui/commit/ef5dff599b84dd4b508827264758b11439684142) Thanks [@wlee221](https://github.com/wlee221)! - Set confirmation code input types to `"number"`

* [#1469](https://github.com/aws-amplify/amplify-ui/pull/1469) [`3c0b705e3`](https://github.com/aws-amplify/amplify-ui/commit/3c0b705e3c5eb25a80bea077a6c60a52dc7ffa51) Thanks [@wlee221](https://github.com/wlee221)! - Capitalize form field related types. No actual runtime changes.

- [#1471](https://github.com/aws-amplify/amplify-ui/pull/1471) [`9e8d6b212`](https://github.com/aws-amplify/amplify-ui/commit/9e8d6b212bdbc324b75066d664b6adb1ef46163d) Thanks [@wlee221](https://github.com/wlee221)! - Cleaned up `@aws-amplify/ui` util directory. No actual code changes.

## 3.2.0

### Minor Changes

- [#1394](https://github.com/aws-amplify/amplify-ui/pull/1394) [`3d5acaa4c`](https://github.com/aws-amplify/amplify-ui/commit/3d5acaa4cce5ea8daf49caab71d92dc3c91d9021) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Adding `label` prop to Divider component.

  ```jsx
  import { Flex, Text, Divider } from '@aws-amplify/ui-react';

  export const LabelExample = () => (
    <Flex direction="column">
      <Text>Before</Text>
      <Divider label="OR" />
      <Text>After</Text>
    </Flex>
  );
  ```

### Patch Changes

- [#1439](https://github.com/aws-amplify/amplify-ui/pull/1439) [`5f1753785`](https://github.com/aws-amplify/amplify-ui/commit/5f175378571e56c1f59bfa39060337148f428ce2) Thanks [@artidata](https://github.com/artidata)! - Added Indonesian translation.

* [#1466](https://github.com/aws-amplify/amplify-ui/pull/1466) [`4c1a5cfbe`](https://github.com/aws-amplify/amplify-ui/commit/4c1a5cfbe6e984a790261d122ee4df368b249688) Thanks [@0618](https://github.com/0618)! - centralize authenticator on example

- [#1407](https://github.com/aws-amplify/amplify-ui/pull/1407) [`731587a58`](https://github.com/aws-amplify/amplify-ui/commit/731587a58e8ef89e9f0193d7118377093a6024b8) Thanks [@0618](https://github.com/0618)! - fix authenticator SetupTOTP, refactor authenticator styles

* [#1447](https://github.com/aws-amplify/amplify-ui/pull/1447) [`3343e187b`](https://github.com/aws-amplify/amplify-ui/commit/3343e187b6dc9eab2c2a9c2d408bac8afb063f74) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Fixing nested AmplifyProviders and theming. This fixes issues seen on the docs site if you have nested AmplifyProviders causing weird issues. The provider now cleans itself up properly and only injects CSS if necessary.

## 3.1.0

### Minor Changes

- [#1389](https://github.com/aws-amplify/amplify-ui/pull/1389) [`57f1441e4`](https://github.com/aws-amplify/amplify-ui/commit/57f1441e4809218a813148d0942de8171d159831) Thanks [@ErikCH](https://github.com/ErikCH)! - Added new formfields prop that allows more customization of inputs and setup TOTP.
  New docs can be found at https://ui.docs.amplify.aws/components/authenticator#form-field-customization

### Patch Changes

- [#1415](https://github.com/aws-amplify/amplify-ui/pull/1415) [`74e066622`](https://github.com/aws-amplify/amplify-ui/commit/74e066622e9abe26e9f9427f6bdc82c4e14d4952) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Fixing checkbox `labelPosition` to position the label correctly. Now `labelPosition="start"` actually means _start_.

* [#1417](https://github.com/aws-amplify/amplify-ui/pull/1417) [`5b3b8479a`](https://github.com/aws-amplify/amplify-ui/commit/5b3b8479aea06c6b7df031dc6493abdd36b0bd6a) Thanks [@wlee221](https://github.com/wlee221)! - Fix undefined reference in reset password flow

## 3.0.15

### Patch Changes

- [#1360](https://github.com/aws-amplify/amplify-ui/pull/1360) [`fbfcd04d3`](https://github.com/aws-amplify/amplify-ui/commit/fbfcd04d36753a69d24d5576736a9082f1a66dbe) Thanks [@0618](https://github.com/0618)! - fix: menu dropdown style in dark mode by adding border

* [#1368](https://github.com/aws-amplify/amplify-ui/pull/1368) [`c57a02349`](https://github.com/aws-amplify/amplify-ui/commit/c57a02349376b4fea82bc9f854971445aa01c676) Thanks [@zchenwei](https://github.com/zchenwei)! - style: cleaning up sr-only class

- [#1366](https://github.com/aws-amplify/amplify-ui/pull/1366) [`e73e0276f`](https://github.com/aws-amplify/amplify-ui/commit/e73e0276f8b1707cd01e24d55bd023b4a2347625) Thanks [@wlee221](https://github.com/wlee221)! - Pass `formData` to `submitForm` event on submit. This will ensure any default form values are submitted to Cognito, without relying on `CHANGE` events.

* [#1347](https://github.com/aws-amplify/amplify-ui/pull/1347) [`929cb8f76`](https://github.com/aws-amplify/amplify-ui/commit/929cb8f768d9a95b3854d7fa87b08a83af72c96c) Thanks [@wlee221](https://github.com/wlee221)! - Store actor transition data in context

## 3.0.14

### Patch Changes

- [#1328](https://github.com/aws-amplify/amplify-ui/pull/1328) [`722e2a932`](https://github.com/aws-amplify/amplify-ui/commit/722e2a93263478aed2a9aee872ab1fcbc86b41ca) Thanks [@ErikCH](https://github.com/ErikCH)! - Fixed bug where "Back to sign in" was not working on force new password page

* [#1348](https://github.com/aws-amplify/amplify-ui/pull/1348) [`4c6d198e4`](https://github.com/aws-amplify/amplify-ui/commit/4c6d198e409d46eef37b88b2327132b4a5dbe425) Thanks [@Jesmaster](https://github.com/Jesmaster)! - Lowered priority of visited link style for link component

- [#1313](https://github.com/aws-amplify/amplify-ui/pull/1313) [`38cdf38e4`](https://github.com/aws-amplify/amplify-ui/commit/38cdf38e473853ba93ffb22a1d9252286a7d2a6f) Thanks [@franscal7](https://github.com/franscal7)! - chore: add missing es translations

## 3.0.13

### Patch Changes

- [#1296](https://github.com/aws-amplify/amplify-ui/pull/1296) [`f9bb30efd`](https://github.com/aws-amplify/amplify-ui/commit/f9bb30efd4c0a384162fbcef22d4b5bccec62dc5) Thanks [@ErikCH](https://github.com/ErikCH)! - Fixed bug where attributes were not being added for SMS/MFA logins

* [#1268](https://github.com/aws-amplify/amplify-ui/pull/1268) [`7c81bacdf`](https://github.com/aws-amplify/amplify-ui/commit/7c81bacdfdc71d71843b8a7285e513e09e9842cb) Thanks [@th3oxen](https://github.com/th3oxen)! - Improve IT translation accuracy

- [#1297](https://github.com/aws-amplify/amplify-ui/pull/1297) [`4e19822e4`](https://github.com/aws-amplify/amplify-ui/commit/4e19822e4d995d4cb3b3ad23090a161249806939) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Updating line-heights in controls (fields and buttons) to be consistent and adding a simple CSS reset.
  This will also give some default line-height to all components by default.

* [#1299](https://github.com/aws-amplify/amplify-ui/pull/1299) [`b4254e58a`](https://github.com/aws-amplify/amplify-ui/commit/b4254e58ac3473bd141e48b3a553c632a84fab5c) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Tweaks to default headings theme

## 3.0.12

### Patch Changes

- [#1151](https://github.com/aws-amplify/amplify-ui/pull/1151) [`f7d86db6d`](https://github.com/aws-amplify/amplify-ui/commit/f7d86db6dbd3af650ce4c64e6efbc5acb4523e78) Thanks [@reesscot](https://github.com/reesscot)! - fix: change box-sizing to have less specificity

* [#1230](https://github.com/aws-amplify/amplify-ui/pull/1230) [`b824136bf`](https://github.com/aws-amplify/amplify-ui/commit/b824136bfb288df0f3300421f73f9bfdcd61bf57) Thanks [@wlee221](https://github.com/wlee221)! - Pin xstate to `4.28.0`

- [#1251](https://github.com/aws-amplify/amplify-ui/pull/1251) [`2913fe8cb`](https://github.com/aws-amplify/amplify-ui/commit/2913fe8cb35e08ad6c61121dfb9d12b4ae9cf6ad) Thanks [@joebuono](https://github.com/joebuono)! - Pin all dependencies

## 3.0.11

### Patch Changes

- [#1224](https://github.com/aws-amplify/amplify-ui/pull/1224) [`4932b43f8`](https://github.com/aws-amplify/amplify-ui/commit/4932b43f8f3ad5d851a4fd8635b1b92abf6c4ef0) Thanks [@wlee221](https://github.com/wlee221)! - Pin xstate versions

## 3.0.10

### Patch Changes

- [#1153](https://github.com/aws-amplify/amplify-ui/pull/1153) [`3afdc1fc9`](https://github.com/aws-amplify/amplify-ui/commit/3afdc1fc9a876a17403ccfc607b922ec352fd1cf) Thanks [@wlee221](https://github.com/wlee221)! - Listen to Auth Hub events

## 3.0.9

### Patch Changes

- [#1157](https://github.com/aws-amplify/amplify-ui/pull/1157) [`6c070b2e1`](https://github.com/aws-amplify/amplify-ui/commit/6c070b2e118560dec9629c7c0abdfb218d53267c) Thanks [@eli6](https://github.com/eli6)! - Added Swedish as supported language to Authenticator

* [#1162](https://github.com/aws-amplify/amplify-ui/pull/1162) [`e0fcf3685`](https://github.com/aws-amplify/amplify-ui/commit/e0fcf3685164075fe385f8e09247f9620a7e6ccc) Thanks [@wlee221](https://github.com/wlee221)! - Add explicit `INIT` step for initializing authMachine

- [#1184](https://github.com/aws-amplify/amplify-ui/pull/1184) [`3a69c2a75`](https://github.com/aws-amplify/amplify-ui/commit/3a69c2a752b9ab07bb55911cae6447dccd76cc1f) Thanks [@slaymance](https://github.com/slaymance)! - Update phone number parsing in Authenticator state machine

## 3.0.8

### Patch Changes

- [#1166](https://github.com/aws-amplify/amplify-ui/pull/1166) [`c5cc41a70`](https://github.com/aws-amplify/amplify-ui/commit/c5cc41a70d7c0de4b2dcae385f7661361455e7b6) Thanks [@wlee221](https://github.com/wlee221)! - Thanks @Ashafix! -- added missing German translations; sorted English translations

## 3.0.7

### Patch Changes

- [#1103](https://github.com/aws-amplify/amplify-ui/pull/1103) [`1d5b84ac8`](https://github.com/aws-amplify/amplify-ui/commit/1d5b84ac828b962648e9b8600ed96297b1eb0c2a) Thanks [@zchenwei](https://github.com/zchenwei)! - fix: fixing unaligned border outlines between `CountryCodeSelect` and `TextField` on `PhoneNumberField`

* [#1077](https://github.com/aws-amplify/amplify-ui/pull/1077) [`9a095ae46`](https://github.com/aws-amplify/amplify-ui/commit/9a095ae46ee6639f7c8fe9a3a7b2b871449867b8) Thanks [@reesscot](https://github.com/reesscot)! - Fix media query logic to return correct breakpoint

- [#1088](https://github.com/aws-amplify/amplify-ui/pull/1088) [`a2fa3603e`](https://github.com/aws-amplify/amplify-ui/commit/a2fa3603eda90a67c9a092ce170e86d13a152e18) Thanks [@wlee221](https://github.com/wlee221)! - Remove trailing space on "Forgot your password? "

* [#1110](https://github.com/aws-amplify/amplify-ui/pull/1110) [`87af74164`](https://github.com/aws-amplify/amplify-ui/commit/87af74164fb87b61d3c897b03af6e15cf73de79d) Thanks [@zchenwei](https://github.com/zchenwei)! - fix: fixing `option` background color in darkmode on Firefox

- [#1127](https://github.com/aws-amplify/amplify-ui/pull/1127) [`352a28197`](https://github.com/aws-amplify/amplify-ui/commit/352a281970f2568e7ea035cc89fb51afa31cbfc4) Thanks [@wlee221](https://github.com/wlee221)! - Removed unused Amplify auth import in reset password actor

## 3.0.6

### Patch Changes

- [#996](https://github.com/aws-amplify/amplify-ui/pull/996) [`5bfe1e599`](https://github.com/aws-amplify/amplify-ui/commit/5bfe1e5996536f8b5ada60e16db565dd8fb52f26) Thanks [@rvmourik](https://github.com/rvmourik)! - Add dutch translation

* [#1065](https://github.com/aws-amplify/amplify-ui/pull/1065) [`86e70f8e8`](https://github.com/aws-amplify/amplify-ui/commit/86e70f8e8486e70cccc23d04754e435b184915e8) Thanks [@reesscot](https://github.com/reesscot)! - Fix issue where custom theme fonts are ignored

- [#1014](https://github.com/aws-amplify/amplify-ui/pull/1014) [`43634b06a`](https://github.com/aws-amplify/amplify-ui/commit/43634b06aaccb1cf33cb18e0e142aee91df54aad) Thanks [@reesscot](https://github.com/reesscot)! - Fix issue where phone_number validation fails on multiple signup submissions

* [#997](https://github.com/aws-amplify/amplify-ui/pull/997) [`d8a422d7c`](https://github.com/aws-amplify/amplify-ui/commit/d8a422d7ce4c62a216a19d127907a2b80eb588ab) Thanks [@ErikCH](https://github.com/ErikCH)! - Updated Xstate so users who are in the FORCE CHANGE PASSWORD state also check for setup TOTP MFA.

- [#1004](https://github.com/aws-amplify/amplify-ui/pull/1004) [`f9a09df7c`](https://github.com/aws-amplify/amplify-ui/commit/f9a09df7cded5bae1681bc138c048786f3bb75bc) Thanks [@Domino987](https://github.com/Domino987)! - Add missing Confirm Password translation for German language

## 3.0.5

### Patch Changes

- [#986](https://github.com/aws-amplify/amplify-ui/pull/986) [`63f773ee2`](https://github.com/aws-amplify/amplify-ui/commit/63f773ee2af1f55f1891794c1de1398e3eb47d93) Thanks [@ErikCH](https://github.com/ErikCH)! - Added additional conditional that checks if user has an SMS_MFA challenge question after FORCE_CHANGE_PASSWORD occurs

* [#975](https://github.com/aws-amplify/amplify-ui/pull/975) [`88b15eb9a`](https://github.com/aws-amplify/amplify-ui/commit/88b15eb9aa608b58ca84fbf60e1beba8090f32e2) Thanks [@ErikCH](https://github.com/ErikCH)! - Added new services to override handleSignup, handleSignIn, handleConfirmSignIn, handleConfirmSignUp, handleForgotPasswordSubmit, handleForgotPassword

## 3.0.4

### Patch Changes

- [#902](https://github.com/aws-amplify/amplify-ui/pull/902) [`72b543ded`](https://github.com/aws-amplify/amplify-ui/commit/72b543ded4c37325a0eb1e4a4803aa88d6d73d5d) Thanks [@hvergara](https://github.com/hvergara)! - Fix Spanish translation

* [#910](https://github.com/aws-amplify/amplify-ui/pull/910) [`96830f6a3`](https://github.com/aws-amplify/amplify-ui/commit/96830f6a34a417aa9bc6329c839679bd10da84f0) Thanks [@ErikCH](https://github.com/ErikCH)! - Added text to confirm sign up page, so user knows where code was delivered.

- [#912](https://github.com/aws-amplify/amplify-ui/pull/912) [`f447ec75a`](https://github.com/aws-amplify/amplify-ui/commit/f447ec75ac839195c6c5709987ef734f40dc5c76) Thanks [@wlee221](https://github.com/wlee221)! - Fix height jumps between screens and tabs

* [#890](https://github.com/aws-amplify/amplify-ui/pull/890) [`712edfccc`](https://github.com/aws-amplify/amplify-ui/commit/712edfccc77a71542166431ba79b25a31d0dca80) Thanks [@wlee221](https://github.com/wlee221)! - fix(angular): Add first class support for `strict: true`

- [#926](https://github.com/aws-amplify/amplify-ui/pull/926) [`f1c2d82db`](https://github.com/aws-amplify/amplify-ui/commit/f1c2d82db913be13425e8b4476983d7cf6f55c40) Thanks [@wlee221](https://github.com/wlee221)! - Provide helpful message for NoUserPool Error

## 3.0.3

### Patch Changes

- [#828](https://github.com/aws-amplify/amplify-ui/pull/828) [`5d115786c`](https://github.com/aws-amplify/amplify-ui/commit/5d115786c23ce6292842467b4417b26a15f60cb5) Thanks [@strugman](https://github.com/strugman)! - Add Polish to Authenticator i18n module

* [#861](https://github.com/aws-amplify/amplify-ui/pull/861) [`b21e3e3cb`](https://github.com/aws-amplify/amplify-ui/commit/b21e3e3cb6688238a513f8b125d3be36145dadca) Thanks [@zchenwei](https://github.com/zchenwei)! - Forward ref support for TableRow, Tabs, ToggleButton & ToggleButtonGroup

- [#882](https://github.com/aws-amplify/amplify-ui/pull/882) [`4a12ed4f5`](https://github.com/aws-amplify/amplify-ui/commit/4a12ed4f580f852de2558ec3fcf0da152f74dbd5) Thanks [@AbhishekDesai99](https://github.com/AbhishekDesai99)! - Authenticator component translations support for Portuguese language

* [#901](https://github.com/aws-amplify/amplify-ui/pull/901) [`907cd18df`](https://github.com/aws-amplify/amplify-ui/commit/907cd18df6213d432a4b3c5d18c848717e3703e4) Thanks [@wlee221](https://github.com/wlee221)! - Add korean translations

- [#858](https://github.com/aws-amplify/amplify-ui/pull/858) [`cc4a328a4`](https://github.com/aws-amplify/amplify-ui/commit/cc4a328a4f93888a968c9c51382752998549d917) Thanks [@ErikCH](https://github.com/ErikCH)! - Updated the password validation logic, so errors are only display on blur, or when six or more characters is typed for both the confirm password and password fields.

## 3.0.2

### Patch Changes

- [#866](https://github.com/aws-amplify/amplify-ui/pull/866) [`473f1db6c`](https://github.com/aws-amplify/amplify-ui/commit/473f1db6c42c8221f369e8cdbf6bdd307d09220f) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Making size prop on slider field work like other fields and adding disabled styling.

* [#844](https://github.com/aws-amplify/amplify-ui/pull/844) [`e77e47fe5`](https://github.com/aws-amplify/amplify-ui/commit/e77e47fe5872961bb70d53bfb54f95d5a9d89ef4) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Fixing default SwitchField styles so the background color shows up.

- [#850](https://github.com/aws-amplify/amplify-ui/pull/850) [`9d7907ec4`](https://github.com/aws-amplify/amplify-ui/commit/9d7907ec44b130e3610c3518e188806b5fe06eec) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Updating radio styles to be consistent with checkbox field.

* [#854](https://github.com/aws-amplify/amplify-ui/pull/854) [`81c7d5525`](https://github.com/aws-amplify/amplify-ui/commit/81c7d5525bdf19a35d66757b94038144046c8046) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Updating quiet variation of stepper field

- [#842](https://github.com/aws-amplify/amplify-ui/pull/842) [`97ca4e48f`](https://github.com/aws-amplify/amplify-ui/commit/97ca4e48f4d7f73e842072e63d3dcd39d5f983d8) Thanks [@zchenwei](https://github.com/zchenwei)! - ForwardRef support for Alert, ButtonGroup, Expander & ExpanderItem

* [#878](https://github.com/aws-amplify/amplify-ui/pull/878) [`5c4935411`](https://github.com/aws-amplify/amplify-ui/commit/5c49354115c06e05e4f9ad50d3d66f8fcb86a7ca) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Updating text colors for better contrast

- [#819](https://github.com/aws-amplify/amplify-ui/pull/819) [`c41c6fad1`](https://github.com/aws-amplify/amplify-ui/commit/c41c6fad138269dc72bec682bf7e15341d09ec8a) Thanks [@strugman](https://github.com/strugman)! - Fixed 'RESET_PASSWORD' translation

## 3.0.1

### Patch Changes

- [#829](https://github.com/aws-amplify/amplify-ui/pull/829) [`9fd90d45b`](https://github.com/aws-amplify/amplify-ui/commit/9fd90d45b01a38ee6d78f0cb67238b210750115c) Thanks [@wlee221](https://github.com/wlee221)! - Fix redirect from signIn to confirmSignUp

## 3.0.0

### Major Changes

- [#747](https://github.com/aws-amplify/amplify-ui/pull/747) [`81169c66e`](https://github.com/aws-amplify/amplify-ui/commit/81169c66ed9591497214860ac95f69504edea1b0) Thanks [@wlee221](https://github.com/wlee221)! - New primitive components and theming API

  Amplify UI is building primitive components like badges, cards, alerts, etc. These primitive components will first be available on React with the goal of adding support for more frameworks in the future. We hope these primitives will empower developers to build applications faster. We plan on building out more connected components like the Authenticator and we need primitive components like buttons and inputs to be shared across them. Exposing these primitive components allows developers to create and theme applications end-to-end using the same components everywhere.

  _See: [RFC: Amplify UI Primitive Components](https://github.com/aws-amplify/amplify-ui/discussions/198)_

  ## Goals

  **Flexible** – Primitives can be integrated into as many applications as possible.
  **Customizable** – Primitives can be composed and styled using a theme, CSS, a CSS-in-JS framework, or un-styled.
  **Accessible** – Primitives follow WCAG and WAI-ARIA guidelines to make building accessible applications easy.
  Basic

  ## Implementation

  - Added 37 new React primitive components such as Button, TextField, Alert that are the building blocks to create consistency across connected components.
  - Added Theming API to allow global and component-override theming. Theme structure uses design tokens including borderWidth, colors, fonts, fontSizes, fontWeights, LineHeights, opacities and breakpoints.
  - Documentation: https://ui.docs.amplify.aws/components

- [#745](https://github.com/aws-amplify/amplify-ui/pull/745) [`3ead9c629`](https://github.com/aws-amplify/amplify-ui/commit/3ead9c62960c052967376b22922908dbe57bddaa) Thanks [@wlee221](https://github.com/wlee221)! - Zero-Configuration Authenticator for Angular, React, & Vue

  The `Authenticator` has been updated based on customer feedback & real-world use-cases to deliver an improved out-of-the-box experience & greater customization.

  _See: [RFC: Authenticator@next](https://github.com/aws-amplify/amplify-ui/discussions/200)_

  ## Goals

  - **Zero-config** – The Authenticator automatically infers Amplify CLI & Admin UI settings to work out-of-the-box.

    Run `amplify pull` with the latest CLI whenever your backend changes, and the Authenticator automatically reflects the correct login mechanism, social providers, & more.

  - **Native** – The Authenticator is implemented in its respective framework (e.g. Angular, React, Vue) for consistency & familiarity.

  - **Stable** – Existing & upcoming Authenticator behavior is captured & tested to reduce & prevent regressions.

    [Authenticator behavior](https://github.com/aws-amplify/amplify-ui/tree/main/packages/e2e/features/ui/components/authenticator) is tested as [E2E tests](https://github.com/aws-amplify/amplify-ui/blob/main/CONTRIBUTING.md#e2e-testing) on every PR.

  - **Interoperable** – Work with password managers, autofill, existing styles, & other common features.

  - **Customizable** – More ways to customize the UI & behavior without losing the benefits of the Authenticator.

    Customers have access to the same functionality that the `Authenticator` uses internally to even build a 100% custom Authenticator, without sacrificing any of the logic.

  - **Reproducible** – Authentication is complex. The Authenticator is is developed & tested against a myriad of Amplify backends, example apps, and specifications.

    Check out our [environments](https://github.com/aws-amplify/amplify-ui/tree/main/environments) and [examples](https://github.com/aws-amplify/amplify-ui/tree/main/examples) for more.

  ***

  Learn more by visiting the [Authenticator Documentation](https://ui.docs.amplify.aws/components/authenticator).

### Minor Changes

- [#626](https://github.com/aws-amplify/amplify-ui/pull/626) [`f84e9949b`](https://github.com/aws-amplify/amplify-ui/commit/f84e9949bd98b20fe8d1dff85e30ae69f2356351) Thanks [@ericclemmons](https://github.com/ericclemmons)! - ## Zero Configuration

  As of `@aws-amplify/cli@6.5.0`, `aws-exports.js` includes your backend configuration for the Authenticator to automatically infer `loginMechanisms` and `socialProviders`.

  ### Before (React)

  ```js
  export default withAuthenticator(App, {
    loginMechanisms: ['email'],
    socialProviders: ['amazon', 'apple', 'facebook', 'google'],
  });
  ```

  ### After (React)

  ```js
  export default withAuthenticator(App);
  ```

  ## Sign in with Apple

  The Authenticator supports `apple` as one of many `socialProviders`. See: https://docs.amplify.aws/lib/auth/social/q/platform/js/

- [#650](https://github.com/aws-amplify/amplify-ui/pull/650) [`e76c5ac17`](https://github.com/aws-amplify/amplify-ui/commit/e76c5ac1782561f7b53f19e1fc9e99d2685380d0) Thanks [@ericclemmons](https://github.com/ericclemmons)! - ## `signUpAttributes`

  The Sign Up form will include most of https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html by default with zero-config.

  Any verification mechanisms (e.g. `email`, `phone_number`) will always be required.

- [#717](https://github.com/aws-amplify/amplify-ui/pull/717) [`edea9ffaa`](https://github.com/aws-amplify/amplify-ui/commit/edea9ffaa41e2ae051f38e75434b56bb75ed4ff9) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Adding card variations

  ```jsx
  <Card>
    Default card
  </Card>

  <Card variation="outlined">
    Outlined card
  </Card>

  <Card variation="elevated">
    Elevated card
  </Card>
  ```

- [#627](https://github.com/aws-amplify/amplify-ui/pull/627) [`bd3e09a09`](https://github.com/aws-amplify/amplify-ui/commit/bd3e09a09988af5fa803fa97a25956ea7e9144f7) Thanks [@wlee221](https://github.com/wlee221)! - This implements `AuthenticatorService` that can be used internally and externally to access common Authenticator context and helpers.

  _Usage_:

  _app.component.ts_

  ```ts
  export class AppComponent {
    constructor(public authenticator: AuthenticatorService) {}
  }
  ```

  _app.component.html_

  ```html
  <!-- example of "reset password" button -->
  <button (click)="authenticator.toResetPassword()">Reset password</button>

  <!-- example of "sign up" submit button -->
  <button (click)="authenticator.submitForm()">Sign Up</button>

  <!-- disabling the submit button if submission is in progress -->
  <button
    (click)="authenticator.submitForm()"
    [disabled]="authenticator.isPending"
  >
    Sign Up
  </button>
  ```

- [#653](https://github.com/aws-amplify/amplify-ui/pull/653) [`70552a4cc`](https://github.com/aws-amplify/amplify-ui/commit/70552a4cc4d0e532dfaaa22314397690567b444c) Thanks [@reesscot](https://github.com/reesscot)! - Icon size now matches parent font-size. Allows customers to more easily use icons alongsize Headings, Buttons, etc.

  Example:

  ```
  <Button gap="0.1rem" size="small">
      <IconSave /> Save
  </Button>
  ```

### Patch Changes

- [#552](https://github.com/aws-amplify/amplify-ui/pull/552) [`bba3242af`](https://github.com/aws-amplify/amplify-ui/commit/bba3242afba9a54e12b730edbfa1006701a610fc) Thanks [@ericclemmons](https://github.com/ericclemmons)! - `@aws-amplify/ui-react` supports validation & re-use & customization of `Authenticator.SignUp.FormFields` via `components` & `services`:

  ```js
  <Authenticator
    components={{
      SignUp: {
        FormFields() {
          const { validationErrors } = useAuthenticator();
          return (
            <>
              <TextField
                label="Preferred Username"
                labelHidden={true}
                name="preferred_username"
                placeholder="Preferred Username"
              />
              <Authenticator.SignUp.FormFields />
              <CheckboxField
                errorMessage={validationErrors.acknowledgement}
                hasError={!!validationErrors.acknowledgement}
                label="I agree with the Terms & Conditions"
                name="acknowledgement"
                value="yes"
              />
            </>
          );
        },
      },
    }}
    services={{
      async validateCustomSignUp(formData) {
        if (!formData.acknowledgement) {
          return {
            acknowledgement: 'You must agree to the Terms & Conditions',
          };
        }
      },
    }}
  />
  ```

- [#709](https://github.com/aws-amplify/amplify-ui/pull/709) [`3cc1c15d7`](https://github.com/aws-amplify/amplify-ui/commit/3cc1c15d70711823e57c3c495f205f41fb74db27) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Building icons from Figma source now.

- [#727](https://github.com/aws-amplify/amplify-ui/pull/727) [`2b2ae8469`](https://github.com/aws-amplify/amplify-ui/commit/2b2ae84695e163309529a02325e70c4416b2a5f6) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - \* Divider component has more theming options for the border style, color, and width.

  - Fixing vertical divider
  - Improving Divider docs

- [#615](https://github.com/aws-amplify/amplify-ui/pull/615) [`b46597cef`](https://github.com/aws-amplify/amplify-ui/commit/b46597cefb013bfed5345d3ecdfd96649045caca) Thanks [@reesscot](https://github.com/reesscot)! - Apply `box-sizing: border-box` styling to all Amplify theme children

- [#612](https://github.com/aws-amplify/amplify-ui/pull/612) [`beb9b49b5`](https://github.com/aws-amplify/amplify-ui/commit/beb9b49b541f39305d595d3e587b6c65c54a3584) Thanks [@reesscot](https://github.com/reesscot)! - Menu primitive

  New primitive which enables customers to create aaccessible, interactive menu for selecting actions within an application.
  Dropdown menu is collision-aware and will automatically change location based on available space.

  ```jsx
  import { Divider, Menu, MenuItem } from '@aws-amplify/ui-react';

  export const BasicExample = () => {
    return (
      <Menu>
        <MenuItem onClick={() => alert('Download')}>Download</MenuItem>
        <MenuItem onClick={() => alert('Create a Copy')}>
          Create a Copy
        </MenuItem>
        <MenuItem onClick={() => alert('Mark as Draft')}>
          Mark as Draft
        </MenuItem>
        <Divider />
        <MenuItem isDisabled onClick={() => alert('Delete')}>
          Delete
        </MenuItem>
        <MenuItem onClick={() => alert('Attend a workshop')}>
          Attend a workshop
        </MenuItem>
      </Menu>
    );
  };
  ```

- [#634](https://github.com/aws-amplify/amplify-ui/pull/634) [`5257a3109`](https://github.com/aws-amplify/amplify-ui/commit/5257a31092b46a10abda99307779592b63d10890) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Adding support for token style props in React components and moving `createTheme` inside the AmplifyProvider so users don't have to call it directly in React.

  ```jsx
  const theme: Theme = {
    name: 'my-theme',
    tokens: {
      //...
    },
  };

  const App = () => {
    return <AmplifyProvider theme={theme}></AmplifyProvider>;
  };
  ```

  Then using theme tokens in a style prop:

  ```jsx
  import { useTheme, Text } from '@aws-amplify/ui-react';

  const MyComponent = () => {
    const { tokens } = useTheme();
    return <Text color={tokens.colors.font.error}>Error!</Text>;
  };
  ```

  The ui-react package is now exporting the `Theme` type to make it easier to define a theme object outside of the `createTheme` method.
