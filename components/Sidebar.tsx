import React from 'react';
import { AppView } from '../types';
import { 
  LayoutDashboard, 
  PenTool, 
  Calendar, 
  Image as ImageIcon, 
  Settings, 
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { view: AppView.DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
    { view: AppView.GENERATOR, icon: PenTool, label: 'Content Generator' },
    { view: AppView.MEDIA, icon: ImageIcon, label: 'Media & Captions' },
    { view: AppView.CALENDAR, icon: Calendar, label: 'Calendar' },
    { view: AppView.SETTINGS, icon: Settings, label: 'Brand Settings' },
  ];

  return (
    <aside className="w-64 bg-midnightNavy text-white h-screen fixed left-0 top-0 flex flex-col shadow-xl z-50">
      <div className="p-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-travelBlue to-sunsetCoral rounded-lg"></div>
          <h1 className="font-heading font-bold text-xl tracking-tight">TravelScript AI</h1>
        </div>
        <p className="text-xs text-gray-400 font-sans ml-10">Turn destinations into content.</p>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => setCurrentView(item.view)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
              currentView === item.view
                ? 'bg-travelBlue text-white shadow-lg'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-white/10">
        <button className="flex items-center gap-3 text-gray-400 hover:text-sunsetCoral transition-colors text-sm font-medium w-full px-2">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};