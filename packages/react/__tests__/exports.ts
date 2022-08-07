import fs from 'fs';
import path from 'path';
import type { PrimitiveCatalogType } from '../src/types/catalog';
import { PrimitiveCatalog } from '@aws-amplify/ui-react/internal';

// Jest doesn't support `exports` maps, so we have to reference `dist` directly.
// See: https://github.com/facebook/jest/issues/9771
import * as exported from '../dist';
import * as legacy from '../dist/legacy';
import * as internal from '../dist/internal';

describe('@aws-amplify/ui-react', () => {
  describe('exports', () => {
    it('should match snapshot', () => {
      expect(Object.keys(exported)).toMatchInlineSnapshot(`
        Array [
          "createTheme",
          "defaultDarkModeOverride",
          "defaultTheme",
          "translations",
          "ComponentClassNames",
          "ComponentClassObject",
          "ComponentPropsToStylePropsMap",
          "ComponentPropsToStylePropsMapKeys",
          "View",
          "useTheme",
          "InAppMessagingProvider",
          "useInAppMessaging",
          "Alert",
          "AmplifyProvider",
          "Authenticator",
          "Badge",
          "Button",
          "ButtonGroup",
          "Card",
          "CheckboxField",
          "Collection",
          "Divider",
          "Expander",
          "ExpanderItem",
          "FieldGroupIcon",
          "FieldGroupIconButton",
          "Flex",
          "Geocoder",
          "Grid",
          "Heading",
          "Icon",
          "Image",
          "InAppMessageDisplay",
          "Link",
          "Loader",
          "LocationSearch",
          "MapView",
          "Menu",
          "MenuButton",
          "MenuItem",
          "Pagination",
          "PasswordField",
          "PhoneNumberField",
          "Placeholder",
          "Radio",
          "RadioGroupField",
          "Rating",
          "ScrollView",
          "SearchField",
          "SelectField",
          "SliderField",
          "StepperField",
          "SwitchField",
          "TabItem",
          "Table",
          "TableBody",
          "TableCell",
          "TableFoot",
          "TableHead",
          "TableRow",
          "Tabs",
          "Text",
          "TextAreaField",
          "TextField",
          "ThemeProvider",
          "ToggleButton",
          "ToggleButtonGroup",
          "VisuallyHidden",
          "components",
          "primitives",
          "useAmplify",
          "useAuthenticator",
          "useBreakpointValue",
          "usePagination",
          "withAuthenticator",
        ]
      `);
    });
  });
});

describe('@aws-amplify/ui-react/legacy', () => {
  describe('exports', () => {
    it('should match snapshot', () => {
      expect(Object.keys(legacy)).toMatchInlineSnapshot(`
        Array [
          "AmplifyAuthenticator",
          "AmplifyChatbot",
          "AmplifyPhotoPicker",
          "AmplifyPicker",
          "AmplifyS3Album",
          "AmplifyS3Image",
          "AmplifyS3ImagePicker",
          "AmplifyS3Text",
          "AmplifyS3TextPicker",
          "AmplifySignIn",
          "AmplifySignOut",
          "withAuthenticator",
        ]
      `);
    });
  });
});

describe('@aws-amplify/ui-react/internal', () => {
  describe('exports', () => {
    it('should match snapshot', () => {
      expect(Object.keys(internal)).toMatchInlineSnapshot(`
        Array [
          "IconAdd",
          "IconCheck",
          "IconCheckCircle",
          "IconChevronLeft",
          "IconChevronRight",
          "IconClose",
          "IconError",
          "IconExpandMore",
          "IconIndeterminate",
          "IconInfo",
          "IconMenu",
          "IconRemove",
          "IconSearch",
          "IconStar",
          "IconVisibility",
          "IconVisibilityOff",
          "IconWarning",
          "IconCheckCircleOutline",
          "IconFiberManualRecord",
          "IconHighlightOff",
          "PrimitiveCatalog",
          "createDataStorePredicate",
          "findChildOverrides",
          "getOverrideProps",
          "getOverridesFromVariants",
          "mergeVariantsAndOverrides",
          "useAuth",
          "useAuthSignOutAction",
          "useDataStoreBinding",
          "useDataStoreCollection",
          "useDataStoreCreateAction",
          "useDataStoreDeleteAction",
          "useDataStoreItem",
          "useDataStoreUpdateAction",
          "useNavigateAction",
          "useStateMutationAction",
          "useStorageURL",
        ]
      `);
    });
  });
});

describe('primitive catalog', () => {
  it.each(Object.entries(PrimitiveCatalog))(
    'should contain properties for %s primitive',
    (name, primitive) => {
      expect(Object.keys(primitive.properties).length).toBeGreaterThan(0);
    }
  );

  it('should match primitives list snapshot', () => {
    expect(Object.keys(PrimitiveCatalog)).toMatchInlineSnapshot(`
      Array [
        "Alert",
        "Badge",
        "Button",
        "ButtonGroup",
        "Card",
        "CheckboxField",
        "Collection",
        "Divider",
        "Expander",
        "ExpanderItem",
        "FieldGroupIcon",
        "FieldGroupIconButton",
        "Flex",
        "Grid",
        "Heading",
        "Icon",
        "Image",
        "Link",
        "Loader",
        "Menu",
        "MenuButton",
        "MenuItem",
        "Pagination",
        "PasswordField",
        "PhoneNumberField",
        "Placeholder",
        "Radio",
        "RadioGroupField",
        "Rating",
        "ScrollView",
        "SearchField",
        "SelectField",
        "SliderField",
        "StepperField",
        "SwitchField",
        "Tabs",
        "TabItem",
        "Text",
        "TextAreaField",
        "TextField",
        "ToggleButton",
        "ToggleButtonGroup",
        "View",
        "VisuallyHidden",
        "Table",
        "TableBody",
        "TableCell",
        "TableFoot",
        "TableHead",
        "TableRow",
      ]
    `);
  });
});
