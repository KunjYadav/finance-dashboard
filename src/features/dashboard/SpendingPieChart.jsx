import React, { useMemo } from 'react';
import { PieChart } from "lucide-react";
import { formatCurrency } from "../../utils/formatters";
import { CATEGORY_STYLES } from "../../utils/constants";

export const SpendingPieChart = ({ transactions }) => {
  const chartData = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const totalExpense = expenses.reduce(
      (sum, t) => sum + parseFloat(t.amount),
      0,
    );
    if (totalExpense === 0) return { data: [], total: 0 };
    const categoryTotals = {};
    expenses.forEach((t) => {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + parseFloat(t.amount);
    });
    const data = Object.entries(categoryTotals)
      .map(([label, value]) => ({
        label,
        value,
        percent: ((value / totalExpense) * 100).toFixed(1),
        color: CATEGORY_STYLES[label]?.hex || CATEGORY_STYLES.Other.hex,
      }))
      .sort((a, b) => b.value - a.value);
    return { data, total: totalExpense };
  }, [transactions]);

  const pieChartStyle = useMemo(() => {
    if (chartData.data.length === 0) return { background: "#f3f4f6" };
    let accumulatedPercent = 0;
    const gradientStops = chartData.data.map((item) => {
      const start = accumulatedPercent;
      accumulatedPercent += parseFloat(item.percent);
      return `${item.color} ${start}% ${accumulatedPercent}%`;
    });
    return { background: `conic-gradient(${gradientStops.join(", ")})` };
  }, [chartData]);

  return (
    <div className='bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 shrink-0'>
      <div className='flex justify-between items-center mb-6'>
        <h3 className='font-bold dark:text-white flex items-center gap-2 text-sm xl:text-base'>
          <PieChart size={18} className='text-blue-500' />
          Spending Breakdown
        </h3>
      </div>
      {chartData.data.length > 0 ? (
        <div className='flex flex-col items-center'>
          <div
            className='relative w-40 h-40 rounded-full shadow-inner mb-6 transform hover:scale-105 transition-transform duration-500 ease-out shrink-0'
            style={pieChartStyle}
          >
            <div className='absolute inset-4 bg-white dark:bg-gray-900 rounded-full shadow-sm flex items-center justify-center'>
              <span className='text-xs font-bold text-gray-400'>EXPENSES</span>
            </div>
          </div>
          <div className='w-full space-y-3'>
            {chartData.data.slice(0, 5).map((item) => (
              <div
                key={item.label}
                className='flex items-center justify-between text-sm group'
              >
                <div className='flex items-center gap-3'>
                  <span
                    className='w-3 h-3 rounded-full shadow-sm shrink-0'
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className='text-gray-600 dark:text-gray-300 font-medium group-hover:text-blue-600 transition-colors'>
                    {item.label}
                  </span>
                </div>
                <div className='text-right'>
                  <span className='font-bold text-gray-900 dark:text-white mr-2'>
                    {item.percent}%
                  </span>
                  <span className='text-xs text-gray-400'>
                    {formatCurrency(item.value)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='py-8 text-center text-gray-400 text-sm'>
          No expenses recorded yet.
        </div>
      )}
    </div>
  );
};
