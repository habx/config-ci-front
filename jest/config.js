module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/lib/', '<rootDir>/dist'],
  testRegex: '(/test/.*|\\.(test|spec))\\.(ts|tsx)$',
  transform: {
    '.(ts|tsx|js)': 'ts-jest',
  },
}
