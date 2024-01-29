import type { Config } from '@jest/types'

module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleDirectories: ['node_modules', '<rootDir>/src'],
	moduleNameMapper: {
		'@/(.*)$': '<rootDir>/src/$1',
	},
	testRegex: 'src/.*\\.(test|spec)\\.[jt]s$',
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', '!**/node_modules/**'],
	coverageDirectory: 'coverage',
	coverageReporters: ['lcov', 'text-summary'],
	setupFilesAfterEnv: ['reflect-metadata'],
} as Config.InitialOptions
