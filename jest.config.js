module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: ['**/*.(test|spec).(ts|tsx)'],
  globals: {
    'ts-jest': {
      tsConfig: 'jest.tsconfig.json',
      babelConfig: true,
      diagnostics: false,
    },
  },
  collectCoverageFrom: ['src/**/*.{js,ts,jsx,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/', 'enzyme.js'],
  setupFiles: ['<rootDir>/jest.setup.ts'],
  reporters: ['default', 'jest-junit'],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/mocks.js',
    '\\.(css|less|scss|html)$': '<rootDir>/__mocks__/mocks.js',
    '^@app$': '<rootDir>/src/app',
    '^@onr/([a-z].*)$': '<rootDir>/src/modules/$1',
  },
  preset: 'ts-jest',
};
