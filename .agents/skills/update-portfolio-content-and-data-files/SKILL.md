---
name: update-portfolio-content-and-data-files
description: "Use when New academic papers or professional experience needs to be added to the portfolio. Do not use for Changing the visual styling or layout of the website"
---

<!-- generated-by: coding-agent-personalizer skill-exporter v1 -->

# Draft: Update portfolio content and data files

## When to use

Use this skill when New academic papers or professional experience needs to be added to the portfolio.

Do not use this skill for:
- Changing the visual styling or layout of the website

## Likely files and directories

Inspect these recurring locations first; the current task may involve only a subset:
- `data/papers.json`
- `data/profile.json`
- `data/experience.json`
- `data/about.json`
- `data/study.json`
- `app/page.js`
- `app/layout.js`
- `data/`
- `app/`

## Steps

1. Modify the relevant JSON files in the data directory such as data/papers.json or data/profile.json
2. Update app/page.js or app/layout.js to ensure the new data is correctly rendered

## Validation

Before finishing:
- Verify the deployment status in .github/workflows/deploy.yml
- Check the validation-related changes in .github/workflows/deploy.yml.

## Expected outcome

The portfolio website displays the updated personal information or publication list

## Notes

- Prefer project-specific conventions from AGENTS.md when they conflict with this workflow.
- Treat this as a draft until repeated evidence or explicit approval confirms it.
- Review this skill for private or local-only details before publishing.
