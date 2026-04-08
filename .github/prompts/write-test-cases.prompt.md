---
agent: ask
model: GPT-5.3-Codex
description: Generate clear, risk-based QA test cases from requirements
---

Write comprehensive QA test cases for the provided feature or requirement.

Input:
- Feature name:
- Requirement details:
- In-scope platforms:
- Out-of-scope items:

Requirements:
- Include positive, negative, boundary, and validation scenarios.
- Include API and UI scenarios where applicable.
- Include preconditions and test data assumptions.
- Include expected result for each case.
- Flag high-risk scenarios.

Output format:
1. Short scope summary (3-5 bullets)
2. Test cases table with columns:
   - ID
   - Scenario
   - Preconditions
   - Steps
   - Test Data
   - Expected Result
   - Priority (P0/P1/P2)
   - Type (Functional/Negative/Boundary/Regression)
3. Risks and gaps section

Constraints:
- Keep language concise and executable by manual and automation testers.
- Avoid duplicate cases; merge where reasonable.
- If requirement details are incomplete, state assumptions first.
