'use client';

import { Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  timeLeft: TimeLeft;
  className?: string;
}

export default function CountdownTimer({ timeLeft, className = '' }: CountdownTimerProps) {
  const { days, hours, minutes, seconds } = timeLeft;

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  const isExpired = days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  if (isExpired) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-2 text-center ${className}`}>
        <div className="flex items-center justify-center space-x-1 text-red-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-semibold">Auction Ended</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-50 rounded-lg p-2 ${className}`}>
      <div className="flex items-center justify-center space-x-1 text-gray-700">
        <Clock className="w-4 h-4" />
        <span className="text-xs font-medium">Time Left:</span>
      </div>
      <div className="flex justify-center space-x-1 mt-1">
        {days > 0 && (
          <div className="text-center">
            <div className="bg-white border border-gray-300 rounded px-2 py-1">
              <span className="text-sm font-bold text-gray-900">{formatNumber(days)}</span>
            </div>
            <span className="text-xs text-gray-500 mt-1">d</span>
          </div>
        )}
        <div className="text-center">
          <div className="bg-white border border-gray-300 rounded px-2 py-1">
            <span className="text-sm font-bold text-gray-900">{formatNumber(hours)}</span>
          </div>
          <span className="text-xs text-gray-500 mt-1">h</span>
        </div>
        <div className="text-center">
          <div className="bg-white border border-gray-300 rounded px-2 py-1">
            <span className="text-sm font-bold text-gray-900">{formatNumber(minutes)}</span>
          </div>
          <span className="text-xs text-gray-500 mt-1">m</span>
        </div>
        <div className="text-center">
          <div className="bg-white border border-gray-300 rounded px-2 py-1">
            <span className="text-sm font-bold text-gray-900">{formatNumber(seconds)}</span>
          </div>
          <span className="text-xs text-gray-500 mt-1">s</span>
        </div>
      </div>
    </div>
  );
}
