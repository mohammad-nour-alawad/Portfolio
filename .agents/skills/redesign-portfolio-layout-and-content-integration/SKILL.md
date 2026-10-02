---
name: redesign-portfolio-layout-and-content-integration
description: "Use when A requirement to change the overall UI structure and how data is presented. Do not use for Adding a single new entry to an existing data list"
---

<!-- generated-by: coding-agent-personalizer skill-exporter v1 -->

# Draft: Redesign portfolio layout and content integration

## When to use

Use this skill when A requirement to change the overall UI structure and how data is presented.

Do not use this skill for:
- Adding a single new entry to an existing data list

## Likely files and directories

Inspect these recurring locations first; the current task may involve only a subset:
- `app/layout.js`
- `app/page.js`
- `data/about.json`
- `data/papers.json`
- `app/components/visit-counter.js`
- `data/profile.json`
- `data/experience.json`
- `app/`
- `data/`
- `app/components/`

## Steps

1. Adjust the structural components in app/layout.js and app/page.js
2. Sync changes with corresponding data structures in the data directory
3. Integrate any necessary UI components from app/components/

## Validation

Before finishing:
- Review the changes against the deployment workflow in .github/workflows/deploy.yml
- Check the validation-related changes in .github/workflows/deploy.yml.

## Expected outcome

A redesigned portfolio interface that correctly integrates updated content and components

## Notes

- Prefer project-specific conventions from AGENTS.md when they conflict with this workflow.
- Treat this as a draft until repeated evidence or explicit approval confirms it.
- Review this skill for private or local-only details before publishing.
