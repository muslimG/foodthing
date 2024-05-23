import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({ dir: '.' });

const nextJestConfig: Config = {
  cacheDirectory: 'node_modules/.cache/jest',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    // ignore middleware
    '!src/middleware.ts',
    // ignore image component
    '!src/components/Image/**/*',
    // ignore base next pages
    '!src/pages/_{app,document}.tsx',
    '!src/pages/api/**/*',
    '!src/test/**/*', // Ignore test helpers/config
    '!src/typings/**/*', // Ignore typings
    '!src/**/*.d.ts', // Ignore declaration files
    // ignore external code
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/deprecated/**',
  ],
  // TODO ~ Re enable once more tests are written
  // coverageThreshold: {
  //   global: {
  //     branches: 50,
  //     functions: 50,
  //     lines: 50,
  //     statements: 10,
  //   },
  // },
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  reporters: ['default', 'jest-junit'],
  setupFiles: ['<rootDir>/test/config.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setupJest.ts'],
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  testMatch: ['<rootDir>/src/**/*.test.ts?(x)'],
  transform: {
    '\\.svg$': '<rootDir>/test/svgTransformer.ts',
    '\\.(gif|jpg|pdf|png)$': 'jest-transform-stub',
    // '\\.(gql|graphql)$': '@graphql-tools/jest-transform',
  },
};

// See: https://github.com/vercel/next.js/issues/35634
const jestConfig = async () => {
  const config = await createJestConfig(nextJestConfig)();
  // @ts-ignore
  delete config.moduleNameMapper['^.+\\.(svg)$'];
  return config;
};

module.exports = jestConfig;