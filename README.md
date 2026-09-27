# Safe Passwd

Safe Passwd is a client-side password strength analyzer designed to help users create stronger and less predictable passwords.

It evaluates password characteristics and provides actionable feedback, including warnings about predictable sequential numbers such as `123`, `456`, or `678`, and checks passwords against data breaches using k-Anonymity HIBP API.

## Features

- Real-time password strength analysis
- Detection of predictable sequential numbers
- Real-time data breach checks (k-Anonymity HIBP API)
- Password generator
- Modern responsive interface with dark/light themes
- Local password analysis without sending passwords to a remote server

## Sequential Number Detection

Safe Passwd identifies predictable numeric sequences such as:

- `123`
- `456`
- `678`
- `987`
- `321`

These patterns can make passwords easier to guess. When detected, the application recommends avoiding continuous or predictable number sequences.

## Technology

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
git clone git@github.com:chandureddy142/smart-pass-detector.git
cd smart-pass-detector
npm install
```

### Development

```bash
npm run dev
```

The development server will display the local URL in the terminal.

### Production Build

```bash
npm run build
```

## Security and Privacy

Password analysis is designed to happen 100% locally in the browser. Passwords never leave your browser.

## License

This project is provided for educational and personal use.
