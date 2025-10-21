# PlayJack Automation Testing Framework

A comprehensive web automation testing framework for PlayJack.com using Cypress and Playwright with TypeScript.

## 🚀 Features

- **Dual Framework Support**: Both Cypress and Playwright for flexibility
- **TypeScript**: Full type safety and better development experience
- **Cross-Browser Testing**: Support for Chrome, Firefox, Safari
- **Custom Commands**: Reusable test utilities
- **Page Object Model**: Maintainable and scalable test structure

## Technology Stack

### ✅ Core Functionality
- User Registration
- User Login
- Bonus History Verification

### Testing Frameworks
- **Cypress**: For reliable end-to-end testing with excellent debugging capabilities
- **Playwright**: For cross-browser testing and faster execution

### Programming Language
- **TypeScript**: For type safety and better developer experience

### Key Dependencies
- Cypress ^13.6.0
- Playwright ^1.40.0
- TypeScript ^5.3.3

## Setup Instructions

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### 🧪 Test Cases
1. **Successful Registration**
    - Fill registration form with valid data
    - Accept terms and conditions
    - Verify successful account creation

2. **Successful Login**
    - Login with valid credentials
    - Verify authentication
    - Handle invalid login scenarios

3. **Bonus History** (Optional)
    - Navigate to account history
    - Verify registration bonus appears
    - Validate bonus amounts and descriptions

###  🧪 Installation
1. Clone the repository:
git clone <repository-url>
cd playjack-automation

2. Install dependencies:
npm install

3. Install Playwright browsers:
npx playwright install

### Test Execution Guide
### 🚀 Running Cypress Tests
1. Open Cypress Test Runner:
npm run cy:open

2. Run Cypress tests in headless mode:
npm run cy:run

### 🚀 Running Playwright Tests
1. Run Playwright tests:
npm run playwright:test

2. View Playwright test report:
npm run playwright:report

### 🚀 Run All Tests
npm run test:all