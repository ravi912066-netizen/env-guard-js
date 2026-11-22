# env-guard-js

[![CI](https://github.com/ravi912066-netizen/env-guard-js/actions/workflows/ci.yml/badge.svg)](https://github.com/ravi912066-netizen/env-guard-js/actions/workflows/ci.yml)

[![npm version](https://img.shields.io/npm/v/env-guard-js.svg)](https://www.npmjs.com/package/env-guard-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/ravi912066-netizen/env-guard-js/blob/main/LICENSE)
[![Build Status](https://github.com/ravi912066-netizen/env-guard-js/actions/workflows/ci.yml/badge.svg)](https://github.com/ravi912066-netizen/env-guard-js/actions)

Lightweight, **zero‑dependency** environment‑variable validation library for Node.js applications.

---

## Table of Contents

- [Why env‑guard‑js?](#why-env-guard-js)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
  - [CommonJS](#commonjs)
  - [ES Module](#es-module)
- [API Reference](#api-reference)
  - `validateEnv(schema, [options])`
- [Schema Definition](#schema-definition)
- [Error Handling & Security](#error-handling--security)
- [Express Integration Example](#express-integration-example)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Why env‑guard‑js?

Configuration via `process.env` is convenient but error‑prone. Typos, missing variables, or values of the wrong type cause runtime crashes or subtle bugs. `env‑guard‑js` lets you **declare** the expected shape of your environment once and get **fail‑fast** validation with helpful error messages, while never leaking secret values.

## Features

- ✅ Required/optional variables
- ✅ Type conversion (`string`, `number`, `boolean`)
- ✅ Default values
- ✅ Numeric range (`min`, `max`)
- ✅ String length limits (`minLength`, `maxLength`)
- ✅ Enum validation for strings
- ✅ Custom validator functions
- ✅ Security‑first error messages (no secret values displayed)
- ✅ Works with both **CommonJS** (`require`) and **ES Modules** (`import`)
- ✅ Zero runtime dependencies
- ✅ Fully typed with JSDoc

## Installation

```bash
npm install env-guard-js
```

## Quick Start

### CommonJS

```js
// config.cjs
const { validateEnv } = require('env-guard-js');

const config = validateEnv({
  PORT: {
    type: 'number',
    required: true,
    default: 3000,
    min: 1000,
    max: 65535,
  },
  NODE_ENV: {
    type: 'string',
    default: 'development',
    enum: ['development', 'production', 'test'],
  },
  JWT_SECRET: { type: 'string', required: true, minLength: 20 },
  DEBUG: { type: 'boolean', default: false },
});

console.log('Port →', config.PORT);
```

### ES Module

```js
// config.mjs
import { validateEnv } from 'env-guard-js';

const config = validateEnv({
  // same schema as above
});

console.log('Running in', config.NODE_ENV);
```

Both styles share the same API and behaviour.

## API Reference

### `validateEnv(schema, [options])`

Validates the current environment against a **schema**.

* **`schema`** – Object where each key is an environment variable name and the value is a rule definition.
* **`options.source`** – Optional object to use instead of `process.env` (useful for testing).

#### Return value
An object containing the validated and converted variables.

#### Throws
`ValidationError` – a custom error whose `.errors` property is an array of `{ key, message }` objects.

## Schema Definition

Each variable rule may contain:

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'string'` \| `'number'` \| `'boolean'` | **Required** – the target type.
| `required` | `boolean` | If `true`, the variable must be present.
| `default` | `any` | Value used when the variable is missing (ignored if the variable is present, even if invalid).
| `min` / `max` | `number` | Numeric range checks (only for `type: 'number'`).
| `minLength` / `maxLength` | `number` | String length limits (only for `type: 'string'`).
| `enum` | `string[]` | Allowed string values.
| `validate` | `function(value) => true | string` | Custom validator; return `true` for success or a string error message.

## Error Handling & Security

```js
try {
  const cfg = validateEnv(schema);
} catch (e) {
  if (e.name === 'ValidationError') {
    console.error('Configuration errors:');
    e.errors.forEach(err => console.error(`[${err.key}] ${err.message}`));
    process.exit(1);
  }
  throw e; // unexpected errors
}
```

The `ValidationError` message is a generic summary; individual error messages never contain the original secret values. Custom validator messages are automatically redacted.

## Express Integration Example

```js
// server.js (CommonJS)
const express = require('express');
const { validateEnv } = require('env-guard-js');

const config = validateEnv({
  PORT: { type: 'number', required: true, default: 3000 },
  DEBUG: { type: 'boolean', default: false },
});

const app = express();
app.get('/', (req, res) => res.send('Hello World'));

app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}, debug=${config.DEBUG}`);
});
```

## Testing

The project uses Node’s built‑in test runner.

```bash
npm test
```

All tests run against both CommonJS and ES Module entry points.

## Contributing

Contributions are welcome! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on the development workflow, testing, and code style.

## License

MIT © 2026 Ravi Yadav
