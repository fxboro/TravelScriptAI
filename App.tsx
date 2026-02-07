import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { AppView, BrandSettings } from './types';
import { Dashboard } from './views/Dashboard';
import { ContentGenerator } from './views/ContentGenerator';
import { ImageCaptioner } from './views/ImageCaptioner';
import { CalendarView } from './views/Calendar';
import { SettingsView } from './views/Settings';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  
  // Mock initial settings
  const [settings, setSettings] = useState<BrandSettings>({
    name: "Wanderlust Co.",
    tone: "Adventurous & Exciting",
    targetAudience: "Digital Nomads",
    primaryDestination: "Bali, Indonesia"
  });

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard onChangeView={setCurrentView} />;
      case AppView.GENERATOR:
        return <ContentGenerator settings={settings} />;
      case AppView.MEDIA:
        return <ImageCaptioner />;
      case AppView.CALENDAR:
        return <CalendarView />;
      case AppView.SETTINGS:
        return <SettingsView settings={settings} onSave={setSettings} />;
      default:
        return <Dashboard onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-cloudWhite">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="flex-1 ml-64 p-8 lg:p-12 overflow-y-auto h-screen">
        <div className="max-w-7xl mx-auto h-full">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;