import React, { useState } from 'react';
import { Course, TabType } from '../types';

interface CoursesTabProps {
  courses: Course[];
  onAddCourse: (newCourse: Course) => void;
  onNavigate: (tab: TabType) => void;
  onShowToast: (msg: string) => void;
}

export const CoursesTab: React.FC<CoursesTabProps> = ({
  courses,
  onAddCourse,
  onNavigate,
  onShowToast,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'core' | 'elective' | 'archive'>('all');
  const [selectedLecturer, setSelectedLecturer] = useState<{
    name: string;
    course: string;
    email: string;
    phone: string;
  } | null>(null);

  // Add course modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newCredits, setNewCredits] = useState(3);
  const [newType, setNewType] = useState<'Core' | 'Elective'>('Core');

  const filteredCourses = courses.filter((course) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'core') return course.type === 'Core';
    if (activeFilter === 'elective') return course.type === 'Elective' || course.type === 'Required' || course.type === 'Univ. Req';
    if (activeFilter === 'archive') return false;
    return true;
  });

  const handleOpenLecturer = (lecturer: { name: string; email: string; phone: string }, courseTitle: string) => {
    setSelectedLecturer({
      name: lecturer.name,
      course: courseTitle,
      email: lecturer.email,
      phone: lecturer.phone,
    });
  };

  const handleCopyEmail = () => {
    if (!selectedLecturer) return;
    const template = `Subject: Academic Inquiry - ${selectedLecturer.course}\nTo: ${selectedLecturer.email}\n\nDear ${selectedLecturer.name},\n\nI am Kofi Mensah (UCC Student ID: PS/CSC/21/0088), enrolled in ${selectedLecturer.course}. I am writing regarding our course materials.\n\nThank you,\nKofi Mensah`;
    navigator.clipboard?.writeText(template);
    onShowToast('Standard UCC Academic inquiry email copied to clipboard!');
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || !newTitle.trim()) {
      onShowToast('Please enter both course code and title.');
      return;
    }

    const created: Course = {
      id: `course-${Date.now()}`,
      code: newCode.trim().toUpperCase(),
      title: newTitle.trim(),
      credits: Number(newCredits) || 3,
      type: newType,
      lecturer: {
        name: 'Faculty Instructor',
        office: 'UCC CS Dept Annex',
        officeHours: 'TBA',
        email: 'cs.department@ucc.edu.gh',
        phone: '0244000000',
      },
      coveragePercent: 10,
      weekCurrent: 1,
      weekTotal: 12,
      offlineFilesCount: 2,
    };

    onAddCourse(created);
    setNewCode('');
    setNewTitle('');
    setIsAddModalOpen(false);
    onShowToast(`Course ${created.code} added successfully!`);
  };

  return (
    <div className="flex flex-col w-full pb-24 max-w-lg mx-auto">
      {/* Offline Sync System Pill */}
      <div className="px-4 pt-2 pb-2 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#282a2b] text-[#e2e2e2] border border-[#85888f]/15">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-label-sm text-[10px] text-[#c4c6cf] tracking-wide">
            Offline Engine Active • {courses.length} Courses Cached
          </span>
        </div>
        <div className="flex items-center gap-1 font-label-sm text-[11px] text-[#c4c6cf]">
          <span className="material-symbols-outlined text-[15px] text-[#ffb4a8]">cloud_done</span>
          <span>UCC-Wi-Fi</span>
        </div>
      </div>

      {/* Screen Meta Header */}
      <div className="px-4 py-2 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-label-sm text-[10px] uppercase tracking-wider text-[#c4c6cf]">
              Dashboard / Academics
            </span>
          </div>
          <h1 className="font-headline-lg-mobile text-[26px] leading-8 text-[#e2e2e2] font-bold tracking-tight truncate">
            Course Hub
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="font-label-md text-xs text-[#ffb4a8] font-semibold">
              L300 • Sem 1
            </span>
            <span className="text-[#c4c6cf]/40 font-label-sm text-xs">•</span>
            <span className="font-body-sm text-xs text-[#c4c6cf]">18 Credits Total</span>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex-shrink-0 inline-flex items-center gap-1 px-3.5 py-2 rounded-lg bg-[#ff5540] hover:bg-[#ff5540]/90 text-white font-headline-md text-sm font-bold shadow-md active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Add</span>
        </button>
      </div>

      {/* Quick Stats Metrics Strip */}
      <div className="px-4 pt-2 pb-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#282a2b] rounded-xl p-3.5 flex flex-col justify-between shadow-sm border border-[#85888f]/15">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-[10px] uppercase tracking-wider text-[#c4c6cf]">
                Enrolled
              </span>
              <span className="material-symbols-outlined text-[18px] text-[#ffb4a8]">
                auto_stories
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="font-metric-display text-2xl font-bold text-[#e2e2e2]">
                {courses.length}
              </span>
              <span className="font-label-sm text-[10px] text-[#c4c6cf]">Active / 18 CH</span>
            </div>
            <div className="mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="font-body-sm text-[11px] text-[#ebbbb4] font-medium">
                100% Registered
              </span>
            </div>
          </div>

          <div className="bg-[#282a2b] rounded-xl p-3.5 flex flex-col justify-between shadow-sm border border-[#85888f]/15">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-[10px] uppercase tracking-wider text-[#c4c6cf]">
                Avg Progress
              </span>
              <span className="material-symbols-outlined text-[18px] text-emerald-400">
                trending_up
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-metric-display text-2xl font-bold text-[#e2e2e2]">
                68
                <span className="font-title-md text-sm font-semibold text-[#c4c6cf]">%</span>
              </span>
              <span className="font-label-sm text-[10px] text-[#c4c6cf] ml-1">Wk 8 of 12</span>
            </div>
            <div className="w-full bg-[#0c0f0f] h-1.5 rounded-full mt-1 overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
        </div>

        {/* Urgent Critical Strip */}
        <div
          onClick={() => onNavigate('tasks')}
          className="mt-3 bg-[#1e2020] p-3 rounded-xl flex items-center justify-between gap-2 border border-[#85888f]/20 cursor-pointer hover:bg-[#282a2b] transition-colors"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#ff5540]/20 flex items-center justify-center flex-shrink-0 text-[#ffb4a8]">
              <span className="material-symbols-outlined text-[20px]">notification_important</span>
            </div>
            <div className="min-w-0">
              <p className="font-title-md text-xs sm:text-sm font-bold text-[#e2e2e2] truncate">
                4 Upcoming Deliverables
              </p>
              <p className="font-body-sm text-xs text-[#ff5540] truncate font-medium">
                CS 315 Lab 3 due today at 2:00 PM
              </p>
            </div>
          </div>
          <span className="font-label-sm text-[10px] px-2 py-1 rounded bg-[#93000a] text-[#ffdad6] font-bold flex-shrink-0">
            URGENT
          </span>
        </div>
      </div>

      {/* Filter / Segmented Selector */}
      <div className="px-4 mb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-full font-label-md text-xs font-bold transition-all whitespace-nowrap shadow-sm ${
              activeFilter === 'all'
                ? 'bg-[#ff5540] text-white'
                : 'bg-[#282a2b] text-[#c4c6cf] hover:text-[#e2e2e2]'
            }`}
          >
            All ({courses.length})
          </button>
          <button
            onClick={() => setActiveFilter('core')}
            className={`px-3 py-1.5 rounded-full font-label-md text-xs transition-all whitespace-nowrap ${
              activeFilter === 'core'
                ? 'bg-[#ff5540] text-white font-bold'
                : 'bg-[#282a2b] text-[#c4c6cf] hover:text-[#e2e2e2] font-semibold'
            }`}
          >
            Core (4)
          </button>
          <button
            onClick={() => setActiveFilter('elective')}
            className={`px-3 py-1.5 rounded-full font-label-md text-xs transition-all whitespace-nowrap ${
              activeFilter === 'elective'
                ? 'bg-[#ff5540] text-white font-bold'
                : 'bg-[#282a2b] text-[#c4c6cf] hover:text-[#e2e2e2] font-semibold'
            }`}
          >
            Electives / Req (2)
          </button>
          <button
            onClick={() => {
              setActiveFilter('archive');
              onShowToast('Archive: Past Level 100 & 200 syllabi cached offline.');
            }}
            className={`px-3 py-1.5 rounded-full font-label-md text-xs transition-all whitespace-nowrap ${
              activeFilter === 'archive'
                ? 'bg-[#ff5540] text-white font-bold'
                : 'bg-[#282a2b] text-[#c4c6cf] hover:text-[#e2e2e2] font-semibold'
            }`}
          >
            Archives (Sem 1-4)
          </button>
        </div>
      </div>

      {/* Course Card Collection */}
      <div className="px-4 flex flex-col gap-4">
        {filteredCourses.map((course) => {
          const isUrgent = course.badge?.variant === 'urgent' || course.code === 'CS 315';
          const isExam = course.badge?.variant === 'exam';
          const isSprint = course.badge?.variant === 'sprint';
          const isPrepared = course.badge?.variant === 'prepared';

          return (
            <div
              key={course.id}
              className={`bg-[#1e2020] rounded-xl p-4 shadow-md flex flex-col gap-3 relative overflow-hidden border border-[#85888f]/15 ${
                isUrgent ? 'border-l-4 border-l-[#ff5540]' : ''
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-label-sm text-[10px] px-2 py-0.5 rounded bg-[#333535] text-[#ffb4a8] font-bold">
                      {course.code}
                    </span>
                    <span className="font-label-sm text-[10px] text-[#c4c6cf]">
                      {course.credits} Credits
                    </span>
                    <span className="font-label-sm text-[10px] px-1.5 py-0.5 rounded bg-[#282a2b] text-[#ebbbb4]">
                      {course.type}
                    </span>
                  </div>
                  <h2 className="font-headline-md text-lg font-bold text-[#e2e2e2] truncate">
                    {course.title}
                  </h2>
                </div>

                {course.badge ? (
                  <span
                    className={`font-label-sm text-[10px] px-2 py-0.5 rounded font-bold flex-shrink-0 ${
                      isUrgent
                        ? 'bg-[#ff5540] text-white'
                        : isExam
                        ? 'bg-amber-500/20 text-amber-300'
                        : isSprint
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : isPrepared
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-[#333535] text-[#c4c6cf]'
                    }`}
                  >
                    {course.badge.text}
                  </span>
                ) : (
                  <button
                    aria-label="Course options"
                    onClick={() =>
                      handleOpenLecturer(course.lecturer, `${course.code}: ${course.title}`)
                    }
                    className="w-8 h-8 rounded-lg bg-[#282a2b] flex items-center justify-center text-[#c4c6cf] hover:text-[#e2e2e2]"
                  >
                    <span className="material-symbols-outlined text-[18px]">more_vert</span>
                  </button>
                )}
              </div>

              {/* Banner alerts if any */}
              {course.banner && (
                <div
                  className={`rounded-lg p-2.5 flex items-center justify-between gap-2 ${
                    course.banner.variant === 'urgent'
                      ? 'bg-[#ff5540]/15 text-[#ffb4a8]'
                      : 'bg-amber-500/10 text-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-[18px] flex-shrink-0">
                      {course.banner.variant === 'urgent' ? 'timer' : 'alarm'}
                    </span>
                    <span className="font-label-sm text-xs font-bold truncate">
                      {course.banner.text}
                    </span>
                  </div>
                  {course.banner.subtext ? (
                    <span className="font-label-sm text-[10px] text-[#c4c6cf] flex-shrink-0">
                      {course.banner.subtext}
                    </span>
                  ) : (
                    <button
                      onClick={() => onNavigate('tasks')}
                      className="px-2 py-1 rounded bg-[#ff5540] text-white font-label-sm text-[10px] font-bold active:scale-95 transition-transform flex-shrink-0"
                    >
                      Submit
                    </button>
                  )}
                </div>
              )}

              {/* Lecturer Details */}
              {course.lecturer.image ? (
                <div className="bg-[#1a1c1c] rounded-lg p-3 flex items-center gap-3 border border-[#85888f]/10">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-[#333535]">
                    <img
                      className="w-full h-full object-cover"
                      alt={course.lecturer.name}
                      src={course.lecturer.image}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-title-md text-xs sm:text-sm font-bold text-[#e2e2e2] truncate">
                      {course.lecturer.name}
                    </p>
                    <p className="font-body-sm text-[11px] text-[#c4c6cf] truncate">
                      {course.lecturer.office}
                    </p>
                    {course.lecturer.hasOfficeHoursToday ? (
                      <p className="font-label-sm text-[10px] text-emerald-400 mt-0.5 font-medium">
                        Office Hours Slot Available Today
                      </p>
                    ) : (
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-label-sm text-[10px] text-[#ebbbb4]">
                          {course.lecturer.officeHours}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between py-1 px-1 bg-[#1a1c1c] rounded-lg p-2.5 border border-[#85888f]/10">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-[18px] text-[#c4c6cf] flex-shrink-0">
                      person
                    </span>
                    <span className="font-body-md text-xs sm:text-sm text-[#e2e2e2] font-medium truncate">
                      {course.lecturer.name}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      handleOpenLecturer(course.lecturer, `${course.code}: ${course.title}`)
                    }
                    className="font-label-sm text-[11px] text-[#ffb4a8] font-bold px-2.5 py-1 rounded bg-[#282a2b] hover:bg-[#333535] flex-shrink-0"
                  >
                    Contact
                  </button>
                </div>
              )}

              {/* Timetable / Task pending badges */}
              {(course.nextClass || course.pendingTasksCount) && (
                <div className="flex flex-wrap gap-1.5">
                  {course.nextClass && (
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#282a2b] text-[#c4c6cf] text-[10px]">
                      <span className="material-symbols-outlined text-[14px] text-emerald-400">
                        schedule
                      </span>
                      <span className="font-label-sm">{course.nextClass}</span>
                    </div>
                  )}
                  {course.pendingTasksCount && (
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#ff5540]/15 text-[#ffb4a8] text-[10px]">
                      <span className="material-symbols-outlined text-[14px]">assignment</span>
                      <span className="font-label-sm font-semibold">
                        {course.pendingTasksCount} Task Pending (Due Fri)
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Progress Section */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#c4c6cf] font-medium">
                    {course.code === 'AFR 301'
                      ? 'Readings Completed'
                      : course.code === 'CS 325'
                      ? 'Sprint Completion'
                      : 'Syllabus Covered'}
                  </span>
                  <span className="font-label-sm text-[11px] text-[#e2e2e2] font-bold">
                    {course.coveragePercent}%{' '}
                    {course.code === 'CS 325' ? '(On Track)' : `(Week ${course.weekCurrent} of ${course.weekTotal})`}
                  </span>
                </div>
                <div className="w-full bg-[#0c0f0f] h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      course.code === 'CS 325' || course.code === 'AFR 301'
                        ? 'bg-emerald-400'
                        : isUrgent
                        ? 'bg-[#ff5540]'
                        : 'bg-[#ffb4a8]'
                    }`}
                    style={{ width: `${course.coveragePercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Quick Action Drawer Triggers */}
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                <button
                  onClick={() =>
                    handleOpenLecturer(course.lecturer, `${course.code}: ${course.title}`)
                  }
                  className="py-2 px-1.5 rounded-lg bg-[#282a2b] hover:bg-[#333535] flex flex-col items-center justify-center gap-1 text-center transition-colors border border-[#85888f]/10"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#ffb4a8]">
                    support_agent
                  </span>
                  <span className="font-label-sm text-[10px] font-semibold text-[#e2e2e2]">
                    Lecturer Hub
                  </span>
                </button>

                <button
                  onClick={() =>
                    onShowToast(`${course.offlineFilesCount || 6} offline PDFs & slides cached in storage.`)
                  }
                  className="py-2 px-1.5 rounded-lg bg-[#282a2b] hover:bg-[#333535] flex flex-col items-center justify-center gap-1 text-center transition-colors border border-[#85888f]/10"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#c4c6cf]">
                    folder_open
                  </span>
                  <span className="font-label-sm text-[10px] font-semibold text-[#e2e2e2] truncate w-full">
                    {course.offlineFilesCount || 6} Offline Files
                  </span>
                </button>

                <button
                  onClick={() => onNavigate('tasks')}
                  className="py-2 px-1.5 rounded-lg bg-[#282a2b] hover:bg-[#333535] flex flex-col items-center justify-center gap-1 text-center transition-colors border border-[#85888f]/10"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#c4c6cf]">
                    fact_check
                  </span>
                  <span className="font-label-sm text-[10px] font-semibold text-[#e2e2e2]">
                    Tasks &amp; Exams
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lecturer Hub Persistent Quick Contact Bottom Sheet */}
      {selectedLecturer && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-[#282a2b] rounded-t-2xl shadow-2xl p-4 flex flex-col gap-3 w-full max-w-lg mx-auto border-t border-[#85888f]/30">
            {/* Drag Handle */}
            <div
              className="w-12 h-1.5 bg-[#464950] rounded-full mx-auto -mt-1 cursor-pointer"
              onClick={() => setSelectedLecturer(null)}
            ></div>

            <div className="flex items-start justify-between">
              <div>
                <span className="font-label-sm text-[10px] uppercase tracking-wider text-[#ffb4a8] font-bold">
                  Lecturer Quick-Connect Hub
                </span>
                <h3 className="font-headline-md text-lg font-bold text-[#e2e2e2]">
                  {selectedLecturer.name}
                </h3>
                <p className="font-body-sm text-xs text-[#c4c6cf]">{selectedLecturer.course}</p>
              </div>
              <button
                onClick={() => setSelectedLecturer(null)}
                className="w-8 h-8 rounded-full bg-[#333535] flex items-center justify-center text-[#c4c6cf] hover:text-[#e2e2e2]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Quick Action Utilities */}
            <div className="grid grid-cols-3 gap-2">
              <a
                href={`https://wa.me/233${selectedLecturer.phone.replace(/^0/, '')}?text=Hello%20Course%20Rep%2C%20inquiry%20regarding%20L300%20${encodeURIComponent(
                  selectedLecturer.course
                )}`}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-[#1e2020] flex flex-col items-center justify-center gap-1.5 active:bg-[#333535] text-center border border-[#85888f]/10"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                </div>
                <span className="font-label-sm text-[10px] font-bold text-[#e2e2e2] leading-tight">
                  WhatsApp Rep
                </span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="p-3 rounded-xl bg-[#1e2020] flex flex-col items-center justify-center gap-1.5 active:bg-[#333535] text-center border border-[#85888f]/10"
              >
                <div className="w-9 h-9 rounded-full bg-[#ff5540]/20 text-[#ffb4a8] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <span className="font-label-sm text-[10px] font-bold text-[#e2e2e2] leading-tight">
                  Email Template (UCC ID)
                </span>
              </button>

              <button
                onClick={() => {
                  onShowToast('Slot requested: Lecturer will confirm via official UCC Webmail.');
                  setSelectedLecturer(null);
                }}
                className="p-3 rounded-xl bg-[#1e2020] flex flex-col items-center justify-center gap-1.5 active:bg-[#333535] text-center border border-[#85888f]/10"
              >
                <div className="w-9 h-9 rounded-full bg-[#333535] text-[#c4c6cf] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">event_available</span>
                </div>
                <span className="font-label-sm text-[10px] font-bold text-[#e2e2e2] leading-tight">
                  Book Office Hours
                </span>
              </button>
            </div>

            {/* Direct Contacts Breakdown */}
            <div className="bg-[#1e2020] rounded-xl p-3 flex flex-col gap-2 border border-[#85888f]/10">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#c4c6cf] font-medium">UCC Webmail:</span>
                <span className="font-label-sm text-xs text-[#ffb4a8] font-bold">
                  {selectedLecturer.email}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#c4c6cf] font-medium">Department Desk:</span>
                <span className="font-label-sm text-xs text-[#e2e2e2] font-semibold">
                  +233 (0) {selectedLecturer.phone}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedLecturer(null)}
              className="w-full py-2.5 rounded-lg bg-[#333535] text-[#c4c6cf] hover:text-white font-headline-md text-sm font-bold mt-1"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Add Course Modal Dialog */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#282a2b] rounded-xl p-4 w-full max-w-sm flex flex-col gap-3 shadow-2xl border border-[#85888f]/20">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-md text-base font-bold text-[#e2e2e2]">
                Add L300 Course
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#c4c6cf] hover:text-[#e2e2e2]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="flex flex-col gap-3">
              <div>
                <label className="font-label-sm text-[10px] uppercase text-[#c4c6cf]">
                  Course Code
                </label>
                <input
                  type="text"
                  required
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="e.g. CS 333"
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1e2020] text-[#e2e2e2] font-label-md text-xs outline-none border border-[#85888f]/30 focus:border-[#ff5540]"
                />
              </div>

              <div>
                <label className="font-label-sm text-[10px] uppercase text-[#c4c6cf]">
                  Course Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Artificial Intelligence & Robotics"
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1e2020] text-[#e2e2e2] font-body-md text-xs outline-none border border-[#85888f]/30 focus:border-[#ff5540]"
                />
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="font-label-sm text-[10px] uppercase text-[#c4c6cf]">
                    Credits
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={newCredits}
                    onChange={(e) => setNewCredits(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1e2020] text-[#e2e2e2] font-label-md text-xs outline-none border border-[#85888f]/30 focus:border-[#ff5540]"
                  />
                </div>
                <div className="flex-1">
                  <label className="font-label-sm text-[10px] uppercase text-[#c4c6cf]">Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as 'Core' | 'Elective')}
                    className="w-full mt-1 px-2.5 py-2 rounded-lg bg-[#1e2020] text-[#e2e2e2] font-body-sm text-xs outline-none border border-[#85888f]/30 focus:border-[#ff5540]"
                  >
                    <option value="Core">Core</option>
                    <option value="Elective">Elective</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2 rounded-lg bg-[#1e2020] text-[#c4c6cf] font-semibold text-xs border border-[#85888f]/20 hover:bg-[#333535]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-[#ff5540] hover:bg-[#ff5540]/90 text-white font-bold text-xs shadow"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
