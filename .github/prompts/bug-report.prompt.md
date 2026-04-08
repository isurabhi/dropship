---
agent: ask
model: GPT-5.3-Codex
description: Produce high-quality reproducible bug reports
---

Create a complete bug report from the provided issue notes, logs, screenshots, and steps.

Input:
- Feature/module:
- Environment:
- Build/version:
- Observed behavior:
- Expected behavior:
- Reproduction steps:
- Logs/evidence:

Requirements:
- Provide reproducibility assessment and confidence.
- Include exact observed vs expected behavior.
- Include likely impacted areas.
- Suggest severity and priority with rationale.
- Include mitigation/workaround if available.

Output format:
1. Title
2. Summary
3. Environment
4. Reproduction Steps
5. Expected Result
6. Actual Result
7. Evidence
8. Impact Analysis
9. Severity/Priority Recommendation
10. Workaround
11. Notes for Engineering

Guidance:
- Use precise, neutral language.
- Keep steps deterministic and minimal.
- If data is missing, include an explicit "Unknown" field instead of guessing.
