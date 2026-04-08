---
name: generate-coverage-report
description: Generate and archive QA coverage artifacts
---

# Generate Coverage Report Skill

Use this skill to produce reproducible coverage artifacts for QA visibility.

## Inputs
- `COVERAGE_DIR` (optional): output directory path.
- `WORKSPACE_ROOT` (optional): repository root path.

## Behavior
- Creates a clean coverage directory.
- Executes API test command and captures output.
- Produces a summary text artifact.

## Output
- Coverage directory with summary files.
- CI-friendly exit code.

## Invocation
Run `.github/skills/generate-coverage-report/coverage.sh`.
