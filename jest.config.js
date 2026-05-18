module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/tests/unit/**/*.test.ts',
    '**/tests/integration/**/*.test.ts'
  ],
  moduleNameMapper: {
    // 1. Centralized AI Graph Mock (MUST BE FIRST to intercept before the ES extension mapper)
    '\\bgraph\\.ai(?:\\.js)?$': '<rootDir>/tests/mocks/graph.mock.ts',
    
    // 2. Map internal ES modules (.js) to local TS source files in Jest
    '^(\\.\\.?/.*)\\.js$': '$1'
  },
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true
};
