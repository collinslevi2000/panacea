// app/components/CustomDatePicker.tsx
"use client";

import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface CustomDatePickerProps {
  name: string;
  value: string;
  onChange: (date: Date | null, name: string) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ 
  name, 
  value, 
  onChange, 
  minDate,
  maxDate,
  placeholder = "Select date"
}) => {
  // Fix: Parse the date string safely
  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    
    // Split the YYYY-MM-DD string
    const parts = dateString.split('-');
    if (parts.length !== 3) return null;
    
    const [year, month, day] = parts.map(Number);
    
    // Create date in local timezone (not UTC)
    return new Date(year, month - 1, day);
  };

  const selectedDate = value ? parseDate(value) : null;

  const handleDateChange = (date: Date | null) => {
    onChange(date, name);
  };

  return (
    <div className="relative">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        placeholderText={placeholder}
        minDate={minDate}
        maxDate={maxDate}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        popperPlacement="bottom-start"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <i className="fas fa-calendar text-gray-400"></i>
      </div>
    </div>
  );
};

export default CustomDatePicker;