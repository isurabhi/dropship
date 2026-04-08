---
description: "Generate Playwright unit tests for a specific function using AAA and edge-case coverage"
name: "Write Function Unit Tests (Playwright)"
argument-hint: "functionName=<name>"
agent: "agent"
---
Write unit tests for the `[functionName]` function using [playwright].

Requirements:
- Cover happy path with typical inputs.
- Cover null, undefined, and empty inputs.
- Cover boundary values: minimum, maximum, zero, and negative.
- Cover expected exceptions and exact error messages.
- Follow the AAA pattern in every test: Arrange, Act, Assert.

Implementation guidance:
1. Locate the implementation of `[functionName]` and infer its input/output contract.
2. Find the existing test style and helpers in the workspace, then match naming and structure.
3. Generate a complete test file (or test block if the file exists) with concise, descriptive test names.
4. If behavior is ambiguous, state assumptions inline as comments before the affected test.

Output format:
- Start with a short "Test Plan" section (5-8 bullets).
- Then provide the final test code in a single code block.
- End with a short "Coverage Checklist" showing which required categories were addressed.
