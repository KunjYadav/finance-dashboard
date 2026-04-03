/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useMemo } from 'react';

export const useTransactionFilters = (transactions) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  const availableYears = useMemo(() => {
    const years = new Set(transactions.map((tx) => tx.date.split("-")[0]));
    return Array.from(years).sort((a, b) => b - a);
  }, [transactions]);

  useEffect(() => {
    if (
      selectedYear !== "all" &&
      !availableYears.includes(selectedYear) &&
      availableYears.length > 0
    ) {
      setSelectedYear(availableYears[0]);
    }
  }, [availableYears, selectedYear]);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        const txYear = tx.date.split("-")[0];
        const matchesSearch =
          tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === "all" || tx.type === filterType;
        const matchesYear = selectedYear === "all" || txYear === selectedYear;
        return matchesSearch && matchesType && matchesYear;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, searchTerm, filterType, selectedYear]);

  return {
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    selectedYear,
    setSelectedYear,
    availableYears,
    filteredTransactions,
  };
};
