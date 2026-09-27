# Password Guardian

Password Guardian is a client-side password strength analyzer designed to help users create stronger and less predictable passwords.

It evaluates password characteristics and provides actionable feedback, including warnings about predictable sequential numbers such as `123`, `456`, or `678`.

## Features

- Password strength analysis
- Detection of predictable sequential numbers
- Real-time password feedback
- Guidance for creating stronger passwords
- Modern responsive interface
- Local password analysis without sending the password to a remote server

## Sequential Number Detection

Password Guardian identifies predictable numeric sequences such as:

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

Password analysis is designed to happen locally in the browser. Users should never reuse passwords across important accounts, and passwords should not be shared with anyone.

## License

This project is provided for educational and personal use.
