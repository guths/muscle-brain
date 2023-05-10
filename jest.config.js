/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "moduleDirectories": [
    "node_modules",
    "src"
  ],
  clearMocks: true,
  coverageProvider: "v8",
  testRegex: ".*\\..*spec\\.ts$",
  transform: {
    "^.+\\.ts?$": ["@swc/jest"],
  },
  globalSetup: './jest.global-setup.ts',
  globalTeardown: './jest.global-teardown.ts'
};