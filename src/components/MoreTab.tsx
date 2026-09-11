import React from 'react';
import { BrandLogo } from './BrandLogo';

interface MoreTabProps {
  onShowToast: (msg: string) => void;
}

export const MoreTab: React.FC<MoreTabProps> = ({ onShowToast }) => {
  const copyHex = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    onShowToast(`Copied color ${hex} to clipboard!`);
  };

  const handleExportData = () => {
    const data = {
      student: 'Kofi Mensah',
      id: 'PS/CSC/21/0088',
      institution: 'University of Cape Coast (UCC)',
      programme: 'B.Sc. Computer Science',
      level: 'Level 300',
      semester: 'Semester 1',
      cgpa: 3.42,
      targetGoal: 3.60,
      honorsClassification: 'Second Class Upper (Target: First Class Honours)',
      creditsEarned: 76,
      creditsInProgress: 18,
      totalRequired: 120,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kofi_mensah_ucc_academic_profile.json';
    a.click();
    URL.revokeObjectURL(url);
    onShowToast('Academic profile downloaded!');
  };

  return (
    <div className="flex flex-col w-full px-4 pb-24 gap-4 max-w-lg mx-auto">
      {/* Profile Card */}
      <div className="pt-2">
        <div className="bg-[#1e2020] rounded-xl p-4 shadow-md flex items-center gap-3.5 border border-[#85888f]/15">
          <div className="w-14 h-14 rounded-full bg-[#ffb4a8] flex items-center justify-center flex-shrink-0 text-[#690100] shadow-sm">
            <span className="material-symbols-outlined text-[30px]">person</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-md text-lg font-bold text-[#e2e2e2] truncate">
                Kofi Mensah
              </h2>
              <span className="font-label-sm text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 font-semibold border border-emerald-500/30">
                Verified UCC ID
              </span>
            </div>
            <p className="font-label-md text-xs text-[#ffb4a8] font-mono">ID: PS/CSC/21/0088</p>
            <p className="font-body-sm text-xs text-[#c4c6cf] truncate mt-0.5">
              Dept. of Computer Science • Level 300
            </p>
          </div>
        </div>
      </div>

      {/* Brand & Design System Visual Showcase (Image 1 replica) */}
      <div className="rounded-2xl bg-[#1e2020] p-4 shadow-lg border border-[#85888f]/20 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb4a8] text-[20px]">palette</span>
            <h3 className="font-headline-md text-sm sm:text-base font-bold text-[#e2e2e2]">
              Design System &amp; Brand Token
            </h3>
          </div>
          <span className="font-label-sm text-[10px] text-[#c4c6cf] font-mono">v3.8 • Dark Canvas</span>
        </div>

        {/* Replica Card of Image 1 */}
        <div className="relative overflow-hidden rounded-xl bg-[#2c2f36] p-4 flex flex-col items-center justify-center text-center shadow-inner border border-[#85888f]/20">
          {/* Subtle geometric hex background styling */}
          <div className="flex flex-col items-center mb-3">
            <div className="w-12 h-12 flex items-center justify-center mb-1">
              <svg viewBox="0 0 100 60" className="w-10 h-6" fill="none">
                <path
                  d="M32 12C20.954 12 12 20.059 12 30C12 39.941 20.954 48 32 48C42 48 48 38 50 30C52 22 58 12 68 12C79.046 12 88 20.059 88 30C88 39.941 79.046 48 68 48C58 48 52 38 50 30C48 22 42 12 32 12Z"
                  stroke="#ffffff"
                  strokeWidth="8"
                />
              </svg>
            </div>
            <span className="font-headline-md text-xs font-bold text-[#ffffff] tracking-widest uppercase">
              PALETA DE CORES
            </span>
          </div>

          {/* 4 Swatches */}
          <div className="w-full max-w-sm rounded-lg overflow-hidden flex shadow-lg border border-black/30">
            <button
              onClick={() => copyHex('#ff0000')}
              className="flex-1 flex flex-col items-center bg-[#ff0000] p-2 pt-1 transition-transform active:scale-95 group"
            >
              <span className="font-label-sm text-[9px] bg-white/90 text-black px-1.5 py-0.5 rounded font-bold font-mono">
                #ff0000
              </span>
              <div className="h-16"></div>
            </button>

            <button
              onClick={() => copyHex('#2c2f36')}
              className="flex-1 flex flex-col items-center bg-[#2c2f36] p-2 pt-1 transition-transform active:scale-95 group"
            >
              <span className="font-label-sm text-[9px] bg-white/90 text-black px-1.5 py-0.5 rounded font-bold font-mono">
                #2c2f36
              </span>
              <div className="h-16"></div>
            </button>

            <button
              onClick={() => copyHex('#85888f')}
              className="flex-1 flex flex-col items-center bg-[#85888f] p-2 pt-1 transition-transform active:scale-95 group"
            >
              <span className="font-label-sm text-[9px] bg-white/90 text-black px-1.5 py-0.5 rounded font-bold font-mono">
                #85888f
              </span>
              <div className="h-16"></div>
            </button>

            <button
              onClick={() => copyHex('#ffffff')}
              className="flex-1 flex flex-col items-center bg-[#ffffff] p-2 pt-1 transition-transform active:scale-95 group"
            >
              <span className="font-label-sm text-[9px] bg-black/80 text-white px-1.5 py-0.5 rounded font-bold font-mono">
                #ffffff
              </span>
              <div className="h-16"></div>
            </button>
          </div>
          <p className="font-label-sm text-[10px] text-[#c4c6cf] mt-2">
            Click any color chip to copy hex code
          </p>
        </div>
      </div>

      {/* Offline SQLite Engine Stats */}
      <div className="bg-[#1e2020] rounded-xl p-4 shadow-md flex flex-col gap-2.5 border border-[#85888f]/15">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400 text-[20px]">
              storage
            </span>
            <h3 className="font-headline-md text-sm sm:text-base font-bold text-[#e2e2e2]">
              Offline Engine &amp; Cache
            </h3>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>

        <p className="font-body-sm text-xs text-[#c4c6cf]">
          All course syllabi, timetable schedules, GPA projections, and notes are cached locally for
          low-connectivity campus lecture halls.
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onShowToast('Local SQLite cache verified and fully in sync.')}
            className="p-2.5 rounded-lg bg-[#282a2b] hover:bg-[#333535] text-xs font-semibold text-[#e2e2e2] flex items-center justify-center gap-1.5 border border-[#85888f]/10"
          >
            <span className="material-symbols-outlined text-[16px] text-emerald-400">sync</span>
            <span>Verify Sync</span>
          </button>

          <button
            onClick={handleExportData}
            className="p-2.5 rounded-lg bg-[#282a2b] hover:bg-[#333535] text-xs font-semibold text-[#e2e2e2] flex items-center justify-center gap-1.5 border border-[#85888f]/10"
          >
            <span className="material-symbols-outlined text-[16px] text-[#ffb4a8]">download</span>
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Official UCC Regulations Reference */}
      <div className="bg-[#1e2020] rounded-xl p-4 shadow-md flex flex-col gap-2.5 border border-[#85888f]/15">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ffb4a8] text-[20px]">gavel</span>
          <h3 className="font-headline-md text-sm sm:text-base font-bold text-[#e2e2e2]">
            UCC Senate Academic Scale
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-[#282a2b] rounded-lg border border-[#85888f]/10">
            <span className="font-label-sm text-[10px] text-[#ffb4a8] font-bold block">
              First Class Honours
            </span>
            <span className="font-metric-display text-sm text-[#e2e2e2]">3.60 — 4.00</span>
          </div>
          <div className="p-2 bg-[#282a2b] rounded-lg border border-[#85888f]/10">
            <span className="font-label-sm text-[10px] text-[#c4c6cf] font-bold block">
              Second Class Upper
            </span>
            <span className="font-metric-display text-sm text-[#e2e2e2]">3.00 — 3.59</span>
          </div>
          <div className="p-2 bg-[#282a2b] rounded-lg border border-[#85888f]/10">
            <span className="font-label-sm text-[10px] text-[#c4c6cf] font-bold block">
              Second Class Lower
            </span>
            <span className="font-metric-display text-sm text-[#e2e2e2]">2.50 — 2.99</span>
          </div>
          <div className="p-2 bg-[#282a2b] rounded-lg border border-[#85888f]/10">
            <span className="font-label-sm text-[10px] text-[#c4c6cf] font-bold block">
              Third Class
            </span>
            <span className="font-metric-display text-sm text-[#e2e2e2]">2.00 — 2.49</span>
          </div>
        </div>
      </div>
    </div>
  );
};
