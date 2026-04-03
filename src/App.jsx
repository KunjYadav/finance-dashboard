/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  CreditCard,
  Layers,
  Activity,
  Settings,
  Search,
  Bell,
  Moon,
  Sun,
  LogOut,
  Hexagon,
  Menu,
  Download,
  Wallet,
  Coins,
  PiggyBank,
  Receipt,
  X,
} from "lucide-react";

import { NavItem } from "./components/NavItem";
import { CustomDropdown } from "./components/CustomDropdown";
import { StatCard } from "./components/StatCard";

import { AnalyticsBarChart } from "./features/dashboard/AnalyticsBarChart";
import { SpendingPieChart } from "./features/dashboard/SpendingPieChart";
import { SmartInsights } from "./features/dashboard/SmartInsights";
import { PrimaryCard } from "./features/dashboard/PrimaryCard";

import { TransactionModal } from "./features/transactions/TransactionModal";
import { TransactionTable } from "./features/transactions/TransactionTable";

import { useTransactions } from "./hooks/useTransactions";
import { useTransactionFilters } from "./hooks/useTransactionFilters";
import { useDashboardData } from "./hooks/useDashboardData";

export default function App() {
  const { transactions, handleSaveTransaction, handleDeleteTransaction } =
    useTransactions();

  const {
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    selectedYear,
    setSelectedYear,
    availableYears,
    filteredTransactions,
  } = useTransactionFilters(transactions);

  const { totalIncome, totalExpense, balance, chartData, smartInsights } =
    useDashboardData(filteredTransactions, selectedYear, availableYears);

  const [role, setRole] = useState("admin");
  const [isDark, setIsDark] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [hoveredLegend, setHoveredLegend] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme_v26");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme_v26", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme_v26", "light");
    }
  };

  const handleExport = (format) => {
    if (filteredTransactions.length === 0) {
      alert("No data available to export based on current filters.");
      return;
    }

    let dataStr = "";
    let mimeType = "";
    let fileExtension = "";

    if (format === "csv") {
      const headers = ["Date", "Item Name", "Type", "Category", "Amount"];
      const csvRows = filteredTransactions.map(
        (tx) =>
          `${tx.date},"${tx.description}",${tx.type},${tx.category},${tx.amount}`,
      );
      dataStr = [headers.join(","), ...csvRows].join("\n");
      mimeType = "text/csv;charset=utf-8;";
      fileExtension = "csv";
    } else if (format === "json") {
      dataStr = JSON.stringify(filteredTransactions, null, 2);
      mimeType = "application/json";
      fileExtension = "json";
    }

    const blob = new Blob([dataStr], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `transactions_export_${selectedYear}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #475569; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
      `}</style>

      <div
        className={`flex h-screen overflow-hidden font-sans ${isDark ? "bg-gray-950 text-gray-100 dark" : "bg-[#f8fafc] text-gray-900"}`}
      >
        {/* Desktop Sidebar */}
        <aside className='w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex-col hidden lg:flex z-20 shrink-0 transition-colors'>
          <div className='p-6 pb-4 flex items-center gap-3'>
            <div className='w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm shadow-blue-600/30'>
              <Hexagon className='text-white fill-white' size={20} />
            </div>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white tracking-tight'>
              Finance.
            </h1>
          </div>
          <nav className='flex-1 px-4 mt-6 space-y-1'>
            <NavItem icon={LayoutDashboard} text='Dashboard' active={true} />
            <NavItem icon={CreditCard} text='Cards' active={false} />
            <NavItem icon={Layers} text='Subscriptions' active={false} />
            <NavItem icon={Activity} text='Currency Rates' active={false} />
            <NavItem icon={Settings} text='Settings' active={false} />
          </nav>
          <div className='p-4 mb-4'>
            <NavItem icon={LogOut} text='Log out' active={false} />
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <div
            className='fixed inset-0 bg-black/50 z-100 lg:hidden transition-opacity'
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className='p-6 pb-4 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm shadow-blue-600/30'>
                    <Hexagon className='text-white fill-white' size={20} />
                  </div>
                  <h1 className='text-2xl font-bold text-gray-900 dark:text-white tracking-tight'>
                    Finance.
                  </h1>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors'
                >
                  <X size={20} />
                </button>
              </div>
              <nav className='flex-1 px-4 mt-6 space-y-1 overflow-y-auto'>
                <NavItem
                  icon={LayoutDashboard}
                  text='Dashboard'
                  active={true}
                />
                <NavItem icon={CreditCard} text='Cards' active={false} />
                <NavItem icon={Layers} text='Subscriptions' active={false} />
                <NavItem icon={Activity} text='Currency Rates' active={false} />
                <NavItem icon={Settings} text='Settings' active={false} />
              </nav>
              <div className='p-4 mb-4'>
                <NavItem icon={LogOut} text='Log out' active={false} />
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className='flex-1 flex flex-col overflow-hidden min-w-0'>
          {/* Header */}
          <header className='px-4 md:px-6 lg:px-8 pt-4 md:pt-6 pb-4 flex flex-col md:flex-row md:items-center gap-4 shrink-0'>
            <div className='flex justify-between items-center w-full md:w-auto'>
              <div>
                <h2 className='text-2xl font-bold dark:text-white'>
                  Dashboard
                </h2>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Welcome back!
                </p>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className='p-2 bg-white dark:bg-gray-800 rounded-lg text-gray-500 hover:text-blue-600 dark:text-gray-400 shadow-sm border border-gray-100 dark:border-gray-700 lg:hidden transition-colors'
              >
                <Menu size={20} />
              </button>
            </div>

            <div className='flex-1 w-full max-w-md relative'>
              <Search
                className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                size={18}
              />
              <input
                type='text'
                placeholder='Search for anything....'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full bg-white dark:bg-gray-800 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm border border-gray-100 dark:border-gray-700 dark:text-white transition-all'
              />
            </div>

            <div className='flex items-center gap-4 lg:gap-6 w-full md:w-auto justify-between md:justify-end'>
              <button
                onClick={toggleTheme}
                className='p-2 bg-white dark:bg-gray-800 rounded-full text-gray-500 hover:text-blue-600 dark:text-gray-400 shadow-sm transition-colors border border-gray-100 dark:border-gray-700'
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button className='p-2 bg-white dark:bg-gray-800 rounded-full text-gray-500 hover:text-blue-600 dark:text-gray-400 shadow-sm transition-colors border border-gray-100 dark:border-gray-700'>
                <Bell size={18} />
              </button>

              <div className='flex items-center gap-4'>
                <div className='flex items-center p-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm'>
                  <button
                    onClick={() => setRole("admin")}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${role === "admin" ? "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
                  >
                    Admin
                  </button>
                  <button
                    onClick={() => setRole("viewer")}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${role === "viewer" ? "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
                  >
                    Viewer
                  </button>
                </div>
                <div className='w-10 h-10 rounded-full bg-linear-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-md cursor-pointer hover:ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ring-blue-500 transition-all'>
                  KY
                </div>
              </div>
            </div>
          </header>

          <main className='flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 pb-8 flex flex-col lg:flex-row gap-6 xl:gap-8'>
            {/* Left Content Area */}
            <div className='flex-1 flex flex-col gap-6 xl:gap-8 min-w-0'>
              {/* Stat Cards */}
              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6'>
                <StatCard
                  title='Total Balance'
                  amount={234910 + balance}
                  trend={1.29}
                  isPositive={true}
                  color='yellow'
                  icon={<Wallet size={26} strokeWidth={2.5} />}
                />
                <StatCard
                  title='Total Income'
                  amount={486200 + totalIncome}
                  trend={-1.29}
                  isPositive={false}
                  color='blue'
                  icon={<Coins size={26} strokeWidth={2.5} />}
                />
                <StatCard
                  title='Total Saving'
                  amount={357400 + (totalIncome - totalExpense)}
                  trend={1.29}
                  isPositive={true}
                  color='green'
                  icon={<PiggyBank size={26} strokeWidth={2.5} />}
                />
                <StatCard
                  title='Total Expense'
                  amount={128800 + totalExpense}
                  trend={-1.29}
                  isPositive={false}
                  color='red'
                  icon={<Receipt size={26} strokeWidth={2.5} />}
                />
              </div>

              {/* Analytics Chart */}
              <div className='bg-white dark:bg-gray-900 p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 shrink-0'>
                <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4'>
                  <h3 className='text-xl font-bold text-[#1e293b] dark:text-white'>
                    Analytics
                  </h3>
                  <div className='flex items-center justify-between md:justify-end gap-6 w-full md:w-auto'>
                    <div className='flex items-center gap-4'>
                      <div
                        className={`flex items-center gap-2 cursor-pointer transition-opacity duration-300 ${hoveredLegend === "expense" ? "opacity-40" : "opacity-100"}`}
                        onMouseEnter={() => setHoveredLegend("income")}
                        onMouseLeave={() => setHoveredLegend(null)}
                      >
                        <span className='w-3 h-3 rounded-full bg-[#6366f1]'></span>
                        <span className='text-sm font-semibold text-gray-900 dark:text-gray-200'>
                          Income
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-2 cursor-pointer transition-opacity duration-300 ${hoveredLegend === "income" ? "opacity-40" : "opacity-100"}`}
                        onMouseEnter={() => setHoveredLegend("expense")}
                        onMouseLeave={() => setHoveredLegend(null)}
                      >
                        <span className='w-3 h-3 rounded-full bg-[#4cc9f0]'></span>
                        <span className='text-sm font-semibold text-gray-900 dark:text-gray-200'>
                          Expense
                        </span>
                      </div>
                    </div>
                    <CustomDropdown
                      value={selectedYear}
                      onChange={setSelectedYear}
                      options={[
                        { value: "all", label: "All Years" },
                        ...availableYears.map((year) => ({
                          value: year,
                          label: year.toString(),
                        })),
                      ]}
                      align='right'
                      triggerClassName='flex items-center justify-between gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none min-w-[120px]'
                      menuClassName='w-36'
                    />
                  </div>
                </div>
                <AnalyticsBarChart
                  data={chartData}
                  hoveredLegend={hoveredLegend}
                />
              </div>

              {/* Transactions List */}
              <div className='bg-white dark:bg-gray-900 p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex-1'>
                <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6'>
                  <h3 className='text-lg font-bold dark:text-white'>
                    Latest Transactions
                  </h3>
                  <div className='flex items-center gap-3 w-full md:w-auto'>
                    <div className='flex-1 md:flex-none z-10'>
                      <CustomDropdown
                        value={filterType}
                        onChange={setFilterType}
                        options={[
                          { value: "all", label: "All Types" },
                          { value: "income", label: "Income Only" },
                          { value: "expense", label: "Expenses Only" },
                        ]}
                        align='left'
                        triggerClassName='w-full md:w-auto flex items-center justify-between gap-2 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-xs px-4 py-2.5 rounded-xl font-bold outline-none cursor-pointer transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/50 min-w-[140px]'
                        menuClassName='w-40'
                      />
                    </div>
                    <div className='relative group flex-1 md:flex-none z-11'>
                      <button className='w-full md:w-auto flex justify-center items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-xs px-4 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium min-w-27.5'>
                        <Download size={14} /> Export
                      </button>
                      <div className='absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden transform origin-top group-hover:scale-100 scale-95'>
                        <button
                          onClick={() => handleExport("csv")}
                          className='w-full text-left px-4 py-2.5 text-xs hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-colors'
                        >
                          Download CSV
                        </button>
                        <button
                          onClick={() => handleExport("json")}
                          className='w-full text-left px-4 py-2.5 text-xs hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium border-t border-gray-50 dark:border-gray-700/50 transition-colors'
                        >
                          Download JSON
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <TransactionTable
                  transactions={filteredTransactions}
                  role={role}
                  onEdit={(tx) => {
                    setEditingTransaction(tx);
                    setIsModalOpen(true);
                  }}
                  onDelete={handleDeleteTransaction}
                />
              </div>
            </div>

            {/* Right Side Panel */}
            <div className='w-full lg:w-75 xl:w-90 shrink-0 flex flex-col gap-6 xl:gap-8 pb-8'>
              <PrimaryCard />
              <SpendingPieChart transactions={filteredTransactions} />
              <SmartInsights insights={smartInsights} />
            </div>
          </main>
        </div>

        <TransactionModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTransaction(null);
          }}
          onSave={(data) => handleSaveTransaction(data, editingTransaction)}
          initialData={editingTransaction}
        />
      </div>
    </>
  );
}
