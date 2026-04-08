#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="${WORKSPACE_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)}"
COVERAGE_DIR="${COVERAGE_DIR:-$ROOT_DIR/testsuite/coverage}"

mkdir -p "$COVERAGE_DIR"

cd "$ROOT_DIR/testsuite"

{
  echo "QA Coverage Report"
  echo "Generated at: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
  echo ""
  echo "Running API tests as coverage baseline"
} > "$COVERAGE_DIR/summary.txt"

npm run test:api | tee "$COVERAGE_DIR/api-test-output.log"

echo ""
echo "Finished. Artifacts written to $COVERAGE_DIR"
