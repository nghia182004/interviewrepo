
export default {
    testEnvironment: 'node',
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    testMatch: ['**/test/**/*.spec.js'],
    collectCoverageFrom: [
        'src/**/*.js',
        '!src/**/*.spec.js',
    ],

    moduleDirectories: ['node_modules', 'test/__mocks__'],
};