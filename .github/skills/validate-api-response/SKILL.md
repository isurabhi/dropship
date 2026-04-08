---
name: validate-api-response
description: Validate API endpoint status and response contract quickly
---

# Validate API Response Skill

Use this skill to smoke-test API responses in QA pipelines.

## Inputs
- `API_URL` (required): full endpoint URL.
- `EXPECTED_STATUS` (optional): expected HTTP status code, default `200`.
- `EXPECTED_CONTAINS` (optional): text that must appear in response body.

## Behavior
- Sends HTTP request with curl.
- Validates status code.
- Optionally validates response body content.

## Output
- Human-readable pass/fail message.
- Non-zero exit code on mismatch.

## Invocation
Run `.github/skills/validate-api-response/validate-api.sh` with env vars.
