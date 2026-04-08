---
name: run-tests
description: Run QA test suites with optional scope targeting
---

# Run Tests Skill

Use this skill when you need to execute test suites in CI or locally with consistent behavior.

## Inputs
- `TEST_SCOPE` (optional): one of `all`, `api`, `ui`.
- `WORKSPACE_ROOT` (optional): repository root path.

## Behavior
- Detects project package manager lock files and defaults to npm.
- Runs all tests when scope is omitted.
- Supports API-only and UI-only execution.
- Fails fast on command errors.

## Output
- Exit code suitable for CI.
- Console logs from test execution.

## Invocation
Run `.github/skills/run-tests/run-tests.sh` with optional environment variables.
