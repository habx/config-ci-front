const config = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/lib/', '<rootDir>/dist'],
  testRegex: '(/test/.*|\\.(test|spec))\\.(ts|tsx)$',
  transform: {
    '.(ts|tsx|js)': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.{js,jsx,ts}'],
  reporters: ['default', ['jest-junit', { suiteName: 'jest tests' }]],
}

if (process.env.CI) {
  // Avoid using more than Circle CI max workers
  // (only 2 CPUs allowed in our configuration)
  config.maxWorkers = 2
}

module.exports = config
