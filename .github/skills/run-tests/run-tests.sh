#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="${WORKSPACE_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)}"
TEST_SCOPE="${TEST_SCOPE:-all}"

cd "$ROOT_DIR"

if [[ -f "testsuite/package.json" ]]; then
  cd testsuite
else
  echo "testsuite/package.json not found"
  exit 1
fi

case "$TEST_SCOPE" in
  all)
    npm run test
    ;;
  api)
    npm run test:api
    ;;
  ui)
    npm run test:ui
    ;;
  *)
    echo "Unsupported TEST_SCOPE: $TEST_SCOPE"
    echo "Allowed values: all, api, ui"
    exit 1
    ;;
esac
