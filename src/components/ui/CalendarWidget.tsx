"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = new Date();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDate(new Date(currentYear, parseInt(e.target.value), 1));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDate(new Date(parseInt(e.target.value), currentMonth, 1));
  };

  const renderDays = () => {
    const days = [];
    
    // Previous month padding
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="text-gray-300 dark:text-gray-600">
          {daysInPrevMonth - i}
        </div>
      );
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = 
        i === today.getDate() && 
        currentMonth === today.getMonth() && 
        currentYear === today.getFullYear();
        
      if (isToday) {
        days.push(
          <div key={`curr-${i}`} className="w-7 h-7 bg-[#186675] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
            {i}
          </div>
        );
      } else {
        days.push(<div key={`curr-${i}`}>{i}</div>);
      }
    }
    
    // Next month padding to complete the grid
    const totalCells = days.length;
    const remainingCells = 42 - totalCells;
    const cellsToPad = (totalCells <= 35) ? (35 - totalCells) : remainingCells;

    for (let i = 1; i <= cellsToPad; i++) {
      days.push(
        <div key={`next-${i}`} className="text-gray-300 dark:text-gray-600">
          {i}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-gray-400 hover:text-gray-800 dark:text-gray-100">
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-2">
          <select 
            value={currentMonth} 
            onChange={handleMonthChange}
            className="text-[13px] font-bold text-gray-700 dark:text-gray-200 bg-transparent border-none outline-none cursor-pointer"
          >
            {MONTHS.map((m, i) => (
              <option key={m} value={i}>{m}</option>
            ))}
          </select>
          <select 
            value={currentYear}
            onChange={handleYearChange}
            className="text-[13px] font-bold text-gray-700 dark:text-gray-200 bg-transparent border-none outline-none cursor-pointer"
          >
            {Array.from({length: 15}, (_, i) => currentYear - 5 + i).map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <button onClick={handleNextMonth} className="text-gray-400 hover:text-gray-800 dark:text-gray-100">
          <ChevronRight size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-7 text-center text-[12px] font-medium text-gray-400 mb-2">
        <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
      </div>
      <div className="grid grid-cols-7 text-center text-[13px] font-medium text-gray-700 dark:text-gray-200 gap-y-3">
        {renderDays()}
      </div>
    </div>
  );
}
