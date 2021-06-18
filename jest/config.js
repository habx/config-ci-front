const config = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/lib/', '<rootDir>/dist'],
  testRegex: '(/test/.*|\\.(test|spec))\\.(ts|tsx)$',
  transform: {
    '.(ts|tsx|js)': 'ts-jest',
  },
}
if (process.env.CI) {
  config.maxWorkers = 2
}
module.exports = config
