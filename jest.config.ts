export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.test.json",
    },
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/*.spec.tsx", "**/*.test.tsx"],
  moduleNameMapper: {
    "\\.(png|jpe?g|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.ts",
  },
};
