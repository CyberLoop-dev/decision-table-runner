<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:111827,100:ea580c&height=180&section=header&text=Decision%20Table%20Runner&fontColor=ffffff&fontSize=36" alt="Decision Table Runner banner"/>
  <br/><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&duration=2600&pause=700&center=true&vCenter=true&width=650&lines=Turn+rules+into+repeatable+decisions;Evaluate+JSON+records+safely;Inspect+why+each+rule+matched" alt="Animated title"/>
  <br/><img src="https://img.shields.io/github/license/CyberLoop-dev/decision-table-runner" alt="License"/> <img src="https://img.shields.io/github/languages/top/CyberLoop-dev/decision-table-runner" alt="Language"/> <img src="https://img.shields.io/github/stars/CyberLoop-dev/decision-table-runner" alt="Stars"/> <img src="https://img.shields.io/github/last-commit/CyberLoop-dev/decision-table-runner" alt="Last commit"/>
  <br/><img src="assets/mark.svg" width="210" alt="Decision table illustration"/>
</p>

## 🧭 Overview

Decision Table Runner is a dependency-free Node.js CLI for evaluating JSON rules against JSON records. Rules are declarative data, not executable code, and every evaluation includes a condition trace.

## ✨ Features

- 📋 Support equality, comparisons, membership, contains, and existence checks.
- 🎯 Use first-match mode or collect every matching rule.
- 🔎 Explain each condition result for every evaluated rule.
- 🧪 Include a ready-to-run sample rule table and records.
- 🛡️ Never evaluate JavaScript expressions from rule files.

## 🎬 Demo

Run the included sample and inspect the JSON output to see the selected action and the condition-by-condition trace. No hosted demo is claimed.

## 🚀 Quick Start

Requires Node.js 18 or newer.

```bash
npm start -- --rules sample/rules.json --input sample/records.json
```

Use all-match mode:

```bash
npm start -- --rules sample/rules.json --input sample/records.json --all
```

## 🧰 Tech Stack

- 🟢 Node.js 18+
- 📄 JSON input and output
- 📦 No third-party dependencies

## 🗂️ Folder Structure

```text
decision-table-runner/
├── assets/mark.svg
├── index.js
├── sample/
│   ├── records.json
│   └── rules.json
├── package.json
├── README.md
├── LICENSE
└── .gitignore
```

## 🛣️ Roadmap

- [ ] Add nested field paths.
- [ ] Add a CSV input adapter.
- [ ] Generate a compact Markdown decision report.

## 🤝 Contributing

Add fixtures for new operators and edge cases. Keep rules declarative and avoid introducing dynamic code execution.

## 📄 License

MIT licensed. See [LICENSE](LICENSE).

<p align="center"><img src="https://capsule-render.vercel.app/api?type=waving&color=0:ea580c,100:111827&height=105&section=footer" alt="Wave footer"/></p>
