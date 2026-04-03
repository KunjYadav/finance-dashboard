import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export const CustomDropdown = ({
  value,
  options,
  onChange,
  align = "right",
  triggerClassName,
  menuClassName = "w-40",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={triggerClassName}
      >
        <span className='flex-1 text-left truncate pr-2'>
          {selectedOption?.label}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""} opacity-70`}
        />
      </button>

      <div
        className={`absolute top-full mt-2 py-1 ${menuClassName} bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl z-60 overflow-hidden transform transition-all origin-top duration-200 ${
          isOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        } ${align === "right" ? "right-0" : "left-0"}`}
      >
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => {
              onChange(opt.value);
              setIsOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
              value === opt.value
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};
