import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  moduleNameMapper: {
    "^@/interfaces/(.*)$": "<rootDir>/interfaces/$1",
    "^@/services/(.*)$": "<rootDir>/services/$1",
    "^@/components/(.*)$": "<rootDir>/components/$1",
  },
};

export default createJestConfig(config);
