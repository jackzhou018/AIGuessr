# Real vs AI 15 Dataset

This folder contains 15 real photographs sourced from Wikimedia Commons.

- Real photos: `real/`
- Manual AI uploads: `ai/`
- Dataset records: `manifest.json`
- Source credits: `credits.csv`

When you create the AI-generated versions, place them in `ai/` using the
`aiExpectedPath` filename from `manifest.json`. For example:

```text
real/real_01_flooded-downtown.jpg
ai/ai_01_flooded-downtown.jpg
```

Keep each AI image matched to the same scene as its real counterpart.
