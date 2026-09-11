import React from 'react';
import { TabType } from '../types';

interface NavigationProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  pendingTasksCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  pendingTasksCount = 1,
}) => {
  const tabs: { key: TabType; label: string; icon: string; badge?: number }[] = [
    { key: 'home', label: 'Home', icon: 'dashboard' },
    { key: 'academic', label: 'Academic', icon: 'query_stats' },
    { key: 'courses', label: 'Courses', icon: 'menu_book' },
    { key: 'tasks', label: 'Tasks', icon: 'checklist', badge: pendingTasksCount },
    { key: 'more', label: 'More', icon: 'more_horiz' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-[#1a1c1c]/95 backdrop-blur-xl border-t border-[#2c2f36]/40 shadow-[0_-2px_16px_rgba(0,0,0,0.45)]">
      <div className="flex justify-between items-center h-16 max-w-lg mx-auto px-1">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => {
                onSelectTab(tab.key);
                if (window.navigator && window.navigator.vibrate) {
                  try {
                    window.navigator.vibrate(10);
                  } catch {
                    // Ignore haptics errors if disabled in browser
                  }
                }
              }}
              className={`flex flex-col items-center justify-center flex-1 h-14 min-w-[56px] transition-all gap-0.5 relative ${
                isActive
                  ? 'text-[#ffb4a8] font-bold scale-[1.03]'
                  : 'text-[#c4c6cf] hover:text-[#e2e2e2] font-medium'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={
                    isActive
                      ? { fontVariationSettings: "'FILL' 1, 'wght' 600" }
                      : undefined
                  }
                >
                  {tab.icon}
                </span>
                {tab.badge && tab.badge > 0 && tab.key === 'tasks' && (
                  <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] rounded-full bg-[#ff5540] text-[#ffffff] text-[9px] font-bold flex items-center justify-center px-1 ring-1 ring-[#121414]">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="font-label-sm text-[10px] leading-none tracking-tight">
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-5 h-0.5 rounded-full bg-[#ff5540]"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
