# DropShip TestSuite

Standalone QA automation project for UI and API tests.

## Why this setup
- Uses one lightweight runner (`@playwright/test`) for both test types.
- Keeps test assets isolated from app code.
- Separates UI and API tests into dedicated folders.

## Structure
- `tests/ui`: browser UI tests
- `tests/api`: HTTP API tests

## Prerequisites
- UI app running at `http://localhost:5173`
- API running at `http://localhost:4000`

You can override these with environment variables:
- `UI_BASE_URL`
- `API_BASE_URL`

## Install
```bash
cd testsuite
npm install
npx playwright install
```

## Run tests
```bash
npm run test:ui
npm run test:api
npm test
```
