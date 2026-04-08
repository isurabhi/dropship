---
agent: ask
model: GPT-5.3-Codex
description: Generate release-ready QA test plans
---

Generate a QA test plan for the upcoming feature/release.

Input:
- Release/feature name:
- Scope:
- Non-functional requirements:
- Dependencies:
- Timeline:

Requirements:
- Define objectives, scope, and exit criteria.
- Include test strategy by level: unit, API, integration, UI/E2E.
- Include environments, data, and tooling needs.
- Include risk-based prioritization and mitigation.
- Include execution timeline and ownership model.

Output format:
1. Objectives
2. Scope (in/out)
3. Test Strategy
4. Environments and Test Data
5. Entry/Exit Criteria
6. Risks and Mitigations
7. Resource Plan
8. Milestones and Timeline
9. Deliverables

Constraints:
- Keep sections concise and implementation-ready.
- If inputs are partial, state assumptions before the plan.
