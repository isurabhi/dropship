#!/usr/bin/env bash
set -euo pipefail

API_URL="${API_URL:-}"
EXPECTED_STATUS="${EXPECTED_STATUS:-200}"
EXPECTED_CONTAINS="${EXPECTED_CONTAINS:-}"

if [[ -z "$API_URL" ]]; then
  echo "API_URL is required"
  exit 1
fi

TMP_BODY="$(mktemp)"
trap 'rm -f "$TMP_BODY"' EXIT

ACTUAL_STATUS="$(curl -sS -o "$TMP_BODY" -w "%{http_code}" "$API_URL")"

if [[ "$ACTUAL_STATUS" != "$EXPECTED_STATUS" ]]; then
  echo "Status check failed: expected $EXPECTED_STATUS, got $ACTUAL_STATUS"
  echo "Response body:"
  cat "$TMP_BODY"
  exit 1
fi

if [[ -n "$EXPECTED_CONTAINS" ]]; then
  if ! grep -Fq "$EXPECTED_CONTAINS" "$TMP_BODY"; then
    echo "Body check failed: expected content not found: $EXPECTED_CONTAINS"
    echo "Response body:"
    cat "$TMP_BODY"
    exit 1
  fi
fi

echo "API validation passed for $API_URL (status $ACTUAL_STATUS)"
