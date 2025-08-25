module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', {
      jsc: { target: 'es2020', parser: { syntax: 'typescript', tsx: true } }
    }]
  },
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' }
};
