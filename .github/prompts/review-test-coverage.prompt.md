---
agent: ask
model: GPT-5.3-Codex
description: Review existing test coverage and identify critical gaps
---

Review current test coverage for the target module and identify quality gaps.

Input:
- Module/component under review:
- Existing tests:
- Coverage metrics (line/branch/function):
- Recent defects or regressions:

Requirements:
- Evaluate happy path, negative, boundary, error handling, and authorization coverage.
- Identify risky untested paths.
- Suggest high-value additional tests first.
- Mark quick wins vs deeper investment.

Output format:
1. Coverage summary
2. Critical gaps (ranked high to low)
3. Recommended tests (table):
   - Test name
   - Gap addressed
   - Priority
   - Type (Unit/API/UI/E2E)
4. Regression risk note
5. Suggested next sprint actions

Constraints:
- Keep recommendations actionable and specific.
- Avoid generic statements like "add more tests".
