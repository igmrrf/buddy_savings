import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: 'ts-jest',
    displayName: {
      name: 'scraper-test',
      color: 'greenBright',
    },
    verbose: true,
    testMatch: ['**/**/*.test.ts', '**/**/*.spec.ts'],
    testEnvironment: 'node',
    detectOpenHandles: true,
    collectCoverage: true,
    transform: { '^.+\\.tsx?$': 'ts-jest' },
    forceExit: true,
  };
};
