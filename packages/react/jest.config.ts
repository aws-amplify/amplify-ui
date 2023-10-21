import { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',
    // do not collect from export files
    '!<rootDir>/**/index.(ts|tsx)',
    // do not collect from top level internal, PrimitiveCatalog, style and version files
    '!<rootDir>/src/(internal|PrimitiveCatalog|styles|version).(ts|tsx)',
    // do not collect coverage for the Authenticator
    '!<rootDir>/src/components/Authenticator/**/*.(ts|tsx)',
  ],
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 91,
  //     statements: 91,
  //   },
  // },
  coverageThreshold: {
    global: {
      branches: 63.09,
      functions: 30.83,
      lines: 42.73,
      statements: 44.58,
    },
  },
  // @todo-upgrade-react-18 update test API usage and remove temp thresholds
  testPathIgnorePatterns: [
    '<rootDir>/src/primitives/Accordion/__tests__/Accordion.test.tsx',
    '<rootDir>/src/primitives/Autocomplete/__tests__/Autocomplete.test.tsx',
    '<rootDir>/src/primitives/SelectField/__tests__/SelectField.test.tsx',
    '<rootDir>/src/primitives/SearchField/__tests__/SearchField.test.tsx',
    '<rootDir>/src/components/Authenticator/shared/__tests__/FormField.test.tsx',
    '<rootDir>/src/primitives/Checkbox/__tests__/Checkbox.test.tsx',
    '<rootDir>/src/primitives/PasswordField/__tests__/ShowPasswordButton.test.tsx',
    '<rootDir>/src/primitives/Input/__tests__/Input.test.tsx',
    '<rootDir>/src/primitives/ToggleButtonGroup/__tests__/ToggleButtonGroup.test.tsx',
    '<rootDir>/src/primitives/Message/__tests__/Message.test.tsx',
    '<rootDir>/src/primitives/Link/__tests__/Link.test.tsx',
    '<rootDir>/src/primitives/ToggleButton/__tests__/ToggleButton.test.tsx',
    '<rootDir>/src/primitives/Button/__tests__/Button.test.tsx',
    '<rootDir>/src/primitives/Expander/__tests__/Expander.test.tsx',
    '<rootDir>/src/primitives/Pagination/__tests__/Pagination.test.tsx',
    '<rootDir>/src/primitives/TextField/__tests__/TextField.test.tsx',
    '<rootDir>/src/primitives/TextAreaField/__tests__/TextAreaField.test.tsx',
    '<rootDir>/src/primitives/TextArea/__tests__/TextArea.test.tsx',
    '<rootDir>/src/primitives/Collection/__tests__/Collection.test.tsx',
    '<rootDir>/src/primitives/PhoneNumberField/__tests__/PhoneNumberField.test.tsx',
    '<rootDir>/src/primitives/Select/__tests__/Select.test.tsx',
    '<rootDir>/src/primitives/RadioGroupField/__tests__/RadioGroupField.test.tsx',
    '<rootDir>/src/primitives/StepperField/__tests__/StepperField.test.tsx',
  ],
  moduleNameMapper: { '^uuid$': '<rootDir>/../../node_modules/uuid' },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
};

export default config;
