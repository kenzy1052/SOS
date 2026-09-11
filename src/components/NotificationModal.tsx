import React from 'react';

interface NotificationModalProps {
  onClose: () => void;
  onNavigateToTasks: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  onClose,
  onNavigateToTasks,
}) => {
  const notifications = [
    {
      id: 'notif-1',
      title: 'High Priority: CS 315 Lab 3 Due Today',
      time: '2 hours left',
      desc: 'Database Systems Lab 3 PDF submission portal closes at 02:00 PM prompt.',
      isUrgent: true,
    },
    {
      id: 'notif-2',
      title: 'UCC Exam Notice: CS 321 Networks Midsem',
      time: 'Starts Oct 24 (11 days)',
      desc: 'First paper scheduled for Main Gym Hall. Bring UCC ID card & Index Slip.',
      isUrgent: false,
    },
    {
      id: 'notif-3',
      title: 'Office Hours: Prof. Akua Serwaa Boateng',
      time: 'Today, 2:00 PM',
      desc: 'Office hours open in CS Dept Annex Rm 12 for query resolution.',
      isUrgent: false,
    },
    {
      id: 'notif-4',
      title: 'Offline Sync: 6 Courses Cached',
      time: 'Just now',
      desc: 'All course syllabi, past questions, and lecture slides cached in local SQLite.',
      isUrgent: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#282a2b] rounded-2xl p-4 w-full max-w-sm flex flex-col gap-3 shadow-2xl border border-[#85888f]/20">
        <div className="flex items-center justify-between border-b border-[#333535] pb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ffb4a8] text-[20px]">
              notifications
            </span>
            <h3 className="font-headline-md text-base font-bold text-[#e2e2e2]">
              Academic Alerts
            </h3>
          </div>
          <button onClick={onClose} className="text-[#c4c6cf] hover:text-[#e2e2e2]">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                onClose();
                onNavigateToTasks();
              }}
              className={`p-3 rounded-xl flex flex-col gap-1 cursor-pointer transition-colors border ${
                n.isUrgent
                  ? 'bg-[#1e2020] border-[#ff5540]/40 hover:bg-[#333535]'
                  : 'bg-[#1e2020] border-[#85888f]/15 hover:bg-[#333535]'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span
                  className={`font-title-md text-xs font-bold truncate ${
                    n.isUrgent ? 'text-[#ffb4a8]' : 'text-[#e2e2e2]'
                  }`}
                >
                  {n.title}
                </span>
                <span className="font-label-sm text-[9px] text-[#c4c6cf] flex-shrink-0 font-mono">
                  {n.time}
                </span>
              </div>
              <p className="font-body-sm text-[11px] text-[#c4c6cf] leading-relaxed">{n.desc}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 rounded-lg bg-[#333535] text-[#c4c6cf] hover:text-[#e2e2e2] font-label-md text-xs font-bold"
        >
          Close Alerts
        </button>
      </div>
    </div>
  );
};
