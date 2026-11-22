// src/index.mjs
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { validateEnv } = require('./validateEnv.js');
export { validateEnv };
