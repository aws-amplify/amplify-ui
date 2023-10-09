const { defaults } = require('ts-jest/presets');

module.exports = {
  ...defaults,
  preset: 'react-native',
  // modulePathIgnorePatterns: ['<rootDir>/dist/'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*{c,C}onstants.ts',
  ],
  // transformIgnorePatterns: ['jest-runner'],
  // transformIgnorePatterns: ['node_modules/(?!react-native|ui-react-native)'],
  // moduleNameMapper: {
  //   '^react$': '<rootDir>/node_modules/react',
  //   '^react-native$': '<rootDir>/node_modules/react-native',
  // },
  transform: {
    '^.+\\.jsx$': ['babel-jest', { configFile: './babel.config.js' }],
    '^.+\\.(ts|tsx)$': 'ts-jest',
    // '^.+\\.tsx?$': [
    //   'ts-jest',
    //   {
    //     tsconfig: 'tsconfig.spec.json',
    //   },
    // ],
  },
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
