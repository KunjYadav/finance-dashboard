import React from 'react';
import { MoreVertical } from "lucide-react";
import { formatCurrency } from "../utils/formatters";

const STAT_ICON_STYLES = {
  yellow: "bg-[#fff4de] text-[#ffb020] dark:bg-orange-900/30 dark:text-orange-400",
  blue: "bg-[#e5f0ff] text-[#3b82f6] dark:bg-blue-900/30 dark:text-blue-400",
  green: "bg-[#e1f5e8] text-[#10b981] dark:bg-emerald-900/30 dark:text-emerald-400",
  red: "bg-[#ffe2e5] text-[#ef4444] dark:bg-rose-900/30 dark:text-rose-400",
};

export const StatCard = ({ title, amount, trend, isPositive, color, icon }) => (
  <div className='bg-white dark:bg-gray-900 p-4 md:p-5 xl:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between hover:shadow-md transition-shadow'>
    <div className='flex justify-between items-start mb-6'>
      <div
        className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center ${STAT_ICON_STYLES[color]}`}
      >
        {icon}
      </div>
      <button className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'>
        <MoreVertical size={20} />
      </button>
    </div>
    <div>
      <p className='text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>
        {title}
      </p>
      <div className='flex items-center justify-between'>
        <h3 className='text-xl xl:text-2xl font-bold text-[#1e293b] dark:text-white truncate pr-2'>
          {formatCurrency(amount)}
        </h3>
        <div
          className={`px-2 py-0.5 rounded-full text-xs font-bold shrink-0 ${isPositive ? "bg-[#e1f5e8] text-[#10b981] dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-[#ffe2e5] text-[#ef4444] dark:bg-rose-900/30 dark:text-rose-400"}`}
        >
          {isPositive ? "+" : ""}
          {trend}%
        </div>
      </div>
    </div>
  </div>
);
