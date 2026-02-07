import React from 'react';
import { CalendarEvent, SocialPlatform } from '../types';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const mockEvents: CalendarEvent[] = [
  { id: '1', date: new Date(), title: 'Bali Sunset Reel', platform: SocialPlatform.INSTAGRAM },
  { id: '2', date: new Date(), title: 'Travel Tips Thread', platform: SocialPlatform.TIKTOK },
];

export const CalendarView: React.FC = () => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-3xl font-heading font-bold text-midnightNavy mb-2">Content Calendar</h2>
           <p className="text-gray-500">Plan your month in style.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">Month</button>
           <button className="px-4 py-2 bg-travelBlue text-white rounded-lg text-sm font-medium">Week</button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex-1 overflow-hidden flex flex-col">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {days.map(day => (
            <div key={day} className="py-4 text-center text-sm font-semibold text-gray-500 bg-gray-50">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 grid-rows-5 flex-1 min-h-[600px]">
          {Array.from({ length: 35 }).map((_, i) => {
            // Mock logic to place events
            const dayNum = i + 1;
            const hasEvent = i === 4 || i === 12 || i === 22;
            
            return (
              <div key={i} className="border-r border-b border-gray-100 p-2 min-h-[100px] relative hover:bg-gray-50 transition-colors">
                <span className={`text-sm font-medium ${i < 7 ? 'text-gray-400' : 'text-midnightNavy'}`}>
                  {dayNum > 31 ? dayNum - 31 : dayNum}
                </span>
                
                {hasEvent && (
                  <div className="mt-2 p-2 rounded-md bg-blue-50 border border-blue-100 cursor-pointer hover:shadow-sm">
                    <p className="text-xs font-bold text-travelBlue truncate">Visit Paris</p>
                    <div className="flex items-center gap-1 mt-1">
                       <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                       <span className="text-[10px] text-gray-500">Instagram</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};