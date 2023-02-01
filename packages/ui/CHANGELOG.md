# @aws-amplify/ui

## 5.5.3

### Patch Changes

- [#3333](https://github.com/aws-amplify/amplify-ui/pull/3333) [`4ba0fb5c1`](https://github.com/aws-amplify/amplify-ui/commit/4ba0fb5c13484a36c8f44be5eb41313bf3d676cc) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(authenticator): migrate totpSecretCode generation to state machine

- [#3287](https://github.com/aws-amplify/amplify-ui/pull/3287) [`412538be9`](https://github.com/aws-amplify/amplify-ui/commit/412538be9e37a8dec7cb5e57281895a5b3b63184) Thanks [@zchenwei](https://github.com/zchenwei)! - build: updates to support Node ESM

  Confirmed that both #3155 and #3206 are fixed without having to apply any workaround

  Also, test out the changes with the following frameworks/tools:

  | Name               | Tested? | Notes                                                                                                                                         |
  | ------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
  | Next.js@11, 12, 13 | ✅      |                                                                                                                                               |
  | Gatsby             | ✅      | Works with ESM. Not support loading CJS build                                                                                                 |
  | Remix              | ✅      |                                                                                                                                               |
  | Astro              | ✅      | Works with ESM. Not support loading CJS build                                                                                                 |
  | webpack            | ✅      |                                                                                                                                               |
  | Vite               | ✅      | Works with ESM. Not support loading CJS build                                                                                                 |
  | Rollup             | ✅      | Works with ESM. Not support loading CJS build                                                                                                 |
  | esbuild            | ✅      |                                                                                                                                               |
  | Parcel             | ✅      |                                                                                                                                               |
  | Snowpack           | ✅      | Need `--polyfill-node` to fix JS incompatibility in dev mode, but is a known [issue](https://github.com/FredKSchott/snowpack/discussions/718) |

- [#3291](https://github.com/aws-amplify/amplify-ui/pull/3291) [`9ce2d01b0`](https://github.com/aws-amplify/amplify-ui/commit/9ce2d01b09e2f7aa0b218a97bb829a4210350a0a) Thanks [@ioanabrooks](https://github.com/ioanabrooks)! - chore(ui,ui-react-core): Add type guard utils

- [#3327](https://github.com/aws-amplify/amplify-ui/pull/3327) [`13d0882a8`](https://github.com/aws-amplify/amplify-ui/commit/13d0882a8fe3a9ef63e4b217c5f67cef2c75e148) Thanks [@wlee221](https://github.com/wlee221)! - fix(rwa): improve default behavior handling for custom formFields.

  Previously, adding custom formFields for fields that are not in `signUpAttributes` configuration wouldn't get any default values, which could lead to broken UI.

  This commit improves default handling by applying defaults to all known auth field (birthdate, first_name, etc) to custom formField options.

## 5.5.2

### Patch Changes

- [#3330](https://github.com/aws-amplify/amplify-ui/pull/3330) [`57f1a3f43`](https://github.com/aws-amplify/amplify-ui/commit/57f1a3f438b8288ffda46764f7a87e1739e61313) Thanks [@ioanabrooks](https://github.com/ioanabrooks)! - chore(ui): Fixes an issue where the input primitive doesn't render properly for calendar types.

- [#3325](https://github.com/aws-amplify/amplify-ui/pull/3325) [`dd9de348a`](https://github.com/aws-amplify/amplify-ui/commit/dd9de348abcafdcd721600f543d58353957dac25) Thanks [@joebuono](https://github.com/joebuono)! - fix(ui): Translate 'or' text for FederatedSignIn

- [#3322](https://github.com/aws-amplify/amplify-ui/pull/3322) [`4d652033e`](https://github.com/aws-amplify/amplify-ui/commit/4d652033e120daa82665b4bb4035b56fa8d33bf8) Thanks [@ErikCH](https://github.com/ErikCH)! - Updated functionality so all file uploader uploads will have the correct type matching the file.type.

## 5.5.1

### Patch Changes

- [#3283](https://github.com/aws-amplify/amplify-ui/pull/3283) [`98a632137`](https://github.com/aws-amplify/amplify-ui/commit/98a63213766d598ed6a64a06b53fffc408d547fd) Thanks [@wlee221](https://github.com/wlee221)! - Trim non-password fields on Authenticator forms. This will prevent unnecessary validation messages from showing up.

- [#3284](https://github.com/aws-amplify/amplify-ui/pull/3284) [`01912077c`](https://github.com/aws-amplify/amplify-ui/commit/01912077c6d4fcdd3cbe9b6de2bb53fc490d0f41) Thanks [@ErikCH](https://github.com/ErikCH)! - Updated text to be more verbose for the max file size error for the file uploader component.

## 5.5.0

### Minor Changes

- [#3242](https://github.com/aws-amplify/amplify-ui/pull/3242) [`59321c9cc`](https://github.com/aws-amplify/amplify-ui/commit/59321c9cc15f8243edd6f5dd0113e7c396f7b488) Thanks [@vitaliikravets](https://github.com/vitaliikravets)! - Add support of Ukrainian language to Authenticator

### Patch Changes

- [#3282](https://github.com/aws-amplify/amplify-ui/pull/3282) [`9b09654a7`](https://github.com/aws-amplify/amplify-ui/commit/9b09654a7e47ab70fb6d6b31f06de0289f25bbe9) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(authenticator): remove order keys from formFields after sorting

## 5.4.2

### Patch Changes

- [#3201](https://github.com/aws-amplify/amplify-ui/pull/3201) [`2912fe3af`](https://github.com/aws-amplify/amplify-ui/commit/2912fe3af6f29cde562a35e931bc2e3a0de470ed) Thanks [@ErikCH](https://github.com/ErikCH)! - Updated logic so users will now receive a code, when they are displayed the reset password page that asks for a code after signing in. This occurs when the users are imported into Cognito.

- [#3238](https://github.com/aws-amplify/amplify-ui/pull/3238) [`ea1b10a2c`](https://github.com/aws-amplify/amplify-ui/commit/ea1b10a2c802b08ee019669ba442d7446f23bd05) Thanks [@wlee221](https://github.com/wlee221)! - fix(react): Manually add `overflow: clip` to remediate chrome 108 breaking change.

  Ref: https://developer.chrome.com/blog/overflow-replaced-elements/

## 5.4.1

### Patch Changes

- [#3153](https://github.com/aws-amplify/amplify-ui/pull/3153) [`db8f019a7`](https://github.com/aws-amplify/amplify-ui/commit/db8f019a7737c4762ff19c1b03c7c06625277989) Thanks [@joebuono](https://github.com/joebuono)! - fix(ui): Add missing Authenticator translations

## 5.4.0

### Minor Changes

- [#3158](https://github.com/aws-amplify/amplify-ui/pull/3158) [`0bbb9980c`](https://github.com/aws-amplify/amplify-ui/commit/0bbb9980c55f212ce54c5449a2dcc64bfce6ca8f) Thanks [@nandanbhat](https://github.com/nandanbhat)! - feat(Authenticator): Enable password validation on resetPassword and forceNewPassword screen

### Patch Changes

- [#2830](https://github.com/aws-amplify/amplify-ui/pull/2830) [`168185211`](https://github.com/aws-amplify/amplify-ui/commit/1681852112748717e44d199d0c62de83ab1541ca) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - chore(authenticator): adding package version to cognito user agent string

## 5.3.1

### Patch Changes

- [#2907](https://github.com/aws-amplify/amplify-ui/pull/2907) [`c31a9bf69`](https://github.com/aws-amplify/amplify-ui/commit/c31a9bf693b3507e8a2b9d0790423a9f64e533cf) Thanks [@NivBraz](https://github.com/NivBraz)! - Added Hebrew as an option for Authenticator

- [#3029](https://github.com/aws-amplify/amplify-ui/pull/3029) [`1847840c0`](https://github.com/aws-amplify/amplify-ui/commit/1847840c00c0f9f7be31e9735c31bd596f4056e9) Thanks [@hugobeaujour](https://github.com/hugobeaujour)! - chore: add translation texts for French

## 5.3.0

### Minor Changes

- [#3108](https://github.com/aws-amplify/amplify-ui/pull/3108) [`3653c8f39`](https://github.com/aws-amplify/amplify-ui/commit/3653c8f3914e3dc51fbcc328e59326afb422aa68) Thanks [@wlee221](https://github.com/wlee221)! - Adds `ChangePassword` and `DeleteUser` Account Settings components. These components are standalone components that add account management flows after users authenticate.

  These components are in developer preview. Please see https://ui.docs.amplify.aws/react/connected-components/account-settings to learn more.

- [#3133](https://github.com/aws-amplify/amplify-ui/pull/3133) [`4b2dbeb18`](https://github.com/aws-amplify/amplify-ui/commit/4b2dbeb18c79175bc0bfe0cf50a0e9d0429544d6) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - feat(button): add `warning` and `destructive` variations to the React Button component

### Patch Changes

- [#3120](https://github.com/aws-amplify/amplify-ui/pull/3120) [`145d0b5f5`](https://github.com/aws-amplify/amplify-ui/commit/145d0b5f596ff7c9f623898af0bb3836516c51fe) Thanks [@zchenwei](https://github.com/zchenwei)! - style: disable scroll chaining on Autocomplete menu to improve UX

- [#3126](https://github.com/aws-amplify/amplify-ui/pull/3126) [`e3867e369`](https://github.com/aws-amplify/amplify-ui/commit/e3867e369b4aeb5b240916cb88105353483b9b7c) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - fix(primitives): fix default text color for alert primitive

- [#3129](https://github.com/aws-amplify/amplify-ui/pull/3129) [`0377bccfb`](https://github.com/aws-amplify/amplify-ui/commit/0377bccfbea55606d007ae914a5d7f202bf87478) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - fix(theme): making all component tokens optional

## 5.2.0

### Minor Changes

- [#3028](https://github.com/aws-amplify/amplify-ui/pull/3028) [`7f4248db4`](https://github.com/aws-amplify/amplify-ui/commit/7f4248db457639d1bb34c8318569ab047aa80c5e) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Added the FileUploader component. The File Uploader lets your users upload files to the cloud. For more information follow the instructions. https://ui.docs.amplify.aws/react/connected-components/storage/fileuploader

### Patch Changes

- [#3001](https://github.com/aws-amplify/amplify-ui/pull/3001) [`b416aca55`](https://github.com/aws-amplify/amplify-ui/commit/b416aca553649d37e2686c02f3223a77bf36ed98) Thanks [@SilverLinings89](https://github.com/SilverLinings89)! - Add export dist/styles.css to fix missing export error. See issue #2999.

- [#3104](https://github.com/aws-amplify/amplify-ui/pull/3104) [`8e5e696f4`](https://github.com/aws-amplify/amplify-ui/commit/8e5e696f4d0ae61e74537cdfe4395005cc21ce12) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - chore(react): adding types to exports in package json to support TS moduleResolution for node16/nodenext

- [#3074](https://github.com/aws-amplify/amplify-ui/pull/3074) [`a5b8696bc`](https://github.com/aws-amplify/amplify-ui/commit/a5b8696bc41d8cb2ff2c6fc39f8fd1afc349955a) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - fix(primitives): fix radio button sizing issue #2756

## 5.1.1

### Patch Changes

- [#3071](https://github.com/aws-amplify/amplify-ui/pull/3071) [`d062010f4`](https://github.com/aws-amplify/amplify-ui/commit/d062010f4690321129c1fb1f777a7df82898640b) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - fix(theme): update types for `ThemeProvider` to accept output of `createTheme`

## 5.1.0

### Minor Changes

- [#3067](https://github.com/aws-amplify/amplify-ui/pull/3067) [`ce3378ee9`](https://github.com/aws-amplify/amplify-ui/commit/ce3378ee90c1545bb41551817bee8662629920c1) Thanks [@joebuono](https://github.com/joebuono)! - feat: Add React Native Authenticator

### Patch Changes

- [#3013](https://github.com/aws-amplify/amplify-ui/pull/3013) [`0234889ea`](https://github.com/aws-amplify/amplify-ui/commit/0234889eaf6dd8337e1140ee993be0380e80a5bf) Thanks [@zchenwei](https://github.com/zchenwei)! - fix: fix autocomplete popup render issue in Safari and Firefox and bump its z-index

## 5.0.0

### Major Changes

- [#2828](https://github.com/aws-amplify/amplify-ui/pull/2828) [`82903f7bb`](https://github.com/aws-amplify/amplify-ui/commit/82903f7bbc0325e709fe48b851e8752cde3c309a) Thanks [@calebpollman](https://github.com/calebpollman)! - feat(next-release): render Authenticator field labels

- [#2558](https://github.com/aws-amplify/amplify-ui/pull/2558) [`d90b148c0`](https://github.com/aws-amplify/amplify-ui/commit/d90b148c0e06b3321f4f05fad2b32ef52c04214d) Thanks [@reesscot](https://github.com/reesscot)! - chore: upgrade radix to 1.0

  Fixes error messages during `npm install` related to React 18. See Migration guide for more information:
  https://ui.docs.amplify.aws/react/getting-started/migration

### Patch Changes

- [#2877](https://github.com/aws-amplify/amplify-ui/pull/2877) [`ab8942c54`](https://github.com/aws-amplify/amplify-ui/commit/ab8942c54d0d758d79521ba1a9bf06bf28e30bc7) Thanks [@ErikCH](https://github.com/ErikCH)! - **BREAKING**: When overriding `Auth.signUp`, update the override function call to include the `autoSignIn` option set to enabled. This is now required.

  ```diff
   async handleSignUp(formData) {
    let { username, password, attributes } = formData;
    // custom username
    username = username.toLowerCase();
    attributes.email = attributes.email.toLowerCase();
    return Auth.signUp({
      username,
      password,
      attributes,
  +   autoSignIn: {
  +     enabled: true
  +   }
    });
  }

  ```

## 4.1.0

### Minor Changes

- [#2708](https://github.com/aws-amplify/amplify-ui/pull/2708) [`702a35738`](https://github.com/aws-amplify/amplify-ui/commit/702a3573850639c492c51ce10e27e194d720d5ac) Thanks [@zchenwei](https://github.com/zchenwei)! - feat: add Autocomplete primitive

  **Example**

  ```jsx
  // Uncontrolled component
  import { Autocomplete } from '@aws-amplify/ui-react';
  import * as React from 'react';

  const options = [
    { id: 'apple', label: 'apple' },
    { id: 'banana', label: 'banana' },
    { id: 'cherry', label: 'cherry' },
    { id: 'grape', label: 'grape' },
    { id: 'kiwis', label: 'kiwis' },
    { id: 'lemon', label: 'lemon' },
    { id: 'mango', label: 'mango' },
    { id: 'orange', label: 'orange' },
    { id: 'strawberry', label: 'strawberry' },
  ];

  export const AutocompleteUncontrolledExample = () => {
    return <Autocomplete label="Uncontrolled autocomplete" options={options} />;
  };
  ```

  ```jsx
  // Controlled component
  import { Autocomplete } from '@aws-amplify/ui-react';
  import * as React from 'react';

  const options = [
    { id: 'apple', label: 'apple' },
    { id: 'banana', label: 'banana' },
    { id: 'cherry', label: 'cherry' },
    { id: 'grape', label: 'grape' },
    { id: 'kiwis', label: 'kiwis' },
    { id: 'lemon', label: 'lemon' },
    { id: 'mango', label: 'mango' },
    { id: 'orange', label: 'orange' },
    { id: 'strawberry', label: 'strawberry' },
  ];

  export const AutocompleteControlledExample = () => {
    const [value, setValue] = React.useState('');

    const onChange = (event) => {
      setValue(event.target.value);
    };

    // Set up onSelect
    const onSelect = (option) => {
      const { label } = option;
      setValue(label);
    };

    // Set up onClear
    const onClear = () => {
      setValue('');
    };

    return (
      <Autocomplete
        label="Controlled autocomplete"
        options={options}
        value={value}
        onChange={onChange}
        onClear={onClear}
        onSelect={onSelect}
      />
    );
  };
  ```

### Patch Changes

- [#2881](https://github.com/aws-amplify/amplify-ui/pull/2881) [`0935da51a`](https://github.com/aws-amplify/amplify-ui/commit/0935da51ac04334e458339da2bf0ef72f248cf26) Thanks [@francisGolden](https://github.com/francisGolden)! - Fix italian grammar in translation and improve accuracy

## 4.0.1

### Patch Changes

- [#2751](https://github.com/aws-amplify/amplify-ui/pull/2751) [`05bb8c792`](https://github.com/aws-amplify/amplify-ui/commit/05bb8c79264e37c9d0592405f4a33e9a309de732) Thanks [@wlee221](https://github.com/wlee221)! - (Internal patch): Move `ComponentClassName` to `@aws-amplify/ui`

- [#2637](https://github.com/aws-amplify/amplify-ui/pull/2637) [`5bd5e695a`](https://github.com/aws-amplify/amplify-ui/commit/5bd5e695a71e0cbef85a17f4ee1c851c84b4d51d) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Add error state for SwitchField.

  ```jsx
  <SwitchField
    label="I agree to the terms and conditions"
    labelPosition="end"
    isChecked={isChecked}
    hasError={hasError}
    errorMessage="Please agree to the terms and conditions"
    onChange={(e) => {
      setIsChecked(e.target.checked);
    }}
  />
  ```

- [#2781](https://github.com/aws-amplify/amplify-ui/pull/2781) [`6aa1132e7`](https://github.com/aws-amplify/amplify-ui/commit/6aa1132e760eef892021dbadafa63456c1c3a39d) Thanks [@reesscot](https://github.com/reesscot)! - fix: ensure TextField, TextAreaField, StepperField show full width

- [#2767](https://github.com/aws-amplify/amplify-ui/pull/2767) [`ea1ea36a6`](https://github.com/aws-amplify/amplify-ui/commit/ea1ea36a650bd6677c97556b8c1e85705cd37a35) Thanks [@reesscot](https://github.com/reesscot)! - fix: issue where custom theme via ThemeProvider cannot override default font

## 4.0.0

### Major Changes

- [#2702](https://github.com/aws-amplify/amplify-ui/pull/2702) [`1b1567c0c`](https://github.com/aws-amplify/amplify-ui/commit/1b1567c0c7788120ca4e7c4533228d2672dda906) Thanks [@slaymance](https://github.com/slaymance)! - Make xstate core dependency of only framework libraries

## 3.14.0

### Minor Changes

- [#2690](https://github.com/aws-amplify/amplify-ui/pull/2690) [`42143228f`](https://github.com/aws-amplify/amplify-ui/commit/42143228fd8e99500e05fee34cee3f8067189c4e) Thanks [@calebpollman](https://github.com/calebpollman)! - Bump @aws-amplify/ui minor version

## 3.13.4

### Patch Changes

- [#2616](https://github.com/aws-amplify/amplify-ui/pull/2616) [`83bcc0844`](https://github.com/aws-amplify/amplify-ui/commit/83bcc0844eb1049ab49ff4f79280605ef31230d6) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(ui-react, ui): expose Authenticator types, add AmplifyUser interface

## 3.13.3

### Patch Changes

- [#2569](https://github.com/aws-amplify/amplify-ui/pull/2569) [`e2429807b`](https://github.com/aws-amplify/amplify-ui/commit/e2429807bcc13b7c2dfe2c2947be8e790eea4d9d) Thanks [@wlee221](https://github.com/wlee221)! - Set `predictableActionArguments` to true in Authenticator state machine. This is an internal change only.

## 3.13.2

### Patch Changes

- [#2544](https://github.com/aws-amplify/amplify-ui/pull/2544) [`35dae2a3d`](https://github.com/aws-amplify/amplify-ui/commit/35dae2a3d7ec392c60a7302e3673e59a0e42b7aa) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(rwa): convert AuthChallengeNames enum to string union

* [#2538](https://github.com/aws-amplify/amplify-ui/pull/2538) [`4a4b5c93d`](https://github.com/aws-amplify/amplify-ui/commit/4a4b5c93d37b66c845cbf20dac1e09e6e7931610) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(rwa): update user lookup in getServiceFacade, authenticator util typing and useAuthenticator updates

- [#2539](https://github.com/aws-amplify/amplify-ui/pull/2539) [`ba9818fb7`](https://github.com/aws-amplify/amplify-ui/commit/ba9818fb7acc727eaf7968aad8ff4dd1ab36327b) Thanks [@ErikCH](https://github.com/ErikCH)! - Fixed bug in Angular Authenticator that caused the Setup TOTP page to not show the correct totpIssuer and totpUsername in the QR code when overwritten by formFields. Refactored and added in Jest tests for Angular.

## 3.13.1

### Patch Changes

- [#2514](https://github.com/aws-amplify/amplify-ui/pull/2514) [`b60fec2c4`](https://github.com/aws-amplify/amplify-ui/commit/b60fec2c451b31946f893efbf23710c7631db122) Thanks [@zchenwei](https://github.com/zchenwei)! - chore: add indeterminate icon svg

## 3.13.0

### Minor Changes

- [#2300](https://github.com/aws-amplify/amplify-ui/pull/2300) [`eae79ae15`](https://github.com/aws-amplify/amplify-ui/commit/eae79ae1529b9a920d704cb12e92addb352d0c40) Thanks [@zchenwei](https://github.com/zchenwei)! - feat: adding indeterminate state checkbox

  Users can create an indeterminate `CheckboxField` by setting `isIndeterminate` prop to `true`.

  **_Example_**

  ```jsx
  import * as React from 'react';

  import { CheckboxField, Flex, View } from '@aws-amplify/ui-react';

  export const CheckboxFieldIndeterminateExample = () => {
    const [checkedItems, setCheckedItems] = React.useState([false, false]);
    const checkedItemsRef = React.useRef(null);
    const allChecked = checkedItems.every(Boolean);
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

    if (isIndeterminate) {
      checkedItemsRef.current = [...checkedItems];
    }
    const handleAllPetsChange = () => {
      if (isIndeterminate) {
        setCheckedItems([true, true]);
      } else if (allChecked) {
        setCheckedItems([false, false]);
      } else if (checkedItemsRef.current) {
        setCheckedItems(checkedItemsRef.current);
      } else {
        setCheckedItems([true, true]);
      }
    };

    const handleCatChange = (e) => {
      const newCheckedItems = [e.target.checked, checkedItems[1]];
      if (!newCheckedItems.some(Boolean) || newCheckedItems.every(Boolean)) {
        checkedItemsRef.current = null;
      }
      setCheckedItems(newCheckedItems);
    };

    const handleDogChange = (e) => {
      const newCheckedItems = [checkedItems[0], e.target.checked];
      if (!newCheckedItems.some(Boolean) || newCheckedItems.every(Boolean)) {
        checkedItemsRef.current = null;
      }
      setCheckedItems(newCheckedItems);
    };

    return (
      <Flex direction="column" gap="0">
        <CheckboxField
          name="all-pets"
          label="All Pets"
          value="allPets"
          checked={allChecked}
          isIndeterminate={isIndeterminate}
          onChange={handleAllPetsChange}
        />
        <View paddingLeft="25px">
          <CheckboxField
            name="cat"
            label="Cat"
            value="cat"
            checked={checkedItems[0]}
            onChange={handleCatChange}
          />
          <CheckboxField
            name="dog"
            label="Dog"
            value="dog"
            checked={checkedItems[1]}
            onChange={handleDogChange}
          />
        </View>
      </Flex>
    );
  };
  ```

### Patch Changes

- [#2432](https://github.com/aws-amplify/amplify-ui/pull/2432) [`b3e6a97e8`](https://github.com/aws-amplify/amplify-ui/commit/b3e6a97e8e17f6b822af0387e3c543c50aea7c64) Thanks [@wlee221](https://github.com/wlee221)! - Bump xstate to ^4.33.0. This will resolve "No implementation found" warnings.

* [#2431](https://github.com/aws-amplify/amplify-ui/pull/2431) [`1cfa1a054`](https://github.com/aws-amplify/amplify-ui/commit/1cfa1a054451a75738f4011c4200c34208285b5b) Thanks [@ioanabrooks](https://github.com/ioanabrooks)! - This change adds a base background color for the SearchField component's button.

- [#2398](https://github.com/aws-amplify/amplify-ui/pull/2398) [`e25bc4269`](https://github.com/aws-amplify/amplify-ui/commit/e25bc42693cc4fa1cdcf7ad2fe7034ff44fbb18e) Thanks [@zchenwei](https://github.com/zchenwei)! - fix: add missing token for default font size for SwitchField

* [#2386](https://github.com/aws-amplify/amplify-ui/pull/2386) [`1f358d8fa`](https://github.com/aws-amplify/amplify-ui/commit/1f358d8fa18367020d0c41b74dcce1ba73974376) Thanks [@joebuono](https://github.com/joebuono)! - fix(ui): Apply styling to disabled SelectField options in Firefox

## 3.12.5

### Patch Changes

- [#2343](https://github.com/aws-amplify/amplify-ui/pull/2343) [`de1c874f2`](https://github.com/aws-amplify/amplify-ui/commit/de1c874f294a3b21cc9d7a97b310d2744d18b065) Thanks [@ErikCH](https://github.com/ErikCH)! - Added 'Dismiss alert' to the set of dictionary keys for the authenticator

* [#2367](https://github.com/aws-amplify/amplify-ui/pull/2367) [`3c468a0f3`](https://github.com/aws-amplify/amplify-ui/commit/3c468a0f34fb8f747b925dd1a66a0f0f0117436a) Thanks [@joebuono](https://github.com/joebuono)! - fix(ui): Add missing Authenticator translations for all available languages

- [#2347](https://github.com/aws-amplify/amplify-ui/pull/2347) [`1fcfa3c02`](https://github.com/aws-amplify/amplify-ui/commit/1fcfa3c02dc8eedb2acdc7425be7311f5b1accef) Thanks [@ioanabrooks](https://github.com/ioanabrooks)! - fix(ui-react): Fixes an issue where TextAreaField does not show line breaks properly in Firefox.

* [#2371](https://github.com/aws-amplify/amplify-ui/pull/2371) [`adc9ff6e3`](https://github.com/aws-amplify/amplify-ui/commit/adc9ff6e3c7d1408edb7de58c1858ddc4f47d1c7) Thanks [@cshfang](https://github.com/cshfang)! - fix(ui-react): Fixes an issue where the isTruncated prop of the Heading component was not properly applying a truncation.

## 3.12.4

### Patch Changes

- [#2287](https://github.com/aws-amplify/amplify-ui/pull/2287) [`8418028a3`](https://github.com/aws-amplify/amplify-ui/commit/8418028a3218ea20ccb2ac949b1e6e33c57239e6) Thanks [@ErikCH](https://github.com/ErikCH)! - When first setting up TOTP with MFA the Authenticator is not returning the correct user object. This object did not contain the correct methods, and causes an error if you try to access those methods. This fix will now retrieve the correct user object when a user first sets up MFA TOTP.

* [#2330](https://github.com/aws-amplify/amplify-ui/pull/2330) [`f067420b9`](https://github.com/aws-amplify/amplify-ui/commit/f067420b9a39807a46bd409dce17f2bcc297218e) Thanks [@ioanabrooks](https://github.com/ioanabrooks)! - ui-react(fix): Update StepperField disabled buttons styles, making them easier to see.

- [#2304](https://github.com/aws-amplify/amplify-ui/pull/2304) [`d9dd9220c`](https://github.com/aws-amplify/amplify-ui/commit/d9dd9220c367bc476fddb36e89daff75d62e7f31) Thanks [@tmokmss](https://github.com/tmokmss)! - chore: add translation texts for Japanese

## 3.12.3

### Patch Changes

- [#2242](https://github.com/aws-amplify/amplify-ui/pull/2242) [`bde5e7a48`](https://github.com/aws-amplify/amplify-ui/commit/bde5e7a48a144bf76f77b1b747dcc912ce8cec6e) Thanks [@pedrodotmc](https://github.com/pedrodotmc)! - Add missing spanish translations

* [#2261](https://github.com/aws-amplify/amplify-ui/pull/2261) [`74e8c8935`](https://github.com/aws-amplify/amplify-ui/commit/74e8c89354bd551723f62ac2a3b60e5222d92d58) Thanks [@retrQJS](https://github.com/retrQJS)! - Added Russian as an option for Authenticator

## 3.12.2

### Patch Changes

- [#2273](https://github.com/aws-amplify/amplify-ui/pull/2273) [`90eb39280`](https://github.com/aws-amplify/amplify-ui/commit/90eb392806c7875d2659bd0bb52aa6b68b849ce7) Thanks [@ErikCH](https://github.com/ErikCH)! - Added user-select property to 'text' for the amplify-input and the textArea primitives. This will help Ionic apps that set this property to none. In Webkit/Chromium-based browsers this is inherited and is causing inputs on those browsers to not work correctly.

* [#2269](https://github.com/aws-amplify/amplify-ui/pull/2269) [`3b2d6c2af`](https://github.com/aws-amplify/amplify-ui/commit/3b2d6c2afb51178ed6ba6312c29b368c522e460a) Thanks [@ErikCH](https://github.com/ErikCH)! - Fixed bug that displayed "usernamed undefined" when using a lambda that autoconfirms the user during sign up. The sign up would fail and redirect the user to sign in with the "username undefined" error. The user then would have to sign in again. This patch will now assign the correct credentials during sign up for users that are auto confirmed.

## 3.12.1

### Patch Changes

- [#2200](https://github.com/aws-amplify/amplify-ui/pull/2200) [`09d738a0f`](https://github.com/aws-amplify/amplify-ui/commit/09d738a0f9e1a67367b3bdb45bcb9644f20e2600) Thanks [@flogy](https://github.com/flogy)! - Fixed some German authenticator translations

## 3.12.0

### Minor Changes

- [#2113](https://github.com/aws-amplify/amplify-ui/pull/2113) [`ffadbe883`](https://github.com/aws-amplify/amplify-ui/commit/ffadbe8837996fee24477ad5325559904c011150) Thanks [@jacoblogan](https://github.com/jacoblogan)! - Add Design Tokens to phonenumberfield primitive, which required matching tokens in selectfield and textfield primitives

  ```
  --amplify-components-phonenumberfield-color
  --amplify-components-phonenumberfield-border-color
  --amplify-components-phonenumberfield-font-size
  --amplify-components-phonenumberfield-focus-border-color
  ```

* [#2123](https://github.com/aws-amplify/amplify-ui/pull/2123) [`897e55de9`](https://github.com/aws-amplify/amplify-ui/commit/897e55de962672d76cccdb5e13f8e4f180316a9b) Thanks [@jacoblogan](https://github.com/jacoblogan)! - add design tokens and theme section to stepperfield primitive

  ```
  --amplify-components-stepperfield-border-color
  --amplify-components-stepperfield-input-color
  --amplify-components-stepperfield-input-font-size
  --amplify-components-stepperfield-button-color
  --amplify-components-stepperfield-button-background-color
  --amplify-components-stepperfield-button-active-color
  --amplify-components-stepperfield-button-active-background-color
  --amplify-components-stepperfield-button-focus-color
  --amplify-components-stepperfield-button-focus-background-color
  --amplify-components-stepperfield-button-disabled-color
  --amplify-components-stepperfield-button-disabled-background-color
  --amplify-components-stepperfield-button-hover-color
  --amplify-components-stepperfield-button-hover-background-color
  ```

- [#2114](https://github.com/aws-amplify/amplify-ui/pull/2114) [`710a6ec43`](https://github.com/aws-amplify/amplify-ui/commit/710a6ec4313f19077f723b75cf804d8508abca77) Thanks [@jacoblogan](https://github.com/jacoblogan)! - add design tokens to radio group

  ```
  --amplify-components-radio-label-color
  --amplify-components-radio-label-disabled-color
  --amplify-components-radiogroup-button-border-width
  --amplify-components-radiogroup-button-border-color
  --amplify-components-radiogroup-button-background-color
  --amplify-components-radiogroup-button-checked-color
  --amplify-components-radiogroup-button-label-color
  ```

### Patch Changes

- [#2074](https://github.com/aws-amplify/amplify-ui/pull/2074) [`bc882121a`](https://github.com/aws-amplify/amplify-ui/commit/bc882121a8d0e005099e2827c3bde68d56647100) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(ui-react): lint components/Authenticator directory

## 3.11.1

### Patch Changes

- [#2133](https://github.com/aws-amplify/amplify-ui/pull/2133) [`c568b96bc`](https://github.com/aws-amplify/amplify-ui/commit/c568b96bc579b6d1f2783695b1c2f2237d4678b9) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - fix(ui): Fixes max call stack issue on `createTheme` when passing a theme object with non-design-token nodes.

  ```javascript
  const theme = createTheme({
    name: 'my-theme',
    tokens: {
      colors: {
        background: {
          // this should be primary: { value: '#f90' }
          primary: '#f90',
        },
      },
    },
  });
  ```

## 3.11.0

### Minor Changes

- [#2085](https://github.com/aws-amplify/amplify-ui/pull/2085) [`e37b666d9`](https://github.com/aws-amplify/amplify-ui/commit/e37b666d967aa444984f9881e7267c0ea171716a) Thanks [@jacoblogan](https://github.com/jacoblogan)! - add design tokens and theme section to textareafield

  ```
    --amplify-components-textareafield-color
    --amplify-components-textareafield-border-color
    --amplify-components-textareafield-focus-border-color
  ```

* [#2087](https://github.com/aws-amplify/amplify-ui/pull/2087) [`540b4ce97`](https://github.com/aws-amplify/amplify-ui/commit/540b4ce97a7c68ea3783bc67e8da4cce1d52e706) Thanks [@jacoblogan](https://github.com/jacoblogan)! - add design tokens to passwordfield

  ```
  --amplify-components-passwordfield-color: var(--amplify-components-fieldcontrol-color);
  --amplify-components-passwordfield-button-color: var(--amplify-components-button-color);
  --amplify-components-passwordfield-button-active-background-color: var(--amplify-components-button-active-background-color);
  --amplify-components-passwordfield-button-active-border-color: var(--amplify-components-button-active-border-color);
  --amplify-components-passwordfield-button-active-color: var(--amplify-components-button-active-color);
  --amplify-components-passwordfield-button-disabled-background-color: var(--amplify-components-button-disabled-background-color);
  --amplify-components-passwordfield-button-disabled-border-color: var(--amplify-components-button-disabled-border-color);
  --amplify-components-passwordfield-button-disabled-color: var(--amplify-components-button-disabled-color);
  --amplify-components-passwordfield-button-focus-background-color: var(--amplify-components-button-focus-background-color);
  --amplify-components-passwordfield-button-focus-border-color: var(--amplify-components-button-focus-border-color);
  --amplify-components-passwordfield-button-focus-color: var(--amplify-components-button-focus-color);
  --amplify-components-passwordfield-button-hover-background-color: var(--amplify-components-button-hover-background-color);
  --amplify-components-passwordfield-button-hover-border-color: var(--amplify-components-button-hover-border-color);
  --amplify-components-passwordfield-button-hover-color: var(--amplify-components-button-hover-color);
  ```

- [#2086](https://github.com/aws-amplify/amplify-ui/pull/2086) [`f6ee1355c`](https://github.com/aws-amplify/amplify-ui/commit/f6ee1355c75ee802c76a34d140c3e052fc0afaeb) Thanks [@jacoblogan](https://github.com/jacoblogan)! - add textfield design tokens

  ```
  --amplify-components-textfield-color: var(--amplify-components-fieldcontrol-color);
  --amplify-components-textfield-border-color: var(--amplify-components-fieldcontrol-border-color);
  --amplify-components-textfield-focus-border-color: var(--amplify-components-fieldcontrol-focus-border-color);
  ```

### Patch Changes

- [#2054](https://github.com/aws-amplify/amplify-ui/pull/2054) [`5eedbbed4`](https://github.com/aws-amplify/amplify-ui/commit/5eedbbed4d04fc00a50d37ae3be61522212eb5cb) Thanks [@zchenwei](https://github.com/zchenwei)! - feat: adding colors theme key support in style props

  **_Example code_**

  ```jsx
  import { View } from '@aws-amplify/ui-react';

  export const Demo = () => {
    return <View backgroundColor="pink.10" color="red.40" />;
  };
  ```

* [#2071](https://github.com/aws-amplify/amplify-ui/pull/2071) [`ef790e5fd`](https://github.com/aws-amplify/amplify-ui/commit/ef790e5fd0d6c91311a4db2456f7de10f8fdad7a) Thanks [@wlee221](https://github.com/wlee221)! - fix(authenticator): explicitly filter special characters allowed by Cognito

- [#2077](https://github.com/aws-amplify/amplify-ui/pull/2077) [`736cfe7cb`](https://github.com/aws-amplify/amplify-ui/commit/736cfe7cb3544bf0ecae5ab2c3b2caf381b497c4) Thanks [@zchenwei](https://github.com/zchenwei)! - feat(style): adding theme key support on more style props(`font-family`, `line-height`, `opacity`, `box-shadow` and `transform`)

* [#2075](https://github.com/aws-amplify/amplify-ui/pull/2075) [`d8085741b`](https://github.com/aws-amplify/amplify-ui/commit/d8085741b23175458adba9b3c05e97408aaa6413) Thanks [@wlee221](https://github.com/wlee221)! - refactor(ui): create shared variable for password special characters

- [#2102](https://github.com/aws-amplify/amplify-ui/pull/2102) [`a168acdc6`](https://github.com/aws-amplify/amplify-ui/commit/a168acdc69e7e44625b0bbf30a020dc1f7bcde8e) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - fix: nested theme providers by removing menu's portal.
  Menu primitive no longer renders in a React Portal which means it properly gets the theme from the nearest ThemeProvider.
  Removing the document element modifications in the ThemeProvider because it is no longer needed. Now the ThemeProvider is much cleaner!

* [#2084](https://github.com/aws-amplify/amplify-ui/pull/2084) [`5f3d3a264`](https://github.com/aws-amplify/amplify-ui/commit/5f3d3a2642401788f1fc79334140c5f3cfc83876) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - fix: dark mode and disabled button. No longer using pure black and making the disabled button look mor disabled.

- [#2070](https://github.com/aws-amplify/amplify-ui/pull/2070) [`28bf92ddb`](https://github.com/aws-amplify/amplify-ui/commit/28bf92ddbd893a3c2839d5215537f845db46b181) Thanks [@zchenwei](https://github.com/zchenwei)! - feat: adding theme key(`radii`, `space`, `fontSizes`, and `fontWeights`) support for more style props

## 3.10.0

### Minor Changes

- [#2021](https://github.com/aws-amplify/amplify-ui/pull/2021) [`6c267aaf8`](https://github.com/aws-amplify/amplify-ui/commit/6c267aaf8b6cb656458e3398cc923e0e259ea9a2) Thanks [@jacoblogan](https://github.com/jacoblogan)! - React: pass isDisabled flag on searchfield onto the search button
  UI: add design tokens for collection and searchfield

  ### Searchfield Tokens added

  - --amplify-components-searchfield-color
  - --amplify-components-searchfield-button-color
  - --amplify-components-searchfield-button-active-background-color
  - --amplify-components-searchfield-button-active-border-color
  - --amplify-components-searchfield-button-active-color
  - --amplify-components-searchfield-button-disabled-background-color
  - --amplify-components-searchfield-button-disabled-border-color
  - --amplify-components-searchfield-button-disabled-color
  - --amplify-components-searchfield-button-focus-background-color
  - --amplify-components-searchfield-button-focus-border-color
  - --amplify-components-searchfield-button-focus-color
  - --amplify-components-searchfield-button-hover-background-color
  - --amplify-components-searchfield-button-hover-border-color
  - --amplify-components-searchfield-button-hover-color

  ### Collection tokens added

  - --amplify-components-collection-pagination-current-color
  - --amplify-components-collection-pagination-current-background-color
  - --amplify-components-collection-pagination-button-color
  - --amplify-components-collection-pagination-button-hover-background-color
  - --amplify-components-collection-pagination-button-hover-color
  - --amplify-components-collection-pagination-button-disabled-color
  - --amplify-components-collection-search-input-color
  - --amplify-components-collection-search-button-color
  - --amplify-components-collection-search-button-active-background-color
  - --amplify-components-collection-search-button-active-border-color
  - --amplify-components-collection-search-button-active-color
  - --amplify-components-collection-search-button-disabled-background-color
  - --amplify-components-collection-search-button-disabled-border-color
  - --amplify-components-collection-search-button-disabled-color
  - --amplify-components-collection-search-button-focus-background-color
  - --amplify-components-collection-search-button-focus-border-color
  - --amplify-components-collection-search-button-focus-color
  - --amplify-components-collection-search-button-hover-background-color
  - --amplify-components-collection-search-button-hover-border-color
  - --amplify-components-collection-search-button-hover-color

## 3.9.2

### Patch Changes

- [#1910](https://github.com/aws-amplify/amplify-ui/pull/1910) [`766bf302c`](https://github.com/aws-amplify/amplify-ui/commit/766bf302c4d594ae92f1506967b6f1858687a41c) Thanks [@wlee221](https://github.com/wlee221)! - refactor(internal): Move `autoSignIn` logic out of `signUp` actor

* [#1910](https://github.com/aws-amplify/amplify-ui/pull/1910) [`766bf302c`](https://github.com/aws-amplify/amplify-ui/commit/766bf302c4d594ae92f1506967b6f1858687a41c) Thanks [@wlee221](https://github.com/wlee221)! - On userpools with sms mfa required, authenticator will now automatically redirect user to sms mfa page after successful sign up.

  Previously, end users needed to sign in again to go to the sms mfa page ([#1660](https://github.com/aws-amplify/amplify-ui/issues/1660)).

- [#1932](https://github.com/aws-amplify/amplify-ui/pull/1932) [`a41ecfbf1`](https://github.com/aws-amplify/amplify-ui/commit/a41ecfbf1e7fc35e20622a6fb514c3bab7404621) Thanks [@zchenwei](https://github.com/zchenwei)! - fix(style): adjust color and border color on ToggleButton to meet 3:1 contrast ratio

## 3.9.1

### Patch Changes

- [#1933](https://github.com/aws-amplify/amplify-ui/pull/1933) [`376c39fc0`](https://github.com/aws-amplify/amplify-ui/commit/376c39fc04aec3a41d02a722a62d4b8e4eb43230) Thanks [@zchenwei](https://github.com/zchenwei)! - fix(style): adjust slider thumb border width, focus color and box shadow. #1922

## 3.9.0

### Minor Changes

- [#1879](https://github.com/aws-amplify/amplify-ui/pull/1879) [`937498b3f`](https://github.com/aws-amplify/amplify-ui/commit/937498b3ff016f2f76f60d861a995b8b1bb77bdf) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Add default dark mode theme override for React

  ```jsx
    const theme: Theme = {
      name: 'my-theme',
      overrides: [defaultDarkModeOverride],
    };

    // ...
    <AmplifyProvider theme={theme} colorMode="system">

    // or
    <AmplifyProvider theme={theme} colorMode={colorMode}>
  ```

### Patch Changes

- [#1908](https://github.com/aws-amplify/amplify-ui/pull/1908) [`62edc9ee3`](https://github.com/aws-amplify/amplify-ui/commit/62edc9ee34a64a81190631fed31cf388bcf3b2e0) Thanks [@reesscot](https://github.com/reesscot)! - fix: regression in scrollview that shows scrollbars when unneeded

* [#1868](https://github.com/aws-amplify/amplify-ui/pull/1868) [`1c3e35a8d`](https://github.com/aws-amplify/amplify-ui/commit/1c3e35a8df815402da68c203b84cf599064c863a) Thanks [@wlee221](https://github.com/wlee221)! - This PR adds additional safeguards to hub event listeners we use. Now, we will only pass hub events to the auth machine if it is in the correct state.

- [#1904](https://github.com/aws-amplify/amplify-ui/pull/1904) [`5c5e89407`](https://github.com/aws-amplify/amplify-ui/commit/5c5e89407d2946be61ffb4ab5a4e9d7352c41065) Thanks [@joebuono](https://github.com/joebuono)! - bug(fix): MenuItem minHeight mapped incorrectly

## 3.8.3

### Patch Changes

- [#1895](https://github.com/aws-amplify/amplify-ui/pull/1895) [`7dbd14546`](https://github.com/aws-amplify/amplify-ui/commit/7dbd145461d27a8cb1ba63a261e543a154dd8343) Thanks [@zchenwei](https://github.com/zchenwei)! - fix(style): adjust switch track color to comply with 3:1 contrast ratio.

* [#1864](https://github.com/aws-amplify/amplify-ui/pull/1864) [`716e24298`](https://github.com/aws-amplify/amplify-ui/commit/716e2429848592254f0b53df6470a53ac735b71c) Thanks [@zchenwei](https://github.com/zchenwei)! - fix(style): fix PasswordField and SearchField quiet styling

## 3.8.2

### Patch Changes

- [#1867](https://github.com/aws-amplify/amplify-ui/pull/1867) [`e9ae76995`](https://github.com/aws-amplify/amplify-ui/commit/e9ae7699589ec005475b4fc16dac7164ad9e0caa) Thanks [@wlee221](https://github.com/wlee221)! - This patch ensures refresh tokens are handled properly after expiration.

  Refresh tokens are used to refresh your idToken and accessToken. While it's uncommon for refresh tokens to expire in app due to their longevity (default 30 days), this would cause an early `tokenRefresh_failure` event on refresh which previously confused the authenticator. This is now handled properly from the Authenticator.

  See https://github.com/aws-amplify/amplify-ui/pull/1863 for technical details. Note that token refresh is attempted when (1) on refresh, and (2) an Amplify API call is attempted but it gets back a token expiration exception.

* [#1772](https://github.com/aws-amplify/amplify-ui/pull/1772) [`9c25f80b6`](https://github.com/aws-amplify/amplify-ui/commit/9c25f80b6f4c84e0e1727873e3dd78b3ce5684a0) Thanks [@jacoblogan](https://github.com/jacoblogan)! - Refactor of styling to flatten css selectors across angular, react, and vue

## 3.8.1

### Patch Changes

- [#1835](https://github.com/aws-amplify/amplify-ui/pull/1835) [`286e7df79`](https://github.com/aws-amplify/amplify-ui/commit/286e7df790a103d164cd8424161a9cd6dc4483e3) Thanks [@reesscot](https://github.com/reesscot)! - Fix ScrollView to only show scrollbars when content overflows

## 3.8.0

### Minor Changes

- [#1809](https://github.com/aws-amplify/amplify-ui/pull/1809) [`f2ab1b8e4`](https://github.com/aws-amplify/amplify-ui/commit/f2ab1b8e468597e7b81284b46cd4b03dcd02e201) Thanks [@wlee221](https://github.com/wlee221)! - feat(authenticator): listen to tokenRefresh events

### Patch Changes

- [#1833](https://github.com/aws-amplify/amplify-ui/pull/1833) [`b1656e136`](https://github.com/aws-amplify/amplify-ui/commit/b1656e13612b5a748cc19be6eeeb44bf70822fda) Thanks [@ErikCH](https://github.com/ErikCH)! - Fixed bug with reset password for phone

## 3.7.0

### Minor Changes

- [#1804](https://github.com/aws-amplify/amplify-ui/pull/1804) [`3e5b93e25`](https://github.com/aws-amplify/amplify-ui/commit/3e5b93e25b8e410497332eedf194d2871acb3e79) Thanks [@ErikCH](https://github.com/ErikCH)! - New authStatus feature, to check if a user is authenticated or not

## 3.6.8

### Patch Changes

- [#1798](https://github.com/aws-amplify/amplify-ui/pull/1798) [`331df831f`](https://github.com/aws-amplify/amplify-ui/commit/331df831fd7ddeb8c6f28b4cb385d23d1aa524be) Thanks [@wlee221](https://github.com/wlee221)! - fix(react): Add compatibility with React 18 `useSyncExternalStore` hook

## 3.6.7

### Patch Changes

- [#1762](https://github.com/aws-amplify/amplify-ui/pull/1762) [`cd710a07c`](https://github.com/aws-amplify/amplify-ui/commit/cd710a07c52c1db57899eaf3feba4fde52c08df2) Thanks [@jacoblogan](https://github.com/jacoblogan)! - remove inline styling from react authenticator

## 3.6.6

### Patch Changes

- [#1755](https://github.com/aws-amplify/amplify-ui/pull/1755) [`84fd81868`](https://github.com/aws-amplify/amplify-ui/commit/84fd818689daa5220bfb55ebee7e280454e1c705) Thanks [@hbuchel](https://github.com/hbuchel)! - fix: Resets select option text color to fix windows darkmode bug

* [#1776](https://github.com/aws-amplify/amplify-ui/pull/1776) [`a9c5aa5f5`](https://github.com/aws-amplify/amplify-ui/commit/a9c5aa5f56c4d222cd8bd652d0fd549aea3576ef) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(authenticator): add display:grid to data-amplify-authenticator class

## 3.6.5

### Patch Changes

- [#1698](https://github.com/aws-amplify/amplify-ui/pull/1698) [`57e104e16`](https://github.com/aws-amplify/amplify-ui/commit/57e104e169bc1d6b5de6ffa285c0494204c98579) Thanks [@jacoblogan](https://github.com/jacoblogan)! - add overflow styling to authenticator modal

## 3.6.4

### Patch Changes

- [#1667](https://github.com/aws-amplify/amplify-ui/pull/1667) [`1601b3f94`](https://github.com/aws-amplify/amplify-ui/commit/1601b3f94d68acd1df0e592c6328f19b29620447) Thanks [@hbuchel](https://github.com/hbuchel)! - fix: update focus styling/token nesting for switchField

## 3.6.3

### Patch Changes

- [#1673](https://github.com/aws-amplify/amplify-ui/pull/1673) [`34a19a541`](https://github.com/aws-amplify/amplify-ui/commit/34a19a541b4b733a6688a38a435423e9c607e918) Thanks [@reesscot](https://github.com/reesscot)! - Type theme component design tokens

* [#1679](https://github.com/aws-amplify/amplify-ui/pull/1679) [`16dced7de`](https://github.com/aws-amplify/amplify-ui/commit/16dced7de5edc73c064b7ec4bddbefe586e98393) Thanks [@wlee221](https://github.com/wlee221)! - fix(authenticator): Ensure machine setup runs after user signs in, refreshes, then signs out.

## 3.6.2

### Patch Changes

- [#1652](https://github.com/aws-amplify/amplify-ui/pull/1652) [`b9a181bc9`](https://github.com/aws-amplify/amplify-ui/commit/b9a181bc9da2411017877a91dc931812e8371bb8) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Fixing shadow and outline CSS variables in the default styles.

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
