module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
  },
};
