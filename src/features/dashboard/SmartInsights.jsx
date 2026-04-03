import React from 'react';
import { Lightbulb } from "lucide-react";

export const SmartInsights = ({ insights }) => (
  <div className='bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 shrink-0'>
    <h3 className='font-bold dark:text-white flex items-center gap-2 mb-4 text-sm xl:text-base'>
      <Lightbulb size={16} className='text-amber-500' /> Smart
      Insights
    </h3>
    <div className='flex flex-col gap-3'>
      {insights.map((insight) => (
        <div
          key={insight.id}
          className='flex gap-3 items-start border-b border-gray-50 dark:border-gray-800/50 pb-3 last:border-0 last:pb-0'
        >
          <div className='shrink-0 mt-0.5 p-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg'>
            {insight.icon}
          </div>
          <div>
            <h4 className='text-xs font-bold text-gray-900 dark:text-gray-200'>
              {insight.title}
            </h4>
            <p className='text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed'>
              {insight.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
