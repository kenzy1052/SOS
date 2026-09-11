import React from 'react';
import { TabType, TaskItem } from '../types';

interface HomeTabProps {
  onNavigate: (tab: TabType) => void;
  onOpenQuickLog: (type: 'task' | 'course' | 'exam' | 'study') => void;
  tasks: TaskItem[];
  onToggleTask: (taskId: string) => void;
  onShowToast: (msg: string) => void;
  currentCgpa?: number;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  onNavigate,
  onOpenQuickLog,
  tasks,
  onToggleTask,
  onShowToast,
  currentCgpa = 3.42,
}) => {
  const lab3Task = tasks.find((t) => t.id === 'task-1');
  const isLab3Done = lab3Task?.isCompleted ?? false;

  const dueTodayCount = tasks.filter((t) => !t.isCompleted && t.dueDate.includes('Today')).length;
  const overdueCount = tasks.filter((t) => !t.isCompleted && t.dueText.toLowerCase().includes('overdue')).length;

  return (
    <div className="flex flex-col w-full px-4 pb-24 gap-4 max-w-lg mx-auto">
      {/* Student Identity & High-Performance Status */}
      <section className="flex flex-col gap-1 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#282a2b] text-[#c4c6cf]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-label-sm text-[10px] text-[#e2e2e2]">
              Offline Engine Active • Local SQLite Ready
            </span>
          </div>
          <span className="font-label-sm text-[10px] text-[#c4c6cf] tracking-widest uppercase font-mono">
            L300 • SEM 1
          </span>
        </div>
        <div className="flex flex-col mt-1">
          <h1 className="font-headline-lg-mobile text-[26px] leading-8 text-[#e2e2e2] font-bold tracking-tight">
            Kofi Mensah
          </h1>
          <p className="font-body-md text-sm text-[#c4c6cf]">
            B.Sc. Computer Science • University of Cape Coast (UCC)
          </p>
        </div>
      </section>

      {/* Urgent Exam Alert Bar (Direct Utilitarian Callout) */}
      <section
        onClick={() => onNavigate('tasks')}
        className="relative overflow-hidden rounded-xl bg-[#282a2b] p-3 shadow-md cursor-pointer hover:bg-[#333535] transition-colors active:scale-[0.99]"
      >
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#ff5540]"></div>
        <div className="flex items-center justify-between gap-2 pl-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[#333535] flex items-center justify-center flex-shrink-0 text-[#ffb4a8]">
              <span className="material-symbols-outlined text-[20px]">timer</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-title-md text-[15px] font-semibold text-[#e2e2e2] truncate">
                  Midsem Exams in 11 Days
                </span>
                <span className="font-label-sm text-[10px] text-[#c4c6cf]">(Starts Oct 24)</span>
              </div>
              <p className="font-body-sm text-[11px] text-[#c4c6cf] truncate">
                CS 321 Networks &amp; Data Comm is first paper
              </p>
            </div>
          </div>
          <span className="font-label-sm text-[10px] px-2.5 py-1 rounded-full bg-[#ff5540] text-[#ffffff] font-bold flex-shrink-0">
            T-11d
          </span>
        </div>
      </section>

      {/* Academic Health & CGPA Radar Card */}
      <section
        onClick={() => onNavigate('academic')}
        className="rounded-xl bg-[#1e2020] p-4 shadow-sm flex flex-col gap-3 border border-[#85888f]/15 cursor-pointer hover:border-[#ffb4a8]/40 transition-all"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ffb4a8] text-[20px]">school</span>
            <span className="font-title-md text-base text-[#e2e2e2] font-semibold">
              Academic Health
            </span>
          </div>
          <span className="font-label-sm text-[10px] px-2 py-0.5 rounded bg-[#333535] text-[#c4c6cf]">
            UCC 4.0 Scale
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 items-center">
          <div className="flex items-center justify-between bg-[#1a1c1c] p-3 rounded-lg border border-[#85888f]/10">
            <div className="flex flex-col">
              <span className="font-label-sm text-[10px] uppercase tracking-wider text-[#c4c6cf]">
                Current CGPA
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-metric-display text-3xl font-bold text-[#e2e2e2]">
                  {currentCgpa.toFixed(2)}
                </span>
                <span className="font-label-md text-xs text-[#c4c6cf]">/ 4.00</span>
              </div>
              <span className="font-body-sm text-xs text-[#ffb4a8] font-medium mt-0.5">
                Second Class Upper
              </span>
            </div>

            {/* Metric Circular Arc (SVG Ring) */}
            <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#333535]"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
                {/* 3.42/4.00 is ~85.5% stroke */}
                <path
                  className="text-[#ff5540] transition-all duration-700 ease-out"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="85.5, 100"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="font-label-sm text-xs font-bold text-[#e2e2e2]">85.5%</span>
                <span className="font-label-sm text-[8px] text-[#c4c6cf]">HONORS</span>
              </div>
            </div>
          </div>

          {/* Target Progression Strip */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-[#c4c6cf]">
              <span className="font-body-sm text-xs">
                Target to First Class: <strong className="text-[#e2e2e2]">3.60</strong>
              </span>
              <span className="font-label-sm text-[11px] text-[#ffb4a8] font-semibold">
                +0.18 Needed
              </span>
            </div>
            <div className="w-full bg-[#333535] rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#ff5540] h-full rounded-full transition-all duration-500"
                style={{ width: '78%' }}
              ></div>
            </div>
            <div className="flex items-center gap-1.5 mt-1 bg-[#282a2b] px-2.5 py-1.5 rounded text-[#e2e2e2]">
              <span className="material-symbols-outlined text-[#ffb4a8] text-[16px]">
                verified
              </span>
              <span className="font-label-md text-[11px] text-[#e2e2e2]">
                Path: Needs 3 As &amp; 1 B+ this semester
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tactical Status Quick Strip */}
      <section className="grid grid-cols-2 gap-3">
        <div
          onClick={() => onNavigate('tasks')}
          className="flex items-center gap-3 bg-[#1e2020] p-3 rounded-xl border border-[#85888f]/15 cursor-pointer hover:bg-[#282a2b] transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-[#333535] flex items-center justify-center flex-shrink-0 text-[#ffb4a8]">
            <span className="material-symbols-outlined text-[22px]">notification_important</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-metric-display text-[22px] leading-none text-[#e2e2e2] font-bold">
              {dueTodayCount}
            </span>
            <span className="font-body-sm text-xs text-[#c4c6cf] truncate">Due Today</span>
          </div>
        </div>

        <div
          onClick={() => onNavigate('tasks')}
          className="flex items-center gap-3 bg-[#1e2020] p-3 rounded-xl border border-[#85888f]/15 cursor-pointer hover:bg-[#282a2b] transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-[#333535] flex items-center justify-center flex-shrink-0 text-[#c4c6cf]">
            <span className="material-symbols-outlined text-[22px]">check_circle</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-metric-display text-[22px] leading-none text-[#e2e2e2] font-bold">
              {overdueCount}
            </span>
            <span className="font-body-sm text-xs text-[#c4c6cf] truncate">Overdue</span>
          </div>
        </div>
      </section>

      {/* Quick Action Command Strip (Pills) */}
      <section className="flex flex-col gap-1.5">
        <span className="font-label-sm text-[10px] uppercase tracking-wider text-[#c4c6cf]">
          Quick Log
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => onOpenQuickLog('task')}
            className="h-10 px-3.5 rounded-full bg-[#282a2b] hover:bg-[#333535] active:scale-95 transition-all flex items-center gap-1.5 flex-shrink-0 text-[#e2e2e2] border border-[#85888f]/15"
          >
            <span className="material-symbols-outlined text-[#ffb4a8] text-[18px]">add_task</span>
            <span className="font-label-md text-xs font-semibold">+ Task/Deadline</span>
          </button>
          <button
            onClick={() => onOpenQuickLog('course')}
            className="h-10 px-3.5 rounded-full bg-[#282a2b] hover:bg-[#333535] active:scale-95 transition-all flex items-center gap-1.5 flex-shrink-0 text-[#e2e2e2] border border-[#85888f]/15"
          >
            <span className="material-symbols-outlined text-[#ffb4a8] text-[18px]">menu_book</span>
            <span className="font-label-md text-xs font-semibold">+ Course</span>
          </button>
          <button
            onClick={() => onOpenQuickLog('exam')}
            className="h-10 px-3.5 rounded-full bg-[#282a2b] hover:bg-[#333535] active:scale-95 transition-all flex items-center gap-1.5 flex-shrink-0 text-[#e2e2e2] border border-[#85888f]/15"
          >
            <span className="material-symbols-outlined text-[#ffb4a8] text-[18px]">event_note</span>
            <span className="font-label-md text-xs font-semibold">+ Exam</span>
          </button>
          <button
            onClick={() => onOpenQuickLog('study')}
            className="h-10 px-3.5 rounded-full bg-[#282a2b] hover:bg-[#333535] active:scale-95 transition-all flex items-center gap-1.5 flex-shrink-0 text-[#e2e2e2] border border-[#85888f]/15"
          >
            <span className="material-symbols-outlined text-[#ffb4a8] text-[18px]">
              self_improvement
            </span>
            <span className="font-label-md text-xs font-semibold">+ Study Session</span>
          </button>
        </div>
      </section>

      {/* Today's Academic Command Center */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ffb4a8] text-[20px]">
              calendar_today
            </span>
            <h2 className="font-title-lg text-lg text-[#e2e2e2] font-bold">
              Today&apos;s Command Center
            </h2>
          </div>
          <span className="font-label-sm text-[11px] text-[#c4c6cf]">3 Events Scheduled</span>
        </div>

        {/* Timeline Event 1: Lecture */}
        <div className="rounded-xl bg-[#1e2020] p-4 flex flex-col gap-1 shadow-sm border border-[#85888f]/15">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-xs text-[#c4c6cf]">08:30 AM — 10:30 AM</span>
            <span className="font-label-sm text-[10px] px-2 py-0.5 rounded bg-[#333535] text-[#e2e2e2] font-semibold">
              Lecture
            </span>
          </div>
          <div className="flex flex-col mt-1">
            <div className="flex items-center gap-1.5">
              <span className="font-label-md text-xs font-bold text-[#ffb4a8]">CS 311</span>
              <span className="text-[#c4c6cf]">•</span>
              <h3 className="font-title-md text-base text-[#e2e2e2] font-semibold truncate">
                Operating Systems
              </h3>
            </div>
            <div className="flex items-center gap-1 mt-1 text-[#c4c6cf]">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              <span className="font-body-sm text-xs">LT 15, New Science Block</span>
            </div>
          </div>
        </div>

        {/* Timeline Event 2: Urgent Assignment Due */}
        <div className="rounded-xl bg-[#1e2020] p-4 flex flex-col gap-1 shadow-md relative overflow-hidden border border-[#85888f]/15">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#ff5540]"></div>
          <div className="flex items-center justify-between pl-1">
            <div className="flex items-center gap-1.5">
              <span className="font-label-md text-xs text-[#ffb4a8] font-bold">02:00 PM DUE</span>
              <span className="text-[#c4c6cf]">•</span>
              <span className="font-label-sm text-[10px] px-2 py-0.5 rounded bg-[#ff5540] text-[#ffffff] font-bold">
                4 hrs left
              </span>
            </div>
            <span className="font-label-sm text-[10px] px-2 py-0.5 rounded bg-[#333535] text-[#ffb4a8] font-semibold">
              High Priority
            </span>
          </div>
          <div className="flex flex-col mt-1 pl-1">
            <div className="flex items-center gap-1.5">
              <span className="font-label-md text-xs font-bold text-[#e2e2e2]">CS 315</span>
              <span className="text-[#c4c6cf]">•</span>
              <h3 className="font-title-md text-base text-[#e2e2e2] font-semibold truncate">
                Database Systems Lab 3
              </h3>
            </div>
            <p className="font-body-sm text-xs text-[#c4c6cf] mt-0.5">
              Normalization &amp; B-Tree Indexing Implementation
            </p>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 bg-[#282a2b] p-2.5 rounded-lg pl-3 border border-[#85888f]/10">
            <span className="font-label-sm text-[11px] text-[#c4c6cf] truncate mr-2">
              Target: Submit PDF + GitHub repo
            </span>
            <button
              onClick={() => {
                onToggleTask('task-1');
                onShowToast(
                  isLab3Done
                    ? 'Lab 3 unmarked from completed.'
                    : 'Database Systems Lab 3 submitted & marked completed!'
                );
              }}
              className={`font-label-md text-xs font-bold px-3 py-1.5 rounded-lg active:scale-95 transition-all flex-shrink-0 ${
                isLab3Done
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#ff5540] hover:bg-[#ff5540]/90 text-white'
              }`}
            >
              {isLab3Done ? 'Completed ✓' : 'Mark Done'}
            </button>
          </div>
        </div>

        {/* Timeline Event 3: Planned Study Block */}
        <div className="rounded-xl bg-[#1e2020] p-4 flex flex-col gap-1 shadow-sm border border-[#85888f]/15">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-xs text-[#c4c6cf]">06:00 PM — 07:30 PM</span>
            <span className="font-label-sm text-[10px] px-2 py-0.5 rounded bg-[#333535] text-[#c4c6cf] font-semibold">
              Deep Work
            </span>
          </div>
          <div className="flex flex-col mt-1">
            <div className="flex items-center gap-1.5">
              <span className="font-label-md text-xs font-bold text-[#ffb4a8]">CS 301</span>
              <span className="text-[#c4c6cf]">•</span>
              <h3 className="font-title-md text-base text-[#e2e2e2] font-semibold truncate">
                Algorithms Revision Block
              </h3>
            </div>
            <div className="flex items-center gap-1 mt-1 text-[#c4c6cf]">
              <span className="material-symbols-outlined text-[16px]">timelapse</span>
              <span className="font-body-sm text-xs">1.5 hrs Dynamic Programming &amp; Graphs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Context / Study Hall Snapshot */}
      <section className="rounded-xl bg-[#1e2020] overflow-hidden flex flex-col shadow-sm border border-[#85888f]/15">
        <div className="relative w-full h-36 bg-[#2c2f36]">
          <img
            className="w-full h-full object-cover"
            alt="University of Cape Coast modern digital science laboratory campus architecture with students working on laptops"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTzSUkFHo10dN2YUWjIbzLHYdOirylsL25N1BuTRkZL4dbKtjK96sBa7Wtax_hLnuSVxvxtLOqYQDVHBgp-8p8Aeitre5sHCbAUko6AjJMyBs21kBAnel5ZVi63f53QtfH2xvV8mlDNZVOYLIyjarvAm1NN2a2Mdcu7wWrkbjUsXHvpl2vejP1KPokbYiNtJhdod1rclXKlvZWPWOUCuIa9G7fZ2WzoPG1iJIhfMPKlgOYqc04hIZD"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e2020] via-[#1e2020]/40 to-transparent"></div>
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <span className="font-label-md text-xs text-[#e2e2e2] font-bold">
              New Science Block • Floor 2 Lab
            </span>
            <span className="font-label-sm text-[10px] px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-400 font-semibold border border-emerald-500/30">
              Quiet Zone (82% Free)
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
