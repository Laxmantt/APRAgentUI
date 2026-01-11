const path = require('path')
const nextJest = require('next/jest')

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: path.resolve(__dirname, '../../'),
})

// Add any custom config to be passed to Jest
const customJestConfig = {
    rootDir: '../../',
    setupFilesAfterEnv: ['<rootDir>/tests/config/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        // Handle module aliases (this will be automatically configured for you soon)
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: [
        '<rootDir>/src/**/*.test.{js,jsx,ts,tsx}',
        '<rootDir>/tests/unit/**/*.test.{js,jsx,ts,tsx}'
    ]
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
