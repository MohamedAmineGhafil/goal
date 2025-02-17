// src/components/calendar/CalendarView.tsx
import React, { useState } from 'react';
import RetroWindow from '../common/RetroWindow';
import DailyProgress from './DailyProgress';
import type { DailyProgressType } from '../../types/progress';

interface CalendarViewProps {
  dailyProgress: Record<string, DailyProgressType>;
}

const CalendarView: React.FC<CalendarViewProps> = ({ dailyProgress }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const days = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const weeks = Math.ceil((days + firstDay) / 7);

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <RetroWindow title="Calendar" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={prevMonth}
            className="px-2 py-1 bg-gray-700 border border-gray-600 hover:bg-gray-600 retro-button"
          >
            ◀
          </button>
          <span className="text-white font-fsex300">
            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <button
            onClick={nextMonth}
            className="px-2 py-1 bg-gray-700 border border-gray-600 hover:bg-gray-600 retro-button"
          >
            ▶
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div 
              key={day} 
              className="text-center text-gray-400 text-sm p-1 font-fsex300"
            >
              {day}
            </div>
          ))}

          {Array.from({ length: weeks * 7 }).map((_, index) => {
            const dayNumber = index - firstDay + 1;
            const dateString = formatDate(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              dayNumber
            );
            const hasProgress = dailyProgress[dateString];
            const isCurrentMonth = dayNumber > 0 && dayNumber <= days;

            if (!isCurrentMonth) {
              return <div key={index} className="p-2" />;
            }

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(dateString)}
                className={`
                  p-2 text-center border font-fsex300
                  ${hasProgress 
                    ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600 cursor-pointer' 
                    : 'bg-gray-800 text-gray-400 border-gray-700'}
                `}
              >
                <div>{dayNumber}</div>
                {hasProgress && (
                  <div className="text-xs text-green-500">
                    +{hasProgress.totalXP}XP
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </RetroWindow>

      {selectedDate && dailyProgress[selectedDate] && (
        <DailyProgress
          progress={dailyProgress[selectedDate]}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
};

export default CalendarView;