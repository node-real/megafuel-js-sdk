const { pathsToModuleNameMapper } = require('ts-jest');

// Assuming you have some TypeScript path aliases defined in your tsconfig.json
const { compilerOptions } = require('./tsconfig');
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/src/config.spec.ts'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper({ '@/*': ['./src/*'] }, { prefix: '<rootDir>/' }),
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  // transformIgnorePatterns: ['node_modules/(?!(@bnb-chain/greenfield-cosmos-types)/)'],
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        // tsconfig: './config/tsconfig-cjs.json',
        useESM: true,
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/tests/env.ts', '<rootDir>/tests/utils.ts']
};