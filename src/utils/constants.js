export const INITIAL_TRANSACTIONS = [
  { id: "1", date: "2026-04-02", amount: 25000.0, category: "Food", type: "expense", description: "Monthly Groceries", itemType: "Card payment" },
  { id: "2", date: "2026-04-01", amount: 42000.0, category: "Salary", type: "income", description: "Tech Corp Inc.", itemType: "Transfer" },
  { id: "3", date: "2026-03-28", amount: 15000.0, category: "Clothes", type: "expense", description: "New Shirts", itemType: "Card payment" },
  { id: "4", date: "2026-03-22", amount: 10000.0, category: "Entertainment", type: "expense", description: "Movie & Popcorn", itemType: "Card payment" },
  { id: "8", date: "2026-03-01", amount: 34000.0, category: "Business", type: "income", description: "Side Hustle", itemType: "Transfer" },
  { id: "9", date: "2026-02-25", amount: 30000.0, category: "Salary", type: "income", description: "Tech Corp Inc.", itemType: "Transfer" },
  { id: "10", date: "2026-02-20", amount: 20000.0, category: "Clothes", type: "expense", description: "Winter Jacket", itemType: "Card payment" },
  { id: "12", date: "2026-02-10", amount: 19000.0, category: "Food", type: "expense", description: "Groceries & Dining", itemType: "Card payment" },
  { id: "14", date: "2026-01-01", amount: 42000.0, category: "Salary", type: "income", description: "Tech Corp Inc.", itemType: "Transfer" },
  { id: "16", date: "2026-01-15", amount: 30000.0, category: "Food", type: "expense", description: "Groceries", itemType: "Card payment" },
  { id: "101", date: "2025-12-15", amount: 12000.0, category: "Entertainment", type: "expense", description: "Holiday Trip", itemType: "Card payment" },
  { id: "102", date: "2025-12-01", amount: 40000.0, category: "Salary", type: "income", description: "Tech Corp Inc.", itemType: "Transfer" },
  { id: "103", date: "2025-11-20", amount: 18000.0, category: "Clothes", type: "expense", description: "Winter Wardrobe", itemType: "Card payment" },
  { id: "104", date: "2025-11-01", amount: 40000.0, category: "Salary", type: "income", description: "Tech Corp Inc.", itemType: "Transfer" },
];

export const CATEGORIES = [
  "Clothes", "Food", "Transport", "Utilities", "Entertainment", "Salary", "Business", "Other",
];

export const CATEGORY_STYLES = {
  Clothes: { hex: "#ec4899", class: "bg-pink-500" },
  Food: { hex: "#f97316", class: "bg-orange-500" },
  Transport: { hex: "#3b82f6", class: "bg-blue-500" },
  Utilities: { hex: "#eab308", class: "bg-yellow-500" },
  Entertainment: { hex: "#a855f7", class: "bg-purple-500" },
  Salary: { hex: "#10b981", class: "bg-emerald-500" },
  Business: { hex: "#6366f1", class: "bg-indigo-500" },
  Other: { hex: "#6b7280", class: "bg-gray-500" },
};