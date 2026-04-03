import React from 'react';
import { formatK, formatTooltipCurrency, formatCurrency } from "../../utils/formatters";

export const AnalyticsBarChart = ({ data, hoveredLegend }) => {
  if (!data || data.length === 0)
    return (
      <div className='h-85 flex items-center justify-center text-gray-400'>
        No data available
      </div>
    );

  const maxVal = Math.max(
    ...data.map((d) => Math.max(d.income, d.expense)),
    10000,
  );
  const step = Math.ceil(maxVal / 5);
  const topStep = Math.ceil((step * 5) / 10000) * 10000;
  const yAxisLabels = [
    topStep,
    topStep * 0.8,
    topStep * 0.6,
    topStep * 0.4,
    topStep * 0.2,
    0,
  ];

  return (
    <div className='relative w-full h-75 md:h-90 flex flex-col mt-2'>
      <div className='absolute inset-0 flex flex-col justify-between pb-9.5 pt-20 z-0 pointer-events-none'>
        {yAxisLabels.map((val, idx) => (
          <div key={idx} className='flex items-center w-full'>
            <span className='w-8 md:w-10 text-[10px] md:text-xs text-gray-400 font-medium text-right mr-3 shrink-0'>
              {formatK(val)}
            </span>
            <div className='flex-1 border-b border-dashed border-gray-200 dark:border-gray-700/80'></div>
          </div>
        ))}
      </div>

      <div className='relative z-10 flex-1 flex overflow-x-auto overflow-y-hidden custom-scrollbar pl-12 md:pl-16 pr-2 md:pr-4'>
        <div className='flex justify-between items-end min-w-150 w-full h-full pb-2 pt-20'>
          {data.map((item, idx) => {
            const incomeHeight = `${Math.max((item.income / topStep) * 100, 0)}%`;
            const expenseHeight = `${Math.max((item.expense / topStep) * 100, 0)}%`;

            const incomeOpacity =
              hoveredLegend === "expense" ? "opacity-30" : "opacity-100";
            const expenseOpacity =
              hoveredLegend === "income" ? "opacity-30" : "opacity-100";
            const totalValue = item.income + item.expense;

            return (
              <div
                key={idx}
                className='relative flex flex-col items-center flex-1 h-full group cursor-pointer'
              >
                <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white dark:bg-gray-800 shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-xl p-4 z-50 whitespace-nowrap pointer-events-none min-w-35 mb-4 border border-gray-50 dark:border-gray-700'>
                  <p className='text-[#64748b] dark:text-gray-400 text-xs font-medium mb-1'>
                    {item.label} {item.year}
                  </p>
                  <p className='font-bold text-[#1e293b] dark:text-white text-lg tracking-tight mb-3'>
                    {formatTooltipCurrency(totalValue)}
                  </p>
                  <div className='flex flex-col gap-1.5'>
                    <div className='flex items-center justify-between gap-4'>
                      <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 rounded-full bg-[#6366f1]'></div>
                        <span className='text-gray-500 dark:text-gray-400 text-xs'>
                          Income
                        </span>
                      </div>
                      <span className='font-semibold text-gray-900 dark:text-white text-xs'>
                        {formatCurrency(item.income)}
                      </span>
                    </div>
                    <div className='flex items-center justify-between gap-4'>
                      <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 rounded-full bg-[#4cc9f0]'></div>
                        <span className='text-gray-500 dark:text-gray-400 text-xs'>
                          Expense
                        </span>
                      </div>
                      <span className='font-semibold text-gray-900 dark:text-white text-xs'>
                        {formatCurrency(item.expense)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='flex items-end gap-1.5 md:gap-2 h-full w-full justify-center'>
                  <div
                    className={`w-4 md:w-5 bg-[#4cc9f0] rounded-t-sm md:rounded-t-md transition-all duration-300 group-hover:brightness-110 group-hover:shadow-[0_0_15px_rgba(76,201,240,0.6)] relative z-20 ${expenseOpacity}`}
                    style={{
                      height: expenseHeight,
                      minHeight: item.expense > 0 ? "4px" : "0",
                    }}
                  />
                  <div
                    className={`w-4 md:w-5 bg-[#6366f1] rounded-t-sm md:rounded-t-md transition-all duration-300 group-hover:brightness-110 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.6)] relative z-20 ${incomeOpacity}`}
                    style={{
                      height: incomeHeight,
                      minHeight: item.income > 0 ? "4px" : "0",
                    }}
                  />
                </div>

                <span className='h-6 mt-2 text-[11px] md:text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-center'>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
