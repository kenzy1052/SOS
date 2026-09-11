import React, { useState } from 'react';
import { Course, TaskItem, TabType } from '../types';

interface SearchModalProps {
  onClose: () => void;
  courses: Course[];
  tasks: TaskItem[];
  onSelectCourse: (course: Course) => void;
  onNavigate: (tab: TabType) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  onClose,
  courses,
  tasks,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  const trimmed = query.trim().toLowerCase();

  const matchedCourses = courses.filter(
    (c) =>
      c.code.toLowerCase().includes(trimmed) ||
      c.title.toLowerCase().includes(trimmed) ||
      c.lecturer.name.toLowerCase().includes(trimmed) ||
      c.lecturer.office.toLowerCase().includes(trimmed)
  );

  const matchedTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(trimmed) ||
      t.courseCode.toLowerCase().includes(trimmed) ||
      t.description.toLowerCase().includes(trimmed)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-black/75 backdrop-blur-sm">
      <div className="bg-[#282a2b] rounded-2xl p-4 w-full max-w-sm flex flex-col gap-3 shadow-2xl border border-[#85888f]/20">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-[#c4c6cf] text-[20px]">
            search
          </span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, lecturers, venues, tasks..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#1e2020] text-[#e2e2e2] font-body-md text-xs sm:text-sm outline-none border border-[#85888f]/30 focus:border-[#ff5540]"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 text-[#c4c6cf] hover:text-[#e2e2e2]"
            >
              <span className="material-symbols-outlined text-[18px]">clear</span>
            </button>
          ) : (
            <button onClick={onClose} className="absolute right-3 text-[#c4c6cf] hover:text-[#e2e2e2]">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-1">
          {/* Courses matches */}
          {matchedCourses.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <span className="font-label-sm text-[10px] uppercase text-[#c4c6cf] font-semibold">
                Courses ({matchedCourses.length})
              </span>
              {matchedCourses.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    onClose();
                    onNavigate('courses');
                  }}
                  className="p-2.5 rounded-lg bg-[#1e2020] hover:bg-[#333535] cursor-pointer flex items-center justify-between gap-2 border border-[#85888f]/10"
                >
                  <div className="min-w-0">
                    <span className="font-label-md text-xs font-bold text-[#ffb4a8] block">
                      {c.code} • {c.title}
                    </span>
                    <span className="font-body-sm text-[11px] text-[#c4c6cf] truncate block">
                      {c.lecturer.name} • {c.lecturer.office}
                    </span>
                  </div>
                  <span className="font-label-sm text-[10px] px-2 py-0.5 rounded bg-[#282a2b] text-[#c4c6cf] flex-shrink-0">
                    {c.credits} Cr
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tasks matches */}
          {matchedTasks.length > 0 && (
            <div className="flex flex-col gap-1.5 mt-2">
              <span className="font-label-sm text-[10px] uppercase text-[#c4c6cf] font-semibold">
                Deliverables &amp; Exams ({matchedTasks.length})
              </span>
              {matchedTasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    onClose();
                    onNavigate('tasks');
                  }}
                  className="p-2.5 rounded-lg bg-[#1e2020] hover:bg-[#333535] cursor-pointer flex items-center justify-between gap-2 border border-[#85888f]/10"
                >
                  <div className="min-w-0">
                    <span className="font-title-md text-xs font-bold text-[#e2e2e2] block truncate">
                      {t.title}
                    </span>
                    <span className="font-label-sm text-[10px] text-[#ffb4a8] block">
                      {t.courseCode} • {t.dueText}
                    </span>
                  </div>
                  {t.isCompleted ? (
                    <span className="font-label-sm text-[9px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400">
                      Done
                    </span>
                  ) : (
                    <span className="font-label-sm text-[9px] px-2 py-0.5 rounded bg-[#ff5540] text-white">
                      Pending
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {matchedCourses.length === 0 && matchedTasks.length === 0 && (
            <div className="py-6 text-center text-xs text-[#c4c6cf]">
              No matches found for &quot;{query}&quot;
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
