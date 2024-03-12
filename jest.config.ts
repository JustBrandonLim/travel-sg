import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/interfaces/(.*)$": "<rootDir>/interfaces/$1",
    "^@/services/(.*)$": "<rootDir>/services/$1",
    "^@/components/(.*)$": "<rootDir>/components/$1",
  },
};

export default createJestConfig(config);
