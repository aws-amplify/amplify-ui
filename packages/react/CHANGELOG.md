# @aws-amplify/ui-react

## 2.15.0

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

### Patch Changes

- Updated dependencies [[`ab9aef8f3`](https://github.com/aws-amplify/amplify-ui/commit/ab9aef8f329612abc2818db6b4477377aaa3ca62), [`992c5f6fb`](https://github.com/aws-amplify/amplify-ui/commit/992c5f6fb3eb3c1c5a9514029c4c17f53d8d7b5b)]:
  - @aws-amplify/ui@3.6.0

## 2.14.1

### Patch Changes

- [#1628](https://github.com/aws-amplify/amplify-ui/pull/1628) [`ff74c1d1c`](https://github.com/aws-amplify/amplify-ui/commit/ff74c1d1cab859d977dfc0638f0193af842d2bbd) Thanks [@reesscot](https://github.com/reesscot)! - Revert Geo package release

- Updated dependencies [[`ff74c1d1c`](https://github.com/aws-amplify/amplify-ui/commit/ff74c1d1cab859d977dfc0638f0193af842d2bbd)]:
  - @aws-amplify/ui@3.5.1

## 2.14.0

### Minor Changes

- [#1607](https://github.com/aws-amplify/amplify-ui/pull/1607) [`4d0a8424e`](https://github.com/aws-amplify/amplify-ui/commit/4d0a8424e2592be52a59e610f0eb1068c6ab0d5a) Thanks [@ErikCH](https://github.com/ErikCH)! - Added new Geo components. Including the MapView and GeoCoder with documentation at https://ui.docs.amplify.aws/components/geo

### Patch Changes

- [#1620](https://github.com/aws-amplify/amplify-ui/pull/1620) [`607c8bc2b`](https://github.com/aws-amplify/amplify-ui/commit/607c8bc2be05f005b75dc94c3f85fb9ffd30f42a) Thanks [@wlee221](https://github.com/wlee221)! - fix(react): Keep a local copy of previous facade value

* [#1608](https://github.com/aws-amplify/amplify-ui/pull/1608) [`4dee728f2`](https://github.com/aws-amplify/amplify-ui/commit/4dee728f25735ce8bc8793806a395dfcee579522) Thanks [@reesscot](https://github.com/reesscot)! - Remove sourcemaps from rollup build

- [#1619](https://github.com/aws-amplify/amplify-ui/pull/1619) [`a224bb914`](https://github.com/aws-amplify/amplify-ui/commit/a224bb914d274d5b7d002d0ff0cfd514aa9a1a0d) Thanks [@wlee221](https://github.com/wlee221)! - Optimize `useAuthenticator`s used internally with `selector` option. This will significantly reduce the number of re-renders in Authenticator.

- Updated dependencies [[`4d0a8424e`](https://github.com/aws-amplify/amplify-ui/commit/4d0a8424e2592be52a59e610f0eb1068c6ab0d5a), [`e20720a89`](https://github.com/aws-amplify/amplify-ui/commit/e20720a894ccb2cfcc7ede7160299e082ec76fd2), [`4dee728f2`](https://github.com/aws-amplify/amplify-ui/commit/4dee728f25735ce8bc8793806a395dfcee579522)]:
  - @aws-amplify/ui@3.5.0

## 2.13.0

### Minor Changes

- [#1566](https://github.com/aws-amplify/amplify-ui/pull/1566) [`7ce9dd531`](https://github.com/aws-amplify/amplify-ui/commit/7ce9dd5313b85d9f4b4cab8c7e329e37551e1690) Thanks [@jacoblogan](https://github.com/jacoblogan)! - added useBreakpointValue hook.
  Used with either a breakpoint object or array

  ```
  export const UseBreakpointValueObjectExample = () => {
    const variation = useBreakpointValue({
      base: 'info',
      small: 'warning',
      medium: 'error',
      large: 'success',
    });

    return <Alert variation={variation}>Responsive Alert</Alert>;
  };
  ```

  OR

  ```
  export const UseBreakpointValueArrayExample = () => {
    const variation = useBreakpointValue(['info', 'warning', 'error', 'success']);

    return <Alert variation={variation}>Responsive Alert</Alert>;
  };
  ```

### Patch Changes

- [#1605](https://github.com/aws-amplify/amplify-ui/pull/1605) [`32eb09aeb`](https://github.com/aws-amplify/amplify-ui/commit/32eb09aebac4633e84e0787552d252f962fee512) Thanks [@reesscot](https://github.com/reesscot)! - feat: datastore actions field value type casting

- Updated dependencies [[`c00b0f016`](https://github.com/aws-amplify/amplify-ui/commit/c00b0f0161f4df56c3d2ec75ffe0d2975bb859ac)]:
  - @aws-amplify/ui@3.4.1

## 2.12.0

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

- [#1510](https://github.com/aws-amplify/amplify-ui/pull/1510) [`683eac926`](https://github.com/aws-amplify/amplify-ui/commit/683eac9261d99ea5c4d8b86048b8c6d2efd83622) Thanks [@reesscot](https://github.com/reesscot)! - fix: make aws-amplify peer dependency optional for ui-react package

* [#1580](https://github.com/aws-amplify/amplify-ui/pull/1580) [`1ac9cda71`](https://github.com/aws-amplify/amplify-ui/commit/1ac9cda712dc7eb7bc7293999340e05059648c93) Thanks [@wlee221](https://github.com/wlee221)! - fix(authenticator): look for current user on routed apps whenever app refreshes

- [#1575](https://github.com/aws-amplify/amplify-ui/pull/1575) [`1570fe132`](https://github.com/aws-amplify/amplify-ui/commit/1570fe132b626223bf194757b8620dbf7d2a31dc) Thanks [@jacoblogan](https://github.com/jacoblogan)! - Add ES export of primitives

- Updated dependencies [[`1ac9cda71`](https://github.com/aws-amplify/amplify-ui/commit/1ac9cda712dc7eb7bc7293999340e05059648c93), [`d47da90a6`](https://github.com/aws-amplify/amplify-ui/commit/d47da90a68d936e2cc22a972a876ef10aca0eaf3), [`6d3981c4a`](https://github.com/aws-amplify/amplify-ui/commit/6d3981c4a26721361e4461d206b0b37d72d67dbd)]:
  - @aws-amplify/ui@3.4.0

## 2.11.0

### Minor Changes

- [#1538](https://github.com/aws-amplify/amplify-ui/pull/1538) [`eedae2362`](https://github.com/aws-amplify/amplify-ui/commit/eedae236249eb1201f3540fa4458fdbac77b5af6) Thanks [@joebuono](https://github.com/joebuono)! - Adds the optional `hasMorePages` prop to the Pagination component

  The reason this is necessary is because sometimes the totalPages count is unknown when pagination occurs at the API level.

  Resulting conditions:

  - Current behavior of totalPages prop stays the same, which determines the page numbers to show
  - A new hasMorePages prop is added to Pagination component
  - When hasMorePages is true, and the customer is at the end of the pages (e.g. 10 of 10), then the next button will NOT be disabled
  - When hasMorePages is false, and the customer is at the end of the pages (e.g. 10 of 10), then the next button WILL be disabled

## 2.10.4

### Patch Changes

- [#1548](https://github.com/aws-amplify/amplify-ui/pull/1548) [`0e61396c8`](https://github.com/aws-amplify/amplify-ui/commit/0e61396c8e8bd403dfd1a06bd69d1edcb61de89a) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(react-authenticator): consolidate Authenticator form event handlers in useFormHandlers hook

* [#1343](https://github.com/aws-amplify/amplify-ui/pull/1343) [`4896136e9`](https://github.com/aws-amplify/amplify-ui/commit/4896136e939feb887c5427a35fe903a0181c03fa) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Adding deprecation warnings to icons

- [#1537](https://github.com/aws-amplify/amplify-ui/pull/1537) [`c1eed8265`](https://github.com/aws-amplify/amplify-ui/commit/c1eed82657d1d927500de4164244869ae91fd8d9) Thanks [@reesscot](https://github.com/reesscot)! - fix: suppress erroneous isMultiline deprecation warnings on TextField component

  Deprecation warning messages are showing for users of TextField for the isMultiline prop even though
  they are not using the prop. This issue is fixed by making the shouldWarn prop required on the internal
  useDeprecationWarning hook.

- Updated dependencies [[`7910c04b5`](https://github.com/aws-amplify/amplify-ui/commit/7910c04b55cb32e3e8a70c3966f509ea43a0dc64), [`30e3155ac`](https://github.com/aws-amplify/amplify-ui/commit/30e3155ac70d3f82c00da562332ce701ade45817)]:
  - @aws-amplify/ui@3.3.2

## 2.10.3

### Patch Changes

- [#1535](https://github.com/aws-amplify/amplify-ui/pull/1535) [`f1d4020be`](https://github.com/aws-amplify/amplify-ui/commit/f1d4020be9a976cc0221a89189bee847a38e6478) Thanks [@reesscot](https://github.com/reesscot)! - fix: typo in mapping of TextField left style prop (left was mapped to right, when should be mapped to left)

## 2.10.2

### Patch Changes

- [#1530](https://github.com/aws-amplify/amplify-ui/pull/1530) [`3a8925b76`](https://github.com/aws-amplify/amplify-ui/commit/3a8925b7682de67cb790cb6739cfb15ffb866b18) Thanks [@reesscot](https://github.com/reesscot)! - fix: update complex field components (TextField, TextAreaField, etc) to apply absolute positioning from Figma

  Figma to Studio integration will absolutely position components when autolayout is not enabled in Figma. This causes an issue for field components that were passing position, top, and left, and padding down to the input element, causing the layout not to match Figma. This is fixed by moving the absolute position props and padding up to the container Flex element.

## 2.10.1

### Patch Changes

- [#1484](https://github.com/aws-amplify/amplify-ui/pull/1484) [`8b72277ab`](https://github.com/aws-amplify/amplify-ui/commit/8b72277ab8bd7ad64fa298a9d509572318ac8db2) Thanks [@wlee221](https://github.com/wlee221)! - refactor: share default form fields generation logic

* [#1484](https://github.com/aws-amplify/amplify-ui/pull/1484) [`8b72277ab`](https://github.com/aws-amplify/amplify-ui/commit/8b72277ab8bd7ad64fa298a9d509572318ac8db2) Thanks [@wlee221](https://github.com/wlee221)! - Default `labelHidden` to false. This can be adjusted in a later PR for better UX.

- [#1514](https://github.com/aws-amplify/amplify-ui/pull/1514) [`5ca96c4a8`](https://github.com/aws-amplify/amplify-ui/commit/5ca96c4a81722aca00caecb35dc98d17588c6ff1) Thanks [@amirHossein-Ebrahimi](https://github.com/amirHossein-Ebrahimi)! - feat: Add repository information to UI packages

* [#1495](https://github.com/aws-amplify/amplify-ui/pull/1495) [`71abbbe28`](https://github.com/aws-amplify/amplify-ui/commit/71abbbe28c8e87aed63dac8131534cfaeb071843) Thanks [@0618](https://github.com/0618)! - fix a11y errors

- [#1509](https://github.com/aws-amplify/amplify-ui/pull/1509) [`95c02cbf8`](https://github.com/aws-amplify/amplify-ui/commit/95c02cbf8930bc16fe349ff6e23b3b859f92d0d5) Thanks [@jacoblogan](https://github.com/jacoblogan)! - make pagination change functions optional

- Updated dependencies [[`8b72277ab`](https://github.com/aws-amplify/amplify-ui/commit/8b72277ab8bd7ad64fa298a9d509572318ac8db2), [`8b72277ab`](https://github.com/aws-amplify/amplify-ui/commit/8b72277ab8bd7ad64fa298a9d509572318ac8db2), [`5ca96c4a8`](https://github.com/aws-amplify/amplify-ui/commit/5ca96c4a81722aca00caecb35dc98d17588c6ff1), [`1e9c6c031`](https://github.com/aws-amplify/amplify-ui/commit/1e9c6c031b1e5401c456365f0ff3187ed35c6f22)]:
  - @aws-amplify/ui@3.3.1

## 2.10.0

### Minor Changes

- [#1492](https://github.com/aws-amplify/amplify-ui/pull/1492) [`0bfe79caa`](https://github.com/aws-amplify/amplify-ui/commit/0bfe79caa63b037c1c9633c240b35203799f2fab) Thanks [@ErikCH](https://github.com/ErikCH)! - Added new password complexity errors that will show during sign up. Based on the zero-config

### Patch Changes

- Updated dependencies [[`0bfe79caa`](https://github.com/aws-amplify/amplify-ui/commit/0bfe79caa63b037c1c9633c240b35203799f2fab), [`ebcc7e610`](https://github.com/aws-amplify/amplify-ui/commit/ebcc7e610fda12f74ba6c5bd6dda89bc4849b898)]:
  - @aws-amplify/ui@3.3.0

## 2.9.0

### Minor Changes

- [#1474](https://github.com/aws-amplify/amplify-ui/pull/1474) [`05a1fa3c3`](https://github.com/aws-amplify/amplify-ui/commit/05a1fa3c3970f04bb87a336aafe87cf3f1946107) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Adding `labelPosition` to Radio and RadioGroupField

  ```jsx
  <RadioGroupField label="Language" name="language" labelPosition="start">
    <Radio value="html">html</Radio>
    <Radio value="css">css</Radio>
    <Radio value="javascript">javascript</Radio>
  </RadioGroupField>
  ```

### Patch Changes

- [#1489](https://github.com/aws-amplify/amplify-ui/pull/1489) [`8ead973d2`](https://github.com/aws-amplify/amplify-ui/commit/8ead973d23768fb497ad5ad1cde845a663a990ef) Thanks [@reesscot](https://github.com/reesscot)! - fix: Authenticator issue where InitMachine useEffect runs every render, causing `children` of `Authenticator` to be unmounted and remounted on every render.

* [#1429](https://github.com/aws-amplify/amplify-ui/pull/1429) [`5202eba2c`](https://github.com/aws-amplify/amplify-ui/commit/5202eba2cfe6ae76b3128f3781bacd6f3795d764) Thanks [@jacoblogan](https://github.com/jacoblogan)! - Add exported class names object which is a JS object containing the classname, primitive name, and description of class

- [#1483](https://github.com/aws-amplify/amplify-ui/pull/1483) [`b97cb9126`](https://github.com/aws-amplify/amplify-ui/commit/b97cb91264d03eed0ce248909708eed112eb9aec) Thanks [@0618](https://github.com/0618)! - - fix a11y erros on docs homepage
  - fix type errors
  - rename css class

* [#1482](https://github.com/aws-amplify/amplify-ui/pull/1482) [`9fb550ccd`](https://github.com/aws-amplify/amplify-ui/commit/9fb550ccd58608ca2f96caf806a858fe55b119eb) Thanks [@reesscot](https://github.com/reesscot)! - Remove IdProvider and upgrade to latest Radix UI packages.

- [#1472](https://github.com/aws-amplify/amplify-ui/pull/1472) [`ef5dff599`](https://github.com/aws-amplify/amplify-ui/commit/ef5dff599b84dd4b508827264758b11439684142) Thanks [@wlee221](https://github.com/wlee221)! - Set confirmation code input types to `"number"`

* [#1486](https://github.com/aws-amplify/amplify-ui/pull/1486) [`9ecb14e35`](https://github.com/aws-amplify/amplify-ui/commit/9ecb14e35ec0c5f6c65ac71d06f56754920d1b61) Thanks [@reesscot](https://github.com/reesscot)! - `TextField` and `TextAreaField` - Apply `width` and `height` style props to
  `Flex` container element rather than `input` field to match `SelectField` behavior.
  This will also apply to `PasswordField`, `PhoneNumberField` and `SearchField`
  which use the `TextField`.
* Updated dependencies [[`05a1fa3c3`](https://github.com/aws-amplify/amplify-ui/commit/05a1fa3c3970f04bb87a336aafe87cf3f1946107), [`b97cb9126`](https://github.com/aws-amplify/amplify-ui/commit/b97cb91264d03eed0ce248909708eed112eb9aec), [`ef5dff599`](https://github.com/aws-amplify/amplify-ui/commit/ef5dff599b84dd4b508827264758b11439684142), [`3c0b705e3`](https://github.com/aws-amplify/amplify-ui/commit/3c0b705e3c5eb25a80bea077a6c60a52dc7ffa51), [`9e8d6b212`](https://github.com/aws-amplify/amplify-ui/commit/9e8d6b212bdbc324b75066d664b6adb1ef46163d)]:
  - @aws-amplify/ui@3.2.1

## 2.8.0

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

- [#1461](https://github.com/aws-amplify/amplify-ui/pull/1461) [`a7e65c56f`](https://github.com/aws-amplify/amplify-ui/commit/a7e65c56ff3d3beaad3d049581a21277d8135392) Thanks [@jacoblogan](https://github.com/jacoblogan)! - set pagination current page default to 1

* [#1443](https://github.com/aws-amplify/amplify-ui/pull/1443) [`851288030`](https://github.com/aws-amplify/amplify-ui/commit/851288030f6e4ff95fc0a531a8128c7bb64cfa49) Thanks [@joebuono](https://github.com/joebuono)! - Improve efficiency of View styles by combining hooks into single `useStyles` hook

- [#1434](https://github.com/aws-amplify/amplify-ui/pull/1434) [`45546b0d6`](https://github.com/aws-amplify/amplify-ui/commit/45546b0d63e32ecf79f36c4a8b18787a48ad901b) Thanks [@joebuono](https://github.com/joebuono)! - Convert `padding` and `margin` properties to logical equivalents
  (e.g., `paddingTop` converts to `padding-block-start`)

* [#1407](https://github.com/aws-amplify/amplify-ui/pull/1407) [`731587a58`](https://github.com/aws-amplify/amplify-ui/commit/731587a58e8ef89e9f0193d7118377093a6024b8) Thanks [@0618](https://github.com/0618)! - fix authenticator SetupTOTP, refactor authenticator styles

- [#1447](https://github.com/aws-amplify/amplify-ui/pull/1447) [`3343e187b`](https://github.com/aws-amplify/amplify-ui/commit/3343e187b6dc9eab2c2a9c2d408bac8afb063f74) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Fixing nested AmplifyProviders and theming. This fixes issues seen on the docs site if you have nested AmplifyProviders causing weird issues. The provider now cleans itself up properly and only injects CSS if necessary.

- Updated dependencies [[`5f1753785`](https://github.com/aws-amplify/amplify-ui/commit/5f175378571e56c1f59bfa39060337148f428ce2), [`4c1a5cfbe`](https://github.com/aws-amplify/amplify-ui/commit/4c1a5cfbe6e984a790261d122ee4df368b249688), [`3d5acaa4c`](https://github.com/aws-amplify/amplify-ui/commit/3d5acaa4cce5ea8daf49caab71d92dc3c91d9021), [`731587a58`](https://github.com/aws-amplify/amplify-ui/commit/731587a58e8ef89e9f0193d7118377093a6024b8), [`3343e187b`](https://github.com/aws-amplify/amplify-ui/commit/3343e187b6dc9eab2c2a9c2d408bac8afb063f74)]:
  - @aws-amplify/ui@3.2.0

## 2.7.0

### Minor Changes

- [#1389](https://github.com/aws-amplify/amplify-ui/pull/1389) [`57f1441e4`](https://github.com/aws-amplify/amplify-ui/commit/57f1441e4809218a813148d0942de8171d159831) Thanks [@ErikCH](https://github.com/ErikCH)! - Added new formfields prop that allows more customization of inputs and setup TOTP.
  New docs can be found at https://ui.docs.amplify.aws/components/authenticator#form-field-customization

### Patch Changes

- [#1415](https://github.com/aws-amplify/amplify-ui/pull/1415) [`74e066622`](https://github.com/aws-amplify/amplify-ui/commit/74e066622e9abe26e9f9427f6bdc82c4e14d4952) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Fixing checkbox `labelPosition` to position the label correctly. Now `labelPosition="start"` actually means _start_.

* [#1432](https://github.com/aws-amplify/amplify-ui/pull/1432) [`6c51a2400`](https://github.com/aws-amplify/amplify-ui/commit/6c51a2400f87fe3fb45913b898c2b60740b71894) Thanks [@joebuono](https://github.com/joebuono)! - Add `margin` and `padding` style props (`marginTop`, `paddingBottom`, etc)

- [#1417](https://github.com/aws-amplify/amplify-ui/pull/1417) [`5b3b8479a`](https://github.com/aws-amplify/amplify-ui/commit/5b3b8479aea06c6b7df031dc6493abdd36b0bd6a) Thanks [@wlee221](https://github.com/wlee221)! - Fix undefined reference in reset password flow

- Updated dependencies [[`74e066622`](https://github.com/aws-amplify/amplify-ui/commit/74e066622e9abe26e9f9427f6bdc82c4e14d4952), [`57f1441e4`](https://github.com/aws-amplify/amplify-ui/commit/57f1441e4809218a813148d0942de8171d159831), [`5b3b8479a`](https://github.com/aws-amplify/amplify-ui/commit/5b3b8479aea06c6b7df031dc6493abdd36b0bd6a)]:
  - @aws-amplify/ui@3.1.0

## 2.6.2

### Patch Changes

- [#1408](https://github.com/aws-amplify/amplify-ui/pull/1408) [`71d7b79c5`](https://github.com/aws-amplify/amplify-ui/commit/71d7b79c54181ff657d79444934947bd057d72c3) Thanks [@zchenwei](https://github.com/zchenwei)! - fix: fixing infinite useEffect call in useDataStore hook

## 2.6.1

### Patch Changes

- [#1382](https://github.com/aws-amplify/amplify-ui/pull/1382) [`3e82f7238`](https://github.com/aws-amplify/amplify-ui/commit/3e82f7238080d7e56add1f60854bdf6855b6a9ea) Thanks [@ErikCH](https://github.com/ErikCH)! - Added missing slots for React components

* [#1388](https://github.com/aws-amplify/amplify-ui/pull/1388) [`c65565e4b`](https://github.com/aws-amplify/amplify-ui/commit/c65565e4b07219866be73cf9ed6fc2c39fc81c05) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Fixes useDeprecationWarning hook

## 2.6.0

### Minor Changes

- [#1355](https://github.com/aws-amplify/amplify-ui/pull/1355) [`19d5a6bfa`](https://github.com/aws-amplify/amplify-ui/commit/19d5a6bfab21eb5d952613ec8570287611d29497) Thanks [@zchenwei](https://github.com/zchenwei)! - feat: adding `isSelectionRequired` prop to `ToggleButtonGroup` primitive

  **Example:**

  ```jsx
  import * as React from 'react';
  import {
    MdFormatBold,
    MdFormatColorFill,
    MdFormatItalic,
    MdFormatUnderlined,
  } from 'react-icons/md';
  import { ToggleButton, ToggleButtonGroup } from '@aws-amplify/ui-react';

  export const SelectionRequiredToggleButtonGroupExample = () => {
    const [value, setValue] = React.useState('bold');
    return (
      <ToggleButtonGroup
        value={value}
        onChange={(value) => setValue(value as string)}
        isExclusive
        isSelectionRequired
      >
        <ToggleButton value="bold">
          <MdFormatBold />
        </ToggleButton>
        <ToggleButton value="italic">
          <MdFormatItalic />
        </ToggleButton>
        <ToggleButton value="underlined">
          <MdFormatUnderlined />
        </ToggleButton>
        <ToggleButton value="color-fill">
          <MdFormatColorFill />
        </ToggleButton>
      </ToggleButtonGroup>
    );
  };
  ```

### Patch Changes

- [#1358](https://github.com/aws-amplify/amplify-ui/pull/1358) [`43c814db4`](https://github.com/aws-amplify/amplify-ui/commit/43c814db418865672730449ba8c983bcb7d94847) Thanks [@zchenwei](https://github.com/zchenwei)! - chore: updating all React imports from default to namespace

* [#1368](https://github.com/aws-amplify/amplify-ui/pull/1368) [`c57a02349`](https://github.com/aws-amplify/amplify-ui/commit/c57a02349376b4fea82bc9f854971445aa01c676) Thanks [@zchenwei](https://github.com/zchenwei)! - style: cleaning up sr-only class

- [#1366](https://github.com/aws-amplify/amplify-ui/pull/1366) [`e73e0276f`](https://github.com/aws-amplify/amplify-ui/commit/e73e0276f8b1707cd01e24d55bd023b4a2347625) Thanks [@wlee221](https://github.com/wlee221)! - Pass `formData` to `submitForm` event on submit. This will ensure any default form values are submitted to Cognito, without relying on `CHANGE` events.

* [#1357](https://github.com/aws-amplify/amplify-ui/pull/1357) [`65ed5351f`](https://github.com/aws-amplify/amplify-ui/commit/65ed5351f2ca850ddf7db0c9a002ff563351f138) Thanks [@ErikCH](https://github.com/ErikCH)! - Added new translations for confirm sign up page

- [#1371](https://github.com/aws-amplify/amplify-ui/pull/1371) [`1a2f8a732`](https://github.com/aws-amplify/amplify-ui/commit/1a2f8a732952c0e76e91b3b2c8472e3c0eed2af8) Thanks [@reesscot](https://github.com/reesscot)! - feat: add new TextAreaField primitive (replaces TextField `isMultiline` feature)

  **Example**

  ```
  <TextAreaField
    descriptiveText="Enter a valid last name"
    label="Last name"
    name="last_name"
    placeholder="Baggins"
    rows="3"
    onChange={(e) => console.info(e.currentTarget.value)}
  />
  ```

- Updated dependencies [[`fbfcd04d3`](https://github.com/aws-amplify/amplify-ui/commit/fbfcd04d36753a69d24d5576736a9082f1a66dbe), [`c57a02349`](https://github.com/aws-amplify/amplify-ui/commit/c57a02349376b4fea82bc9f854971445aa01c676), [`e73e0276f`](https://github.com/aws-amplify/amplify-ui/commit/e73e0276f8b1707cd01e24d55bd023b4a2347625), [`929cb8f76`](https://github.com/aws-amplify/amplify-ui/commit/929cb8f768d9a95b3854d7fa87b08a83af72c96c)]:
  - @aws-amplify/ui@3.0.15

## 2.5.0

### Minor Changes

- [#1342](https://github.com/aws-amplify/amplify-ui/pull/1342) [`7a675ac73`](https://github.com/aws-amplify/amplify-ui/commit/7a675ac731843333882165c5602c1f996df2eb52) Thanks [@joebuono](https://github.com/joebuono)! - Add `options` prop to <SelectField>

  Example:
  <SelectField
  options=['lions', 'tigers', 'bears']

  > </SelectField>

### Patch Changes

- [#1340](https://github.com/aws-amplify/amplify-ui/pull/1340) [`43d8106d3`](https://github.com/aws-amplify/amplify-ui/commit/43d8106d378e0438326f8992b4b1bfe73d91f5d8) Thanks [@joebuono](https://github.com/joebuono)! - Allow Content-less TabItem

* [#1320](https://github.com/aws-amplify/amplify-ui/pull/1320) [`94d09948a`](https://github.com/aws-amplify/amplify-ui/commit/94d09948ac9d36a49b1872751f0587e73413bd99) Thanks [@wlee221](https://github.com/wlee221)! - Re-export `translations` from ui-[framework] packages. This lets you use `translations` directly:

  ```diff
  - import { translations } from '@aws-amplify/ui';
  + import { translations } from '@aws-amplify/ui-[framework]';
  ```

- [#1321](https://github.com/aws-amplify/amplify-ui/pull/1321) [`e85c0db5c`](https://github.com/aws-amplify/amplify-ui/commit/e85c0db5cd6a3c4f9924466afb5e7e5e7dbbeea3) Thanks [@zchenwei](https://github.com/zchenwei)! - chore: using aria-describedby on field controls

- Updated dependencies [[`722e2a932`](https://github.com/aws-amplify/amplify-ui/commit/722e2a93263478aed2a9aee872ab1fcbc86b41ca), [`4c6d198e4`](https://github.com/aws-amplify/amplify-ui/commit/4c6d198e409d46eef37b88b2327132b4a5dbe425), [`38cdf38e4`](https://github.com/aws-amplify/amplify-ui/commit/38cdf38e473853ba93ffb22a1d9252286a7d2a6f)]:
  - @aws-amplify/ui@3.0.14

## 2.4.0

### Minor Changes

- [#1285](https://github.com/aws-amplify/amplify-ui/pull/1285) [`bbd182130`](https://github.com/aws-amplify/amplify-ui/commit/bbd182130137403c4fde5d1ac9217f8d33c05b48) Thanks [@joebuono](https://github.com/joebuono)! - Add 'to' prop to Link primitive

* [#1267](https://github.com/aws-amplify/amplify-ui/pull/1267) [`3600d9b6f`](https://github.com/aws-amplify/amplify-ui/commit/3600d9b6feaaad4ba297faaa09c83c365e2a1ddc) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Adding `paths` prop to Icon which is an array of path-like objects that will be mapped to `<path>` elements.

  Example:

  ```jsx
  <Icon
    ariaLabel="tag"
    viewBox={{ width: 23, height: 15 }}
    paths={[
      {
        d: 'M1 0.5C0.723858 0.5 0.5 0.723858 0.5 1V14C0.5 14.2761 0.723858 14.5 1 14.5H14C14.1148 14.5 14.2262 14.4605 14.3153 14.3881L22.3153 7.88806C22.4322 7.79311 22.5 7.65056 22.5 7.5C22.5 7.34944 22.4322 7.20689 22.3153 7.11194L14.3153 0.611943C14.2262 0.539529 14.1148 0.5 14 0.5H1Z',
        strokeLinejoin: 'bevel',
        strokeLinecap: 'round',
        strokeDasharray: '4 4',
        fill: 'transparent',
        stroke: 'currentColor',
      },
    ]}
  />
  ```

### Patch Changes

- [#1259](https://github.com/aws-amplify/amplify-ui/pull/1259) [`a6af87143`](https://github.com/aws-amplify/amplify-ui/commit/a6af87143d2a232b95ba3a1e0b63a1b3566e5aab) Thanks [@jacoblogan](https://github.com/jacoblogan)! - move data-theme attributes to document root to capture elements that fall outside of the amplify provider component

* [#1302](https://github.com/aws-amplify/amplify-ui/pull/1302) [`732aee95c`](https://github.com/aws-amplify/amplify-ui/commit/732aee95cfa342ac793095627dcddc72fcbbca1f) Thanks [@jacoblogan](https://github.com/jacoblogan)! - update SwitchField to allow user updates on controlled component

- [#1276](https://github.com/aws-amplify/amplify-ui/pull/1276) [`169a26cdf`](https://github.com/aws-amplify/amplify-ui/commit/169a26cdf62f18386dafc4e63484b5a62b78bc17) Thanks [@reesscot](https://github.com/reesscot)! - feat: Add Action/Workflow hooks

* [#1292](https://github.com/aws-amplify/amplify-ui/pull/1292) [`aa051a012`](https://github.com/aws-amplify/amplify-ui/commit/aa051a0124690bc373301fa2456143e3346c1f56) Thanks [@jacoblogan](https://github.com/jacoblogan)! - update StepperField and CheckboxField to update the visual display when a controlled value is changed

* Updated dependencies [[`f9bb30efd`](https://github.com/aws-amplify/amplify-ui/commit/f9bb30efd4c0a384162fbcef22d4b5bccec62dc5), [`7c81bacdf`](https://github.com/aws-amplify/amplify-ui/commit/7c81bacdfdc71d71843b8a7285e513e09e9842cb), [`4e19822e4`](https://github.com/aws-amplify/amplify-ui/commit/4e19822e4d995d4cb3b3ad23090a161249806939), [`b4254e58a`](https://github.com/aws-amplify/amplify-ui/commit/b4254e58ac3473bd141e48b3a553c632a84fab5c)]:
  - @aws-amplify/ui@3.0.13

## 2.3.0

### Minor Changes

- [#1260](https://github.com/aws-amplify/amplify-ui/pull/1260) [`ecd7bea7e`](https://github.com/aws-amplify/amplify-ui/commit/ecd7bea7ee4466930c15bceb8986e0a090d0570e) Thanks [@ErikCH](https://github.com/ErikCH)! - Added new hide sign up prop, for Vue, Angular, and React

* [#1229](https://github.com/aws-amplify/amplify-ui/pull/1229) [`dc4bb31d5`](https://github.com/aws-amplify/amplify-ui/commit/dc4bb31d51ed628c732e3efaa22143541bc73068) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Adding more flexibility in the Icon component. Added `as` and `children` to the Icon props to allow for more complex icons.

  Using `as` prop with icon libraries:

  ```jsx
  import { Icon } from '@aws-amplify/ui-react';
  import { DiJsBadge } from 'react-icons/di';

  <Icon ariaLabel="Javascript" as={DiJsBadge} />;
  ```

  Using multiple paths:

  ```jsx
  import { Icon } from '@aws-amplify/ui-react';

  <Icon ariaLabel="Align bottom" color="rebeccapurple">
    <path d="M13 10H17V16H13V10Z" fill="currentColor" opacity="0.5" />
    <path d="M11 4H7V16H11V4Z" fill="currentColor" />
    <path d="M18 18H6V20H18V18Z" fill="currentColor" />
  </Icon>;
  ```

### Patch Changes

- [#1249](https://github.com/aws-amplify/amplify-ui/pull/1249) [`d0bb758cb`](https://github.com/aws-amplify/amplify-ui/commit/d0bb758cbfb6b6e79e0921ef05c0a3a1ec8b9e63) Thanks [@zchenwei](https://github.com/zchenwei)! - test: adding unit tests against null values

## 2.2.2

### Patch Changes

- [#1243](https://github.com/aws-amplify/amplify-ui/pull/1243) [`93834bf58`](https://github.com/aws-amplify/amplify-ui/commit/93834bf5888cec3b031c63abd8a261fab521ae28) Thanks [@zchenwei](https://github.com/zchenwei)! - fix: fixing error throwing when typing in `Collection` search due to `items` prop contains `null` value

- Updated dependencies [[`f7d86db6d`](https://github.com/aws-amplify/amplify-ui/commit/f7d86db6dbd3af650ce4c64e6efbc5acb4523e78), [`b824136bf`](https://github.com/aws-amplify/amplify-ui/commit/b824136bfb288df0f3300421f73f9bfdcd61bf57), [`2913fe8cb`](https://github.com/aws-amplify/amplify-ui/commit/2913fe8cb35e08ad6c61121dfb9d12b4ae9cf6ad)]:
  - @aws-amplify/ui@3.0.12

## 2.2.1

### Patch Changes

- [#1207](https://github.com/aws-amplify/amplify-ui/pull/1207) [`b920368e7`](https://github.com/aws-amplify/amplify-ui/commit/b920368e7037035b798689716bdcd0c12cd4df67) Thanks [@ErikCH](https://github.com/ErikCH)! - Added translations for errors for confirm sign in

- Updated dependencies [[`4932b43f8`](https://github.com/aws-amplify/amplify-ui/commit/4932b43f8f3ad5d851a4fd8635b1b92abf6c4ef0)]:
  - @aws-amplify/ui@3.0.11

## 2.2.0

### Minor Changes

- [#1168](https://github.com/aws-amplify/amplify-ui/pull/1168) [`b32dd86bf`](https://github.com/aws-amplify/amplify-ui/commit/b32dd86bf4e26011f8b17e59b98fed3430f8fe50) Thanks [@wlee221](https://github.com/wlee221)! - This enables `useAuthenticator` usage outside <Authenticator /> to access commonly requested authenticator context like `user` and `route`.

  First wrap your App with `Authenticator.Provider`:

  ```tsx
  const App = (
    <Authenticator.Provider>
      <MyApp />
    </Authenticator.Provider>
  );
  ```

  To avoid repeated re-renders, you can pass a function that takes in Authenticator context and returns an array of desired context values. This hook will only trigger re-render if any of the array value changes.

  ```tsx
  const Home = () => {
    const { user, signOut } = useAuthenticator((context) => [context.user]);

    return (
      <>
        <h2>Welcome, {user.username}!</h2>
        <button onClick={signOut}>Sign Out</button>
      </>
    );
  };

  const Login = () => <Authenticator />;

  function MyApp() {
    const { route } = useAuthenticator((context) => [context.route]);

    return route === 'authenticated' ? <Home /> : <Login />;
  }
  ```

### Patch Changes

- [#1153](https://github.com/aws-amplify/amplify-ui/pull/1153) [`3afdc1fc9`](https://github.com/aws-amplify/amplify-ui/commit/3afdc1fc9a876a17403ccfc607b922ec352fd1cf) Thanks [@wlee221](https://github.com/wlee221)! - Listen to Auth Hub events

* [#1176](https://github.com/aws-amplify/amplify-ui/pull/1176) [`f7f77237e`](https://github.com/aws-amplify/amplify-ui/commit/f7f77237e69272f1d1d878620946e2914354b503) Thanks [@ErikCH](https://github.com/ErikCH)! - Added new force new password fields component. Also auto detect required attributes on force new password page.

* Updated dependencies [[`3afdc1fc9`](https://github.com/aws-amplify/amplify-ui/commit/3afdc1fc9a876a17403ccfc607b922ec352fd1cf)]:
  - @aws-amplify/ui@3.0.10

## 2.1.10

### Patch Changes

- [#1165](https://github.com/aws-amplify/amplify-ui/pull/1165) [`4238ee696`](https://github.com/aws-amplify/amplify-ui/commit/4238ee696270d8e39e7f88d83956c2666f0305bb) Thanks [@joebuono](https://github.com/joebuono)! - Pin all @aws-amplify/ui-react dependencies

* [#1162](https://github.com/aws-amplify/amplify-ui/pull/1162) [`e0fcf3685`](https://github.com/aws-amplify/amplify-ui/commit/e0fcf3685164075fe385f8e09247f9620a7e6ccc) Thanks [@wlee221](https://github.com/wlee221)! - Add explicit `INIT` step for initializing authMachine

- [#1164](https://github.com/aws-amplify/amplify-ui/pull/1164) [`b4c327a73`](https://github.com/aws-amplify/amplify-ui/commit/b4c327a73ee34a0f4292b6972774011b0b4ca6d4) Thanks [@Jesmaster](https://github.com/Jesmaster)! - Removed hard-coded styles from Authenticator Sign Up button

- Updated dependencies [[`6c070b2e1`](https://github.com/aws-amplify/amplify-ui/commit/6c070b2e118560dec9629c7c0abdfb218d53267c), [`e0fcf3685`](https://github.com/aws-amplify/amplify-ui/commit/e0fcf3685164075fe385f8e09247f9620a7e6ccc), [`3a69c2a75`](https://github.com/aws-amplify/amplify-ui/commit/3a69c2a752b9ab07bb55911cae6447dccd76cc1f)]:
  - @aws-amplify/ui@3.0.9

## 2.1.9

### Patch Changes

- [#1163](https://github.com/aws-amplify/amplify-ui/pull/1163) [`679a89383`](https://github.com/aws-amplify/amplify-ui/commit/679a89383814ad66b81494fe8dc9ce2cf8df5c2e) Thanks [@ErikCH](https://github.com/ErikCH)! - Fixed bug with QR code setup page

* [#1166](https://github.com/aws-amplify/amplify-ui/pull/1166) [`c5cc41a70`](https://github.com/aws-amplify/amplify-ui/commit/c5cc41a70d7c0de4b2dcae385f7661361455e7b6) Thanks [@wlee221](https://github.com/wlee221)! - Thanks @jacoblogan! -- handle null children in tabs

* Updated dependencies [[`c5cc41a70`](https://github.com/aws-amplify/amplify-ui/commit/c5cc41a70d7c0de4b2dcae385f7661361455e7b6)]:
  - @aws-amplify/ui@3.0.8

## 2.1.8

### Patch Changes

- [`f137f8a1d`](https://github.com/aws-amplify/amplify-ui/commit/f137f8a1dcedb6be9024494df726aa9a34e2472f) Thanks [@wlee221](https://github.com/wlee221)! - Revert "Remove IdProvider and port useId from radix (#1010)"

## 2.1.7

### Patch Changes

- [#1083](https://github.com/aws-amplify/amplify-ui/pull/1083) [`2e7dbaeab`](https://github.com/aws-amplify/amplify-ui/commit/2e7dbaeaba19b8fc2a450acae0efa3e05810938e) Thanks [@ErikCH](https://github.com/ErikCH)! - Updated QR code page so users on mobile don't have to take a picture of the QR code

* [#1122](https://github.com/aws-amplify/amplify-ui/pull/1122) [`7e0a6305f`](https://github.com/aws-amplify/amplify-ui/commit/7e0a6305fd92c55aea3d03ec5806f0ebac735015) Thanks [@ErikCH](https://github.com/ErikCH)! - Added new Confirm Sign Up Footer and Header slot

- [#1125](https://github.com/aws-amplify/amplify-ui/pull/1125) [`c12184702`](https://github.com/aws-amplify/amplify-ui/commit/c12184702cb6e602a931a58b8ceb090d9d54a96b) Thanks [@ErikCH](https://github.com/ErikCH)! - Disable input on form submit for React on Sign up, Confirm Sign In, Confirm Sign Up, Force New Password, Confirm Reset Password, Reset Password, Setup TOTP, Confirm Verify User, and Verify User.

* [#1077](https://github.com/aws-amplify/amplify-ui/pull/1077) [`9a095ae46`](https://github.com/aws-amplify/amplify-ui/commit/9a095ae46ee6639f7c8fe9a3a7b2b871449867b8) Thanks [@reesscot](https://github.com/reesscot)! - Fix media query logic to return correct breakpoint

- [#1088](https://github.com/aws-amplify/amplify-ui/pull/1088) [`a2fa3603e`](https://github.com/aws-amplify/amplify-ui/commit/a2fa3603eda90a67c9a092ce170e86d13a152e18) Thanks [@wlee221](https://github.com/wlee221)! - Remove trailing space on "Forgot your password? "

* [#1010](https://github.com/aws-amplify/amplify-ui/pull/1010) [`0197ab553`](https://github.com/aws-amplify/amplify-ui/commit/0197ab553c56da415b8db2e85e8c11e9d76e02dc) Thanks [@reesscot](https://github.com/reesscot)! - Remove IdProvider and port useId from radix.

* Updated dependencies [[`1d5b84ac8`](https://github.com/aws-amplify/amplify-ui/commit/1d5b84ac828b962648e9b8600ed96297b1eb0c2a), [`9a095ae46`](https://github.com/aws-amplify/amplify-ui/commit/9a095ae46ee6639f7c8fe9a3a7b2b871449867b8), [`a2fa3603e`](https://github.com/aws-amplify/amplify-ui/commit/a2fa3603eda90a67c9a092ce170e86d13a152e18), [`87af74164`](https://github.com/aws-amplify/amplify-ui/commit/87af74164fb87b61d3c897b03af6e15cf73de79d), [`352a28197`](https://github.com/aws-amplify/amplify-ui/commit/352a281970f2568e7ea035cc89fb51afa31cbfc4)]:
  - @aws-amplify/ui@3.0.7

## 2.1.6

### Patch Changes

- [#1056](https://github.com/aws-amplify/amplify-ui/pull/1056) [`276d7e97a`](https://github.com/aws-amplify/amplify-ui/commit/276d7e97a5f8e722e8010edff25d5992f86c486d) Thanks [@hvergara](https://github.com/hvergara)! - Add white-space style prop

* [#1035](https://github.com/aws-amplify/amplify-ui/pull/1035) [`ea98bea67`](https://github.com/aws-amplify/amplify-ui/commit/ea98bea6730f48b44e5159586b76e60de20f757b) Thanks [@ErikCH](https://github.com/ErikCH)! - Updated externals config in tsup. Removed typo.

- [#1024](https://github.com/aws-amplify/amplify-ui/pull/1024) [`59d8b8efd`](https://github.com/aws-amplify/amplify-ui/commit/59d8b8efdc80deff7c144cbfd0f5040a4ec563c4) Thanks [@reesscot](https://github.com/reesscot)! - Build ui styles into ui-react package to fix [parcel](https://parceljs.org/) and [UMIJS](https://umijs.org/) apps.

- Updated dependencies [[`5bfe1e599`](https://github.com/aws-amplify/amplify-ui/commit/5bfe1e5996536f8b5ada60e16db565dd8fb52f26), [`86e70f8e8`](https://github.com/aws-amplify/amplify-ui/commit/86e70f8e8486e70cccc23d04754e435b184915e8), [`43634b06a`](https://github.com/aws-amplify/amplify-ui/commit/43634b06aaccb1cf33cb18e0e142aee91df54aad), [`d8a422d7c`](https://github.com/aws-amplify/amplify-ui/commit/d8a422d7ce4c62a216a19d127907a2b80eb588ab), [`f9a09df7c`](https://github.com/aws-amplify/amplify-ui/commit/f9a09df7cded5bae1681bc138c048786f3bb75bc)]:
  - @aws-amplify/ui@3.0.6

## 2.1.5

### Patch Changes

- [#953](https://github.com/aws-amplify/amplify-ui/pull/953) [`b1418ba44`](https://github.com/aws-amplify/amplify-ui/commit/b1418ba44958290a33987df8684b06f560638055) Thanks [@reesscot](https://github.com/reesscot)! - Refocus `SearchField` input field on clear button click

- Updated dependencies [[`63f773ee2`](https://github.com/aws-amplify/amplify-ui/commit/63f773ee2af1f55f1891794c1de1398e3eb47d93), [`88b15eb9a`](https://github.com/aws-amplify/amplify-ui/commit/88b15eb9aa608b58ca84fbf60e1beba8090f32e2)]:
  - @aws-amplify/ui@3.0.5

## 2.1.4

### Patch Changes

- [#969](https://github.com/aws-amplify/amplify-ui/pull/969) [`8e1f1f947`](https://github.com/aws-amplify/amplify-ui/commit/8e1f1f94748fac97d3a750174a8e4af9f8592eae) Thanks [@hvergara](https://github.com/hvergara)! - Pin @radix-ui/react-id dependency to 0.1.1

## 2.1.3

### Patch Changes

- [#910](https://github.com/aws-amplify/amplify-ui/pull/910) [`96830f6a3`](https://github.com/aws-amplify/amplify-ui/commit/96830f6a34a417aa9bc6329c839679bd10da84f0) Thanks [@ErikCH](https://github.com/ErikCH)! - Added text to confirm sign up page, so user knows where code was delivered.

* [#912](https://github.com/aws-amplify/amplify-ui/pull/912) [`f447ec75a`](https://github.com/aws-amplify/amplify-ui/commit/f447ec75ac839195c6c5709987ef734f40dc5c76) Thanks [@wlee221](https://github.com/wlee221)! - Fix height jumps between screens and tabs

- [#909](https://github.com/aws-amplify/amplify-ui/pull/909) [`03ed3de02`](https://github.com/aws-amplify/amplify-ui/commit/03ed3de02253b584b507ba548552dde34ae15b1d) Thanks [@reesscot](https://github.com/reesscot)! - Rename PrimitiveWithForwardRef => Primitive type

* [#949](https://github.com/aws-amplify/amplify-ui/pull/949) [`aec9a9479`](https://github.com/aws-amplify/amplify-ui/commit/aec9a9479198240cbe1f535114121e58443f0733) Thanks [@ErikCH](https://github.com/ErikCH)! - Added a way for users to add in custom translations for error messages returned from cognito.

* Updated dependencies [[`72b543ded`](https://github.com/aws-amplify/amplify-ui/commit/72b543ded4c37325a0eb1e4a4803aa88d6d73d5d), [`96830f6a3`](https://github.com/aws-amplify/amplify-ui/commit/96830f6a34a417aa9bc6329c839679bd10da84f0), [`f447ec75a`](https://github.com/aws-amplify/amplify-ui/commit/f447ec75ac839195c6c5709987ef734f40dc5c76), [`712edfccc`](https://github.com/aws-amplify/amplify-ui/commit/712edfccc77a71542166431ba79b25a31d0dca80), [`f1c2d82db`](https://github.com/aws-amplify/amplify-ui/commit/f1c2d82db913be13425e8b4476983d7cf6f55c40)]:
  - @aws-amplify/ui@3.0.4

## 2.1.2

### Patch Changes

- [#861](https://github.com/aws-amplify/amplify-ui/pull/861) [`b21e3e3cb`](https://github.com/aws-amplify/amplify-ui/commit/b21e3e3cb6688238a513f8b125d3be36145dadca) Thanks [@zchenwei](https://github.com/zchenwei)! - Forward ref support for TableRow, Tabs, ToggleButton & ToggleButtonGroup

* [#858](https://github.com/aws-amplify/amplify-ui/pull/858) [`cc4a328a4`](https://github.com/aws-amplify/amplify-ui/commit/cc4a328a4f93888a968c9c51382752998549d917) Thanks [@ErikCH](https://github.com/ErikCH)! - Updated the password validation logic, so errors are only display on blur, or when six or more characters is typed for both the confirm password and password fields.

* Updated dependencies [[`5d115786c`](https://github.com/aws-amplify/amplify-ui/commit/5d115786c23ce6292842467b4417b26a15f60cb5), [`b21e3e3cb`](https://github.com/aws-amplify/amplify-ui/commit/b21e3e3cb6688238a513f8b125d3be36145dadca), [`4a12ed4f5`](https://github.com/aws-amplify/amplify-ui/commit/4a12ed4f580f852de2558ec3fcf0da152f74dbd5), [`907cd18df`](https://github.com/aws-amplify/amplify-ui/commit/907cd18df6213d432a4b3c5d18c848717e3703e4), [`cc4a328a4`](https://github.com/aws-amplify/amplify-ui/commit/cc4a328a4f93888a968c9c51382752998549d917)]:
  - @aws-amplify/ui@3.0.3

## 2.1.1

### Patch Changes

- [#857](https://github.com/aws-amplify/amplify-ui/pull/857) [`cf1a15a69`](https://github.com/aws-amplify/amplify-ui/commit/cf1a15a6900c0e92d6125adbb40ff78776db6f3b) Thanks [@reesscot](https://github.com/reesscot)! - ForwardRef support - Rating

* [#859](https://github.com/aws-amplify/amplify-ui/pull/859) [`62765e70b`](https://github.com/aws-amplify/amplify-ui/commit/62765e70bff5652fef96e132a5bc17f226e041a0) Thanks [@reesscot](https://github.com/reesscot)! - ForwardRef support for StepperField

- [#877](https://github.com/aws-amplify/amplify-ui/pull/877) [`3774e9aac`](https://github.com/aws-amplify/amplify-ui/commit/3774e9aacf787cf0e1cca3b00f32c6606925a797) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Add back in dangerouslySetInnerHTML for theme. Not using this was causing hydration issues in NextJS

* [#866](https://github.com/aws-amplify/amplify-ui/pull/866) [`473f1db6c`](https://github.com/aws-amplify/amplify-ui/commit/473f1db6c42c8221f369e8cdbf6bdd307d09220f) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Making size prop on slider field work like other fields and adding disabled styling.

- [#832](https://github.com/aws-amplify/amplify-ui/pull/832) [`f81aa5917`](https://github.com/aws-amplify/amplify-ui/commit/f81aa5917f08a1ec112d8f889a6c72d2b1acf614) Thanks [@reesscot](https://github.com/reesscot)! - ForwardRef support for PasswordField, FieldGroup, & FieldGroupIconButton primitives.

* [#850](https://github.com/aws-amplify/amplify-ui/pull/850) [`9d7907ec4`](https://github.com/aws-amplify/amplify-ui/commit/9d7907ec44b130e3610c3518e188806b5fe06eec) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Updating radio styles to be consistent with checkbox field.

- [#840](https://github.com/aws-amplify/amplify-ui/pull/840) [`5522af055`](https://github.com/aws-amplify/amplify-ui/commit/5522af0557e93dae5f6a26da327920d030319955) Thanks [@ericclemmons](https://github.com/ericclemmons)! - Pass props from withAuthenticator to Component

* [#860](https://github.com/aws-amplify/amplify-ui/pull/860) [`b0985f662`](https://github.com/aws-amplify/amplify-ui/commit/b0985f662263d1041889fb1523b22fdbdaa92cab) Thanks [@reesscot](https://github.com/reesscot)! - ForwardRef support - SwitchField

- [#862](https://github.com/aws-amplify/amplify-ui/pull/862) [`6c4039590`](https://github.com/aws-amplify/amplify-ui/commit/6c4039590f3bb2acb9af2a1abd1e9c97eeb42cfc) Thanks [@hvergara](https://github.com/hvergara)! - Add DataStore.observeQuery support

* [#854](https://github.com/aws-amplify/amplify-ui/pull/854) [`81c7d5525`](https://github.com/aws-amplify/amplify-ui/commit/81c7d5525bdf19a35d66757b94038144046c8046) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Updating quiet variation of stepper field

- [#842](https://github.com/aws-amplify/amplify-ui/pull/842) [`97ca4e48f`](https://github.com/aws-amplify/amplify-ui/commit/97ca4e48f4d7f73e842072e63d3dcd39d5f983d8) Thanks [@zchenwei](https://github.com/zchenwei)! - ForwardRef support for Alert, ButtonGroup, Expander & ExpanderItem

* [#870](https://github.com/aws-amplify/amplify-ui/pull/870) [`8b6b0088a`](https://github.com/aws-amplify/amplify-ui/commit/8b6b0088a5baee4bfce5222875a807f1934aa6aa) Thanks [@hvergara](https://github.com/hvergara)! - ForwardRef support for Table/TableBody/TableHeader/TableFoot/TableCell

- [#878](https://github.com/aws-amplify/amplify-ui/pull/878) [`5c4935411`](https://github.com/aws-amplify/amplify-ui/commit/5c49354115c06e05e4f9ad50d3d66f8fcb86a7ca) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Updating text colors for better contrast

* [#841](https://github.com/aws-amplify/amplify-ui/pull/841) [`8e36aa4ac`](https://github.com/aws-amplify/amplify-ui/commit/8e36aa4ac40f67308e998b3dbc8fa459aafb2cb9) Thanks [@reesscot](https://github.com/reesscot)! - Update PasswordField to support showPasswordButton ref

- [#831](https://github.com/aws-amplify/amplify-ui/pull/831) [`d2cda9c70`](https://github.com/aws-amplify/amplify-ui/commit/d2cda9c70e20a5a62bc73e25ee80cf835ba85f94) Thanks [@zchenwei](https://github.com/zchenwei)! - ForwardRef support for FieldClearButton and FieldGroupIconButton.

* [#851](https://github.com/aws-amplify/amplify-ui/pull/851) [`8d84116bb`](https://github.com/aws-amplify/amplify-ui/commit/8d84116bb46de5d9f18c18445b947d1f2aede9ad) Thanks [@reesscot](https://github.com/reesscot)! - ForwardRef support for SearchField

- [#873](https://github.com/aws-amplify/amplify-ui/pull/873) [`2a486da75`](https://github.com/aws-amplify/amplify-ui/commit/2a486da75f110fa757f969d744ecf548f04daaa1) Thanks [@reesscot](https://github.com/reesscot)! - ForwardRef support - Menu & Pagination primitives

* [#839](https://github.com/aws-amplify/amplify-ui/pull/839) [`e0aafe759`](https://github.com/aws-amplify/amplify-ui/commit/e0aafe759188ba0e648f3b3e115faa8ca38feb9b) Thanks [@reesscot](https://github.com/reesscot)! - ForwardRef for PhoneNumberField

* Updated dependencies [[`473f1db6c`](https://github.com/aws-amplify/amplify-ui/commit/473f1db6c42c8221f369e8cdbf6bdd307d09220f), [`e77e47fe5`](https://github.com/aws-amplify/amplify-ui/commit/e77e47fe5872961bb70d53bfb54f95d5a9d89ef4), [`9d7907ec4`](https://github.com/aws-amplify/amplify-ui/commit/9d7907ec44b130e3610c3518e188806b5fe06eec), [`81c7d5525`](https://github.com/aws-amplify/amplify-ui/commit/81c7d5525bdf19a35d66757b94038144046c8046), [`97ca4e48f`](https://github.com/aws-amplify/amplify-ui/commit/97ca4e48f4d7f73e842072e63d3dcd39d5f983d8), [`5c4935411`](https://github.com/aws-amplify/amplify-ui/commit/5c49354115c06e05e4f9ad50d3d66f8fcb86a7ca), [`c41c6fad1`](https://github.com/aws-amplify/amplify-ui/commit/c41c6fad138269dc72bec682bf7e15341d09ec8a)]:
  - @aws-amplify/ui@3.0.2

## 2.1.0

### Minor Changes

- [#785](https://github.com/aws-amplify/amplify-ui/pull/785) [`c3a5e175a`](https://github.com/aws-amplify/amplify-ui/commit/c3a5e175a9a20124659a94293dd770e6790859ac) Thanks [@hvergara](https://github.com/hvergara)! - Move hooks to internal module

### Patch Changes

- [#812](https://github.com/aws-amplify/amplify-ui/pull/812) [`e8f998316`](https://github.com/aws-amplify/amplify-ui/commit/e8f998316a307860fc7a11806c8d35a7c8785643) Thanks [@hvergara](https://github.com/hvergara)! - Use Text primitive for Button loading text

* [#781](https://github.com/aws-amplify/amplify-ui/pull/781) [`4c0a44248`](https://github.com/aws-amplify/amplify-ui/commit/4c0a44248b9d3590af32caab0c3790ed673238c7) Thanks [@hvergara](https://github.com/hvergara)! - Restore component catalog nested properties

- [#800](https://github.com/aws-amplify/amplify-ui/pull/800) [`c8ce9445f`](https://github.com/aws-amplify/amplify-ui/commit/c8ce9445f560c4b8e6f80985e9659f268c583768) Thanks [@hvergara](https://github.com/hvergara)! - Add backgroundImage style property

* [#811](https://github.com/aws-amplify/amplify-ui/pull/811) [`63b484714`](https://github.com/aws-amplify/amplify-ui/commit/63b4847147a2499d3532a27c75191b06607ab130) Thanks [@hvergara](https://github.com/hvergara)! - Add missing displayName properties

* Updated dependencies [[`9fd90d45b`](https://github.com/aws-amplify/amplify-ui/commit/9fd90d45b01a38ee6d78f0cb67238b210750115c)]:
  - @aws-amplify/ui@3.0.1

## 2.0.0

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

- [#698](https://github.com/aws-amplify/amplify-ui/pull/698) [`5482edcbb`](https://github.com/aws-amplify/amplify-ui/commit/5482edcbb8fa1d5d99988d3eada2a15316e7ec69) Thanks [@reesscot](https://github.com/reesscot)! - Add forwardRef support to Button & View

- [#716](https://github.com/aws-amplify/amplify-ui/pull/716) [`e155ef0be`](https://github.com/aws-amplify/amplify-ui/commit/e155ef0be2db65fc126021b8969fd7fd151f26c7) Thanks [@reesscot](https://github.com/reesscot)! - Remove AmplifyProvider custom components feature

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

- [#653](https://github.com/aws-amplify/amplify-ui/pull/653) [`70552a4cc`](https://github.com/aws-amplify/amplify-ui/commit/70552a4cc4d0e532dfaaa22314397690567b444c) Thanks [@reesscot](https://github.com/reesscot)! - Icon size now matches parent font-size. Allows customers to more easily use icons alongsize Headings, Buttons, etc.

  Example:

  ```
  <Button gap="0.1rem" size="small">
      <IconSave /> Save
  </Button>
  ```

- [#582](https://github.com/aws-amplify/amplify-ui/pull/582) [`3143deff1`](https://github.com/aws-amplify/amplify-ui/commit/3143deff199a9aab367f253020205d3e2f25fc5b) Thanks [@ericclemmons](https://github.com/ericclemmons)! - AmplifyProvider accepts a partial list of primitives as `components`:

  ```js
  const App = () => {
    const {
      components: { Heading },
    } = useAmplify();

    return <Heading>Howdy</Heading>;
  };

  <AmplifyProvider
    components={{
      Heading({ children }) {
        return <h1>{children}</h1>;
      },
    }}
  >
    <App />
  </AmplifyProvider>;
  ```

### Patch Changes

- [#737](https://github.com/aws-amplify/amplify-ui/pull/737) [`8f0301f0b`](https://github.com/aws-amplify/amplify-ui/commit/8f0301f0b4677b1886f4a450207cfc39b5245f9d) Thanks [@reesscot](https://github.com/reesscot)! - ForwardRef support - CountryCode, SelectField, and SliderField

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

- [#617](https://github.com/aws-amplify/amplify-ui/pull/617) [`77fa42da5`](https://github.com/aws-amplify/amplify-ui/commit/77fa42da560f617a4f89a828e93aeb96a12e280f) Thanks [@hvergara](https://github.com/hvergara)! - Fix primitives catalog generator

- [#720](https://github.com/aws-amplify/amplify-ui/pull/720) [`84a86b4ef`](https://github.com/aws-amplify/amplify-ui/commit/84a86b4ef7c3c94ebcb371e574d020af38b3e0da) Thanks [@reesscot](https://github.com/reesscot)! - ForwardRef support - Flex and Grid

- [#761](https://github.com/aws-amplify/amplify-ui/pull/761) [`a82e422f3`](https://github.com/aws-amplify/amplify-ui/commit/a82e422f321e150384dfc76be392f32aaee94524) Thanks [@reesscot](https://github.com/reesscot)! - ForwardRef support for TextField

- [#709](https://github.com/aws-amplify/amplify-ui/pull/709) [`3cc1c15d7`](https://github.com/aws-amplify/amplify-ui/commit/3cc1c15d70711823e57c3c495f205f41fb74db27) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Building icons from Figma source now.

- [#618](https://github.com/aws-amplify/amplify-ui/pull/618) [`943d4b661`](https://github.com/aws-amplify/amplify-ui/commit/943d4b6614e4cac0131d52421051d210b1e2db68) Thanks [@hvergara](https://github.com/hvergara)! - Make style prop types more flexible

- [#636](https://github.com/aws-amplify/amplify-ui/pull/636) [`5e31719f1`](https://github.com/aws-amplify/amplify-ui/commit/5e31719f1fcd696718ef38ba64e4faef34d74add) Thanks [@hvergara](https://github.com/hvergara)! - useStorageURL React hook

- [#725](https://github.com/aws-amplify/amplify-ui/pull/725) [`8f4d8129c`](https://github.com/aws-amplify/amplify-ui/commit/8f4d8129cee031dfa92c6ec48f94ec5e761da2fa) Thanks [@reesscot](https://github.com/reesscot)! - ForwardRef support - misc view-based primitives

- [#601](https://github.com/aws-amplify/amplify-ui/pull/601) [`f6d144dc3`](https://github.com/aws-amplify/amplify-ui/commit/f6d144dc3eada5e289878d8690d9117f7cce5b50) Thanks [@hvergara](https://github.com/hvergara)! - Add useAuth React hook

- [#731](https://github.com/aws-amplify/amplify-ui/pull/731) [`c5ae2f44a`](https://github.com/aws-amplify/amplify-ui/commit/c5ae2f44ae19c379bae400fe4f91c3afed054d88) Thanks [@reesscot](https://github.com/reesscot)! - ForwardRef support - textarea, checkbox, radio

- [#568](https://github.com/aws-amplify/amplify-ui/pull/568) [`36d256b02`](https://github.com/aws-amplify/amplify-ui/commit/36d256b0226adb5d5ddaca33bbe76ba179c2f9f0) Thanks [@slaymance](https://github.com/slaymance)! - Adds React Table primitive

- [#727](https://github.com/aws-amplify/amplify-ui/pull/727) [`2b2ae8469`](https://github.com/aws-amplify/amplify-ui/commit/2b2ae84695e163309529a02325e70c4416b2a5f6) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - \* Divider component has more theming options for the border style, color, and width.

  - Fixing vertical divider
  - Improving Divider docs

- [#721](https://github.com/aws-amplify/amplify-ui/pull/721) [`e90085e1d`](https://github.com/aws-amplify/amplify-ui/commit/e90085e1d6acaba91b192972599dd5f09b91230a) Thanks [@reesscot](https://github.com/reesscot)! - Forward ref inputs

- [#695](https://github.com/aws-amplify/amplify-ui/pull/695) [`d5009572c`](https://github.com/aws-amplify/amplify-ui/commit/d5009572ca4a3bd04114dbda57b9a49f4728468a) Thanks [@ericclemmons](https://github.com/ericclemmons)! - ## Header & Footer Slots

  - Add Header slot above the Authenticator
  - Add Footer slot below the Authenticator
  - Add Sign In Header slot above the Sign In form
  - Add Sign In Footer slot below the Sign In form
  - Add Sign Up Header slot above the Sign Up form
  - Add Sign Up Footer slot below the Sign Up form

- [#719](https://github.com/aws-amplify/amplify-ui/pull/719) [`df2bcb749`](https://github.com/aws-amplify/amplify-ui/commit/df2bcb749b3dcbffb8709ce2b8b106c6225868ee) Thanks [@reesscot](https://github.com/reesscot)! - ForwardRef support - base primitives

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

- [#638](https://github.com/aws-amplify/amplify-ui/pull/638) [`d71e65609`](https://github.com/aws-amplify/amplify-ui/commit/d71e656098bde4ee43e294a05503dc9aadefeec1) Thanks [@ericclemmons](https://github.com/ericclemmons)! - Fix getOverrideProps to return all, not just 2

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

- [#748](https://github.com/aws-amplify/amplify-ui/pull/748) [`ca04c8dbc`](https://github.com/aws-amplify/amplify-ui/commit/ca04c8dbca936137177e406054e18f8077a6e921) Thanks [@reesscot](https://github.com/reesscot)! - Remove internal fieldgroup export

- Updated dependencies [[`bba3242af`](https://github.com/aws-amplify/amplify-ui/commit/bba3242afba9a54e12b730edbfa1006701a610fc), [`f84e9949b`](https://github.com/aws-amplify/amplify-ui/commit/f84e9949bd98b20fe8d1dff85e30ae69f2356351), [`e76c5ac17`](https://github.com/aws-amplify/amplify-ui/commit/e76c5ac1782561f7b53f19e1fc9e99d2685380d0), [`81169c66e`](https://github.com/aws-amplify/amplify-ui/commit/81169c66ed9591497214860ac95f69504edea1b0), [`3cc1c15d7`](https://github.com/aws-amplify/amplify-ui/commit/3cc1c15d70711823e57c3c495f205f41fb74db27), [`2b2ae8469`](https://github.com/aws-amplify/amplify-ui/commit/2b2ae84695e163309529a02325e70c4416b2a5f6), [`b46597cef`](https://github.com/aws-amplify/amplify-ui/commit/b46597cefb013bfed5345d3ecdfd96649045caca), [`edea9ffaa`](https://github.com/aws-amplify/amplify-ui/commit/edea9ffaa41e2ae051f38e75434b56bb75ed4ff9), [`bd3e09a09`](https://github.com/aws-amplify/amplify-ui/commit/bd3e09a09988af5fa803fa97a25956ea7e9144f7), [`70552a4cc`](https://github.com/aws-amplify/amplify-ui/commit/70552a4cc4d0e532dfaaa22314397690567b444c), [`beb9b49b5`](https://github.com/aws-amplify/amplify-ui/commit/beb9b49b541f39305d595d3e587b6c65c54a3584), [`5257a3109`](https://github.com/aws-amplify/amplify-ui/commit/5257a31092b46a10abda99307779592b63d10890), [`3ead9c629`](https://github.com/aws-amplify/amplify-ui/commit/3ead9c62960c052967376b22922908dbe57bddaa)]:
  - @aws-amplify/ui@3.0.0
