import fs from 'fs';
import path from 'path';
import { PrimitiveCatalog } from '../src/types/catalog';

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
          "Alert",
          "AmplifyProvider",
          "Authenticator",
          "Badge",
          "Button",
          "ButtonGroup",
          "Card",
          "CheckboxField",
          "Collection",
          "ComponentClassNames",
          "ComponentPropsToStylePropsMap",
          "ComponentPropsToStylePropsMapKeys",
          "Divider",
          "Expander",
          "ExpanderItem",
          "FieldGroupIcon",
          "FieldGroupIconButton",
          "Flex",
          "Grid",
          "Heading",
          "Icon",
          "IconAdd",
          "IconCheck",
          "IconCheckCircle",
          "IconCheckCircleOutline",
          "IconChevronLeft",
          "IconChevronRight",
          "IconClose",
          "IconError",
          "IconExpandMore",
          "IconFiberManualRecord",
          "IconHighlightOff",
          "IconInfo",
          "IconMenu",
          "IconRemove",
          "IconSearch",
          "IconStar",
          "IconVisibility",
          "IconVisibilityOff",
          "IconWarning",
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
          "SharedText",
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
          "ToggleButton",
          "ToggleButtonGroup",
          "View",
          "VisuallyHidden",
          "components",
          "createTheme",
          "defaultTheme",
          "primitives",
          "translations",
          "useAmplify",
          "useAuthenticator",
          "usePagination",
          "useTheme",
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

const getCatalogJSON = (): PrimitiveCatalog => {
  try {
    const rawJSON = fs
      .readFileSync(path.join(__dirname, '../dist/primitives.json'))
      .toString();

    return JSON.parse(rawJSON) as PrimitiveCatalog;
  } catch (err) {
    console.error('Error reading primitives catalog JSON file:', err);
  }

  return {};
};

describe('primitive catalog', () => {
  const catalog = getCatalogJSON();

  it.each(Object.entries(catalog))(
    'should contain properties for %s primitive',
    (name, primitive) => {
      expect(Object.keys(primitive.properties).length).toBeGreaterThan(0);
    }
  );

  it('should match primitives list snapshot', () => {
    expect(Object.keys(catalog)).toMatchInlineSnapshot(`
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
