/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { X } from "lucide-react";
import { CATEGORIES } from "../../utils/constants";

export const TransactionModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Other",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
    itemType: "Card payment",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else
      setFormData({
        description: "",
        amount: "",
        category: "Other",
        type: "expense",
        date: new Date().toISOString().split("T")[0],
        itemType: "Card payment",
      });
  }, [initialData, isOpen]);

  if (!isOpen) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, amount: parseFloat(formData.amount) });
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-black/40 backdrop-blur-sm z-100 flex items-center justify-center p-4'>
      <div className='bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-200'>
        <div className='px-6 py-4 flex justify-between items-center border-b border-gray-100 dark:border-gray-800 shrink-0'>
          <h3 className='text-lg font-bold dark:text-white'>
            {initialData ? "Edit Transaction" : "New Transaction"}
          </h3>
          <button
            onClick={onClose}
            className='text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded-lg transition-colors'
          >
            <X size={20} />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className='p-6 space-y-4 overflow-y-auto custom-scrollbar'
        >
          <div className='flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg'>
            <button
              type='button'
              onClick={() => setFormData({ ...formData, type: "expense" })}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${formData.type === "expense" ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white" : "text-gray-500"}`}
            >
              Expense
            </button>
            <button
              type='button'
              onClick={() => setFormData({ ...formData, type: "income" })}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${formData.type === "income" ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white" : "text-gray-500"}`}
            >
              Income
            </button>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
              Item Name
            </label>
            <input
              type='text'
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className='w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white border border-gray-200 dark:border-gray-700 transition-all'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
              Amount (₹)
            </label>
            <input
              type='number'
              step='0.01'
              required
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className='w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white border border-gray-200 dark:border-gray-700 transition-all'
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className='w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white border border-gray-200 dark:border-gray-700 transition-all'
              >
                {CATEGORIES.map((c) => (
                  <option
                    key={c}
                    value={c}
                    className='bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                  >
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Date
              </label>
              <input
                type='date'
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className='w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white border border-gray-200 dark:border-gray-700 transition-all'
              />
            </div>
          </div>
          <div className='pt-4 flex justify-end gap-3'>
            <button
              type='submit'
              className='px-6 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-sm transition-colors w-full'
            >
              {initialData ? "Update Transaction" : "Save Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
