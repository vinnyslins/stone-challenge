export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    'src/index.ts',
    'src/database',
    'src/models'
  ],
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'node'
}
