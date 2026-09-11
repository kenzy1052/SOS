import React from 'react';
import { BrandLogo } from './BrandLogo';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onSelectTab: (tab: TabType) => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onOpenSearch,
  onOpenNotifications,
  onSelectTab,
  unreadCount = 2,
}) => {
  const getTabSubtitle = () => {
    switch (currentTab) {
      case 'home':
        return 'Home Dashboard';
      case 'academic':
        return 'Academic CGPA';
      case 'courses':
        return 'Course Hub';
      case 'tasks':
        return 'Tasks & Exams';
      case 'more':
        return 'System & Profile';
      default:
        return 'Home Dashboard';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#121414]/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.25)] border-b border-[#2c2f36]/40">
      <div className="h-16 px-4 max-w-lg mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand Identity & Subtitle */}
        <div className="flex items-center gap-3 min-w-0">
          <BrandLogo className="h-8 w-auto" />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-headline-md text-base font-bold tracking-tight text-[#e2e2e2] truncate">
                Student OS
              </span>
              <span className="font-label-sm text-[10px] px-1.5 py-0.5 rounded bg-[#1e2020] text-[#c4c6cf] font-medium tracking-wide border border-[#85888f]/20">
                UCC • L300
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-label-sm text-[10px] text-[#c4c6cf] truncate">
                Synced local
              </span>
              <span className="text-[#c4c6cf]/40 text-[10px]">•</span>
              <span className="font-body-sm text-[11px] text-[#ebbbb4] truncate font-medium">
                {getTabSubtitle()}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            aria-label="Search"
            onClick={onOpenSearch}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-[#c4c6cf] hover:text-[#e2e2e2] active:bg-[#1e2020] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
          
          <button
            aria-label="Notifications"
            onClick={onOpenNotifications}
            className="relative w-10 h-10 flex items-center justify-center rounded-lg text-[#c4c6cf] hover:text-[#e2e2e2] active:bg-[#1e2020] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#ff5540] ring-2 ring-[#121414]"></span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('more')}
            aria-label="Profile and Settings"
            className="w-8 h-8 rounded-full bg-[#ffb4a8] hover:opacity-90 flex items-center justify-center flex-shrink-0 ml-1 shadow-sm transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined text-[#690100] text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
