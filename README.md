# Finance Dashboard UI

A clean, responsive, and interactive frontend dashboard for users to track, manage, and understand their financial activity. This project was built to demonstrate modern frontend development practices, UI/UX design thinking, and effective state management.

## 🚀 Live Demo

*(Insert link to your deployed application here, e.g., Vercel, Netlify, or GitHub Pages)*

## ✨ Features

### 1. Dashboard Overview

* **Summary Cards:** Quick glances at Total Balance, Total Income, and Total Expenses.
* **Visualizations:** * A time-series chart showing the balance trend over the last 30 days.
  * A doughnut chart breaking down expenses by category (e.g., Housing, Food, Entertainment).

### 2. Transactions Management

* **Data Table:** A comprehensive list of transactions displaying Date, Amount, Category, and Type (Income/Expense).
* **Interactivity:** * Search functionality by transaction name or category.
  * Filtering by Income vs. Expense.
  * Column sorting (e.g., sorting by Date or Amount).

### 3. Role-Based UI (RBAC Simulation)

* Simulated user roles with a frontend toggle.
* **Viewer Role:** Read-only access to charts, insights, and transaction lists.
* **Admin Role:** Unlocks capabilities to add new transactions, edit existing ones, or delete records.

### 4. Smart Insights

* Automatically calculates and displays key financial observations:
  * Highest spending category for the current month.
  * Month-over-month spending comparison.
  * Largest single transaction.

### 5. UI/UX & Enhancements

* **Responsive Design:** Fully fluid layout that works seamlessly on desktop, tablet, and mobile devices.
* **Empty States:** Graceful handling of empty transaction lists or unpopulated chart data.
* **Dark Mode:** Integrated theme toggling for user preference.
* **Data Persistence:** Uses `localStorage` to save transactions and user preferences across sessions.

## 🛠️ Tech Stack

* **Framework:** React 18 (via Vite)
* **Styling:** Tailwind CSS
* **State Management:** React Context
* **Charts:** Custom Chart
* **Icons:** Lucide React

## 📦 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone [https://github.com/yourusername/finance-dashboard.git](https://github.com/yourusername/finance-dashboard.git)
   ```

2. Navigate into the project directory:

   ```bash
   cd finance-dashboard
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.

## 🧠 Architecture & Approach

### State Management

The application's state (transactions, active user role, applied filters, and theme) is managed using *(Context API)*. This ensures that when a new transaction is added via the Admin panel, the summary cards, charts, and transaction list all update synchronously without requiring prop-drilling.

### Component Structure

The project follows a modular, feature-based directory structure:

* `src/components/`: Reusable UI elements (Buttons, Cards, Modals).
* `src/features/dashboard/`: Complex components specific to the dashboard view (Charts, Summary).
* `src/features/transactions/`: Components handling the transaction table, forms, and filtering logic.
* `src/hooks/`: Custom React hooks for calculating insights and filtering data.
* `src/utils/`: Helper functions and constants (e.g., currency formatting, mock data).

### Mock Data Strategy

To ensure the dashboard looks populated upon first load, a mock dataset is loaded into the application state initially. If the user makes changes, those changes are persisted locally.

## 🤝 Contact

Kunj Yadav - [kunj.yadav555@gmail.com](mailto:kunj.yadav555@gmail.com)
Project Link: [https://github.com/KunjYadav/finance-dashboard](https://www.google.com/search?q=https://github.com/KunjYadav/finance-dashboard)
# finance-dashboard
