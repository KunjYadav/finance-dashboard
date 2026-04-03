import React from 'react';
import { Edit2, Trash2 } from "lucide-react";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { CATEGORY_STYLES } from "../../utils/constants";

export const TransactionTable = ({ transactions, role, onEdit, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className='py-8 text-center text-gray-400'>
        No transactions found matching filters.
      </div>
    );
  }

  return (
    <div className='w-full'>
      {/* DESKTOP VIEW - Standard Table */}
      <div className='hidden md:block overflow-x-auto custom-scrollbar pb-2'>
        <table className='w-full text-left text-sm'>
          <thead>
            <tr className='text-gray-400 dark:text-gray-500 border-b border-gray-50 dark:border-gray-800'>
              <th className='pb-3 font-medium whitespace-nowrap pr-4'>Date</th>
              <th className='pb-3 font-medium whitespace-nowrap pr-4'>Item Name</th>
              <th className='pb-3 font-medium whitespace-nowrap pr-4'>Type</th>
              <th className='pb-3 font-medium whitespace-nowrap pr-4'>Category</th>
              <th className='pb-3 font-medium text-right whitespace-nowrap'>Amount</th>
              {role === "admin" && <th className='pb-3 min-w-15'></th>}
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className='border-b border-gray-50 dark:border-gray-800/50 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group'
              >
                <td className='py-4 pr-4 text-gray-900 dark:text-gray-300 font-medium whitespace-nowrap'>
                  {new Date().toISOString().split("T")[0] === tx.date ? "Today" : formatDate(tx.date)}
                </td>
                <td className='py-4 pr-4 font-medium text-gray-900 dark:text-white whitespace-nowrap'>
                  {tx.description}
                </td>
                <td className='py-4 pr-4 text-gray-500 whitespace-nowrap'>
                  {tx.itemType || (tx.type === "income" ? "Transfer" : "Card payment")}
                </td>
                <td className='py-4 pr-4 flex items-center gap-2 text-gray-600 dark:text-gray-300 whitespace-nowrap'>
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${CATEGORY_STYLES[tx.category]?.class || "bg-gray-400"}`}
                  ></span>
                  {tx.category}
                </td>
                <td
                  className={`py-4 text-right font-bold whitespace-nowrap ${tx.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-gray-900 dark:text-white"}`}
                >
                  {tx.type === "income" ? "+ " : "- "}
                  {formatCurrency(Math.abs(tx.amount))}
                </td>
                {role === "admin" && (
                  <td className='py-4 text-right opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity whitespace-nowrap'>
                    <button
                      onClick={() => onEdit(tx)}
                      className='p-1 text-gray-400 hover:text-blue-500 mx-1 transition-colors'
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(tx.id)}
                      className='p-1 text-gray-400 hover:text-pink-500 transition-colors'
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW - Card List (Hidden on desktop) */}
      <div className='md:hidden flex flex-col gap-3'>
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className='p-4 bg-gray-50/50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800 rounded-2xl flex flex-col gap-3 transition-colors'
          >
            <div className='flex justify-between items-start'>
              <div className='flex items-center gap-3'>
                <div
                  className={`w-10 h-10 rounded-full flex shrink-0 items-center justify-center bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700`}
                >
                  <span
                    className={`w-3 h-3 rounded-full ${CATEGORY_STYLES[tx.category]?.class || "bg-gray-400"}`}
                  ></span>
                </div>
                <div>
                  <p className='font-bold text-gray-900 dark:text-white text-sm'>
                    {tx.description}
                  </p>
                  <p className='text-xs text-gray-500 mt-0.5'>
                    {tx.category} •{" "}
                    {new Date().toISOString().split("T")[0] === tx.date ? "Today" : formatDate(tx.date)}
                  </p>
                </div>
              </div>
              <div className='text-right'>
                <p
                  className={`font-bold whitespace-nowrap text-sm ${tx.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-gray-900 dark:text-white"}`}
                >
                  {tx.type === "income" ? "+ " : "- "}
                  {formatCurrency(Math.abs(tx.amount))}
                </p>
                <p className='text-[10px] text-gray-500 mt-0.5'>
                  {tx.itemType || (tx.type === "income" ? "Transfer" : "Card payment")}
                </p>
              </div>
            </div>

            {role === "admin" && (
              <div className='flex justify-end gap-2 pt-3 border-t border-gray-200 dark:border-gray-700/50'>
                <button
                  onClick={() => onEdit(tx)}
                  className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors'
                >
                  <Edit2 size={12} /> Edit
                </button>
                <button
                  onClick={() => onDelete(tx.id)}
                  className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors'
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
