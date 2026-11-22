# Contributing Guidelines

Thank you for considering contributing to **env-guard-js**! We welcome improvements, bug fixes, documentation updates, and new features.

## How to Contribute

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/<your-username>/env-guard-js.git
   cd env-guard-js
   ```
3. **Create a new branch** for your work:
   ```bash
   git checkout -b <branch-name>
   ```
4. **Make your changes** – keep them well‑documented and tests‑driven.
5. **Run the test suite** to ensure everything passes:
   ```bash
   npm test
   ```
6. **Commit your changes** with a clear, descriptive commit message.
7. **Push to your fork** and open a Pull Request against the `main` branch of the upstream repository.

## Code Style

- Use **standard JavaScript** (ES2022) with `eslint` style rules (prettier is optional).
- Follow existing project conventions: JSDoc comments, 2‑space indentation, and descriptive variable names.
- Keep the code **zero‑dependency**; avoid adding new runtime dependencies unless absolutely necessary.

## Testing

All new code must include unit tests located in the `tests/` directory. Run `npm test` locally before pushing.

## Issue Reporting

If you find a bug or want to request a feature, please open an issue with:
- A clear description of the problem.
- Steps to reproduce (if applicable).
- Expected versus actual behavior.

We appreciate your contributions and will strive to review PRs promptly.
