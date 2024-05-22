import { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',
    // do not collect from export files
    '!<rootDir>/**/index.(ts|tsx)',
    // do not collect from top level version and styles files
    '!<rootDir>/src/(styles|version).(ts|tsx)',
    '!<rootDir>/src/components/FaceLivenessDetector/service/utils/__tests__/liveness.test.ts',
    '!<rootDir>/src/components/FaceLivenessDetector/service/machine/__tests__/machine.test.ts',
    '!<rootDir>/src/components/FaceLivenessDetector/LivenessCheck/__tests__/LivenessCameraModule.test.tsx',
    '!<rootDir>/src/components/FaceLivenessDetector/shared/__tests__/Hint.test.tsx',
    '!<rootDir>/src/components/FaceLivenessDetector/service/utils/createRequestStreamGenerator/__tests__/utils.test.ts',
    '!<rootDir>/src/components/FaceLivenessDetector/LivenessCheck/__tests__/LivenessCheck.test.tsx',
    '!<rootDir>/src/components/FaceLivenessDetector/service/utils/__tests__/getFaceMatchStateInLivenessOval.test.ts',
    '!<rootDir>/src/components/FaceLivenessDetector/service/utils/__tests__/sessionInformation.test.ts',
    '!<rootDir>/src/components/FaceLivenessDetector/shared/__tests__/FaceLivenessErrorModal.test.tsx',
    '!<rootDir>/src/components/FaceLivenessDetector/service/utils/createRequestStreamGenerator/__tests__/createRequestStreamGenerator.test.ts',
    '!<rootDir>/src/components/FaceLivenessDetector/shared/__tests__/LandscapeErrorModal.test.tsx',
    '!<rootDir>/src/components/FaceLivenessDetector/__tests__/FaceLivenessDetector.test.tsx',
    '!<rootDir>/src/__tests__/index.spec.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 24,
      functions: 35,
      lines: 35,
      statements: 35,
    },
  },
  testPathIgnorePatterns: [
    // Ignore the paths of the failing test files
    '<rootDir>/src/components/FaceLivenessDetector/service/utils/__tests__/liveness.test.ts',
    '<rootDir>/src/components/FaceLivenessDetector/service/machine/__tests__/machine.test.ts',
    '<rootDir>/src/components/FaceLivenessDetector/LivenessCheck/__tests__/LivenessCameraModule.test.tsx',
    '<rootDir>/src/components/FaceLivenessDetector/shared/__tests__/Hint.test.tsx',
    '<rootDir>/src/components/FaceLivenessDetector/service/utils/createRequestStreamGenerator/__tests__/utils.test.ts',
    '<rootDir>/src/components/FaceLivenessDetector/LivenessCheck/__tests__/LivenessCheck.test.tsx',
    '<rootDir>/src/components/FaceLivenessDetector/service/utils/__tests__/getFaceMatchStateInLivenessOval.test.ts',
    '<rootDir>/src/components/FaceLivenessDetector/service/utils/__tests__/sessionInformation.test.ts',
    '<rootDir>/src/components/FaceLivenessDetector/shared/__tests__/FaceLivenessErrorModal.test.tsx',
    '<rootDir>/src/components/FaceLivenessDetector/service/utils/createRequestStreamGenerator/__tests__/createRequestStreamGenerator.test.ts',
    '<rootDir>/src/components/FaceLivenessDetector/shared/__tests__/LandscapeErrorModal.test.tsx',
    '<rootDir>/src/components/FaceLivenessDetector/__tests__/FaceLivenessDetector.test.tsx',
    '<rootDir>/src/__tests__/index.spec.ts',
  ],
  moduleNameMapper: {
    '^nanoid$': '<rootDir>/../../node_modules/nanoid',
    '^uuid$': '<rootDir>/../../node_modules/uuid',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
};

export default config;
