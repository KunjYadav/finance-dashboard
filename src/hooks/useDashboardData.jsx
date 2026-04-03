import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { formatCurrency } from "../utils/formatters";

export const useDashboardData = (filteredTransactions, selectedYear, availableYears) => {
  return useMemo(() => {
    let inc = 0, exp = 0;
    const catMap = new Map();
    const monthlyData = {};

    filteredTransactions.forEach((tx) => {
      const amt = parseFloat(tx.amount);
      const txDate = new Date(tx.date);
      const monthKey = `${txDate.getFullYear()}-${String(txDate.getMonth() + 1).padStart(2, "0")}`;

      if (!monthlyData[monthKey])
        monthlyData[monthKey] = { income: 0, expense: 0 };

      if (tx.type === "income") {
        inc += amt;
        monthlyData[monthKey].income += amt;
      } else {
        exp += amt;
        monthlyData[monthKey].expense += amt;
        catMap.set(tx.category, (catMap.get(tx.category) || 0) + amt);
      }
    });

    const activeYear =
      selectedYear === "all"
        ? availableYears[0] || new Date().getFullYear().toString()
        : selectedYear;
    const monthsList = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const formattedChartData = monthsList.map((monthName, index) => {
      const monthKey = `${activeYear}-${String(index + 1).padStart(2, "0")}`;
      return {
        label: monthName,
        year: activeYear,
        income: monthlyData[monthKey]?.income || 0,
        expense: monthlyData[monthKey]?.expense || 0,
      };
    });

    let monthlyTrendText = "Not enough data for comparison.";
    let isTrendGood = true;

    const sortedMonthsWithData = Object.keys(monthlyData).sort();
    if (sortedMonthsWithData.length >= 2) {
      const currentMonthKey = sortedMonthsWithData[sortedMonthsWithData.length - 1];
      const previousMonthKey = sortedMonthsWithData[sortedMonthsWithData.length - 2];

      const currentMonthExp = monthlyData[currentMonthKey].expense;
      const prevMonthExp = monthlyData[previousMonthKey].expense;

      if (prevMonthExp > 0) {
        const diff = ((currentMonthExp - prevMonthExp) / prevMonthExp) * 100;
        isTrendGood = diff <= 0;
        const monthName = monthsList[parseInt(currentMonthKey.split("-")[1]) - 1];
        monthlyTrendText =
          diff > 0
            ? `In ${monthName}, spent ${Math.abs(diff).toFixed(0)}% more than previous month.`
            : `Great! In ${monthName}, spent ${Math.abs(diff).toFixed(0)}% less than previous month.`;
      }
    }

    const topCategory = Array.from(catMap.entries()).sort((a, b) => b[1] - a[1])[0];
    const savingsRate = inc > 0 ? (((inc - exp) / inc) * 100).toFixed(1) : 0;

    const insights = [
      {
        id: 1,
        icon: <TrendingUp size={16} className='text-emerald-500' />,
        title: "Savings Rate",
        text: `Saved ${savingsRate}% of recorded income.`,
      },
      {
        id: 2,
        icon: isTrendGood ? (
          <TrendingDown size={16} className='text-emerald-500' />
        ) : (
          <TrendingUp size={16} className='text-rose-500' />
        ),
        title: "Monthly Trend",
        text: monthlyTrendText,
      },
      {
        id: 3,
        icon: <AlertCircle size={16} className='text-amber-500' />,
        title: "Highest Category",
        text: topCategory
          ? `Most expenses go towards ${topCategory[0]} (${formatCurrency(topCategory[1])}).`
          : "No expenses recorded.",
      },
    ];

    return {
      totalIncome: inc,
      totalExpense: exp,
      balance: inc - exp,
      chartData: formattedChartData,
      smartInsights: insights,
    };
  }, [filteredTransactions, selectedYear, availableYears]);
};