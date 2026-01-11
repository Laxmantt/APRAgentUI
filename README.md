# Application Assessment Agent v2 (2025)

A production-grade Next.js & TypeScript application designed for enterprise-scale Application Portfolio Rationalization. This tool leverages advanced agentic workflows, rich metadata analysis, and a clean-root architectural pattern to streamline on-premise to cloud migrations.

## 🚀 Enterprise Features

*   **⚡ Modern Wave Management**: Comprehensive wave planning with deep-dive analysis of inter-app dependencies, external SaaS integrations (Okta, SAP), and data source transitions (Oracle to AWS Aurora).
*   **� Advanced Portfolio Reports**: Dynamic generation and download of "6R" migration assessments, wave plans, and risk analysis summaries with enterprise-rich metadata and PDF formatting.
*   **🤖 Context-Aware Chatbot**: Integrated AI assistant that maintains context during application assessments, allowing for proactive requirement gathering and risk mitigation.
*   **� Event-Driven Toast System**: Global, non-intrusive notification engine that handles real-time success and error messaging across the entire app.
*   **🎨 Sky-Light Theming**: A dual-light premium design system (Slate & Ocean) optimized for high readability and professional "2025" aesthetics.
*   **🧪 Robust Test Infrastructure**: Centralized testing suite including modular Jest unit tests and Cypress E2E specs, relocated from the root to maintain a lean workspace.

## 🛠️ Tech Stack & Standards

*   **Framework**: [Next.js 16+](https://nextjs.org/) (Pages Router)
*   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
*   **Styling**: [Styled-Components](https://styled-components.com/) (Token-based design)
*   **API Layer**: [Axios](https://axios-http.com/) with Global Interceptors & Translators
*   **Mocking**: [MSW (Mock Service Worker)](https://mswjs.io/) for frontend-first development
*   **Architecture**: Container/Component pattern with a "Clean Root" strategy

## 📂 Project Structure

```
.
├── src/                # Application Source Code
│   ├── components/     # Reusable UI Components & Tokens
│   ├── containers/     # Business Logic & Page Controllers
│   ├── services/       # API Clients & Domain Services (Axios)
│   ├── store/          # Redux Toolkit Slices & Store
│   ├── types/          # Strict TypeScript Domain Models
│   └── utils/          # Shared Utilities (Formatting, Downloads)
├── tests/              # Centralized Testing Infrastructure
│   ├── config/         # Jest/Vitest Config & Global Mocks
│   ├── e2e/            # Cypress Specs & Config
│   └── unit/           # Unit & Integration Tests
├── public/             # Static Assets & Service Workers
└── [Root Configs]      # Lean config files (tsconfig, next.config, etc.)
```

## 🏁 CLI Command Center

### 1. Installation
Ensure you have Node.js (v18+) installed.

```powershell
# Install project dependencies
npm install
```

### 2. Development
Start the local development server with hot-reloading.

```powershell
# Run app on http://localhost:3000
npm run dev
```

### 3. Build & Production
Generate an optimized production build.

```powershell
# Build the application
npm run build

# Start the production server
npm start
```

### 4. Testing Suite
The testing infrastructure has been modularized for speed and root cleanliness.

```powershell
# Run Unit Tests (Jest)
npm test

# Run End-to-End Tests (Cypress Interactive)
npm run e2e

# Run E2E Tests (Headless/CI)
npm run e2e:headless
```

## 🔧 Configuration

The app is **Mock-Enabled by Default** for frictionless evaluation.

- **Mocking**: Toggled via `NEXT_PUBLIC_USE_MOCKS` in `.env.local`.
- **API Base**: Configured in `src/config/appConfig.ts`.
- **MSW**: The service worker in `public/mockServiceWorker.js` manages local data interception.

## 📝 Standards Note
This project adheres to the **2025 Clean Architecture Standard**. It minimizes root-level clutter by encapsulating all non-runtime configurations (Tests, Mocks, Tooling) into sub-directories while leveraging Tier-1 libraries for state and API management.

