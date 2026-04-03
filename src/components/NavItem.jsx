/* eslint-disable no-unused-vars */
import React from 'react';

export const NavItem = ({ icon: Icon, text, active }) => (
  <div
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group ${active ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold" : "hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium"}`}
  >
    <Icon
      size={20}
      className={`transition-colors ${active ? "text-blue-600 dark:text-blue-400" : "text-gray-400 group-hover:text-blue-500"}`}
    />
    {text}
  </div>
);
