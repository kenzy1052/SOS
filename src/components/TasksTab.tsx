import React, { useState } from 'react';
import { TaskItem } from '../types';

interface TasksTabProps {
  tasks: TaskItem[];
  onToggleTask: (id: string) => void;
  onAddTask: (newTask: TaskItem) => void;
  onShowToast: (msg: string) => void;
}

export const TasksTab: React.FC<TasksTabProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
  onShowToast,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'urgent' | 'exams' | 'completed'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [courseCode, setCourseCode] = useState('CS 311');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueText, setDueText] = useState('Due Friday, 11:59 PM');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [isExam, setIsExam] = useState(false);

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending') return !t.isCompleted;
    if (filter === 'urgent') return !t.isCompleted && (t.priority === 'High' || t.dueText.includes('hrs'));
    if (filter === 'exams') return t.isExam;
    if (filter === 'completed') return t.isCompleted;
    return true;
  });

  const pendingCount = tasks.filter((t) => !t.isCompleted).length;
  const completedCount = tasks.filter((t) => t.isCompleted).length;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      onShowToast('Please specify the task or exam title.');
      return;
    }

    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      courseCode,
      courseTitle: courseCode,
      title: title.trim(),
      description: description.trim() || 'Deliverable for ' + courseCode,
      dueText,
      dueDate: dueText,
      priority,
      weight: isExam ? 'Examination Assessment' : 'Continuous Assessment',
      targetSubmission: isExam ? 'Venue: UCC Lecture Theater' : 'Target: Submit via UCC LMS Portal',
      isCompleted: false,
      isExam,
    };

    onAddTask(newTask);
    setTitle('');
    setDescription('');
    setIsAddModalOpen(false);
    onShowToast(`New ${isExam ? 'Exam' : 'Task'} added to schedule!`);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-24 gap-4 max-w-lg mx-auto">
      {/* Top Header */}
      <div className="pt-2 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-label-sm text-[10px] uppercase tracking-wider text-[#c4c6cf]">
              Academics &amp; Schedule
            </span>
          </div>
          <h1 className="font-headline-lg-mobile text-[26px] leading-8 text-[#e2e2e2] font-bold tracking-tight">
            Tasks &amp; Exams
          </h1>
          <p className="font-body-sm text-xs text-[#c4c6cf]">
            {pendingCount} Pending • {completedCount} Completed
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex-shrink-0 inline-flex items-center gap-1 px-3.5 py-2 rounded-lg bg-[#ff5540] hover:bg-[#ff5540]/90 text-white font-headline-md text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">add_task</span>
          <span>+ Task</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {[
          { key: 'all', label: `All (${tasks.length})` },
          { key: 'pending', label: `Pending (${pendingCount})` },
          { key: 'urgent', label: 'Urgent' },
          { key: 'exams', label: 'Exams' },
          { key: 'completed', label: `Done (${completedCount})` },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setFilter(item.key as any)}
            className={`px-3 py-1.5 rounded-full font-label-md text-xs font-bold transition-all whitespace-nowrap ${
              filter === item.key
                ? 'bg-[#ff5540] text-white shadow-sm'
                : 'bg-[#282a2b] text-[#c4c6cf] hover:text-[#e2e2e2]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="flex flex-col gap-3">
        {filteredTasks.length === 0 ? (
          <div className="p-8 bg-[#1e2020] rounded-xl text-center border border-[#85888f]/15 flex flex-col items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[36px] text-[#c4c6cf]">
              check_circle_outline
            </span>
            <p className="font-title-md text-sm text-[#e2e2e2] font-semibold">
              No tasks in this category
            </p>
            <p className="font-body-sm text-xs text-[#c4c6cf]">
              Everything is up-to-date and organized.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isUrgent = task.priority === 'High' && !task.isCompleted;

            return (
              <div
                key={task.id}
                className={`bg-[#1e2020] rounded-xl p-4 shadow-sm flex flex-col gap-2 relative overflow-hidden border border-[#85888f]/15 transition-all ${
                  isUrgent ? 'border-l-4 border-l-[#ff5540]' : ''
                } ${task.isCompleted ? 'opacity-70' : ''}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <button
                      onClick={() => {
                        onToggleTask(task.id);
                        onShowToast(
                          task.isCompleted
                            ? `Reopened: ${task.title}`
                            : `Completed: ${task.title}!`
                        );
                      }}
                      className={`w-6 h-6 rounded-md flex items-center justify-center border flex-shrink-0 transition-colors ${
                        task.isCompleted
                          ? 'bg-[#ff5540] border-[#ff5540] text-white'
                          : 'border-[#85888f]/40 hover:border-[#ffb4a8]'
                      }`}
                    >
                      {task.isCompleted && (
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      )}
                    </button>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-label-sm text-[10px] px-2 py-0.5 rounded bg-[#333535] text-[#ffb4a8] font-bold">
                        {task.courseCode}
                      </span>
                      {task.isExam && (
                        <span className="font-label-sm text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                          EXAM
                        </span>
                      )}
                    </div>
                  </div>

                  <span
                    className={`font-label-sm text-[10px] px-2 py-0.5 rounded font-bold flex-shrink-0 ${
                      task.isCompleted
                        ? 'bg-emerald-950/80 text-emerald-400'
                        : task.priority === 'High'
                        ? 'bg-[#ff5540] text-white'
                        : 'bg-[#282a2b] text-[#c4c6cf]'
                    }`}
                  >
                    {task.isCompleted ? 'COMPLETED' : task.dueText}
                  </span>
                </div>

                {/* Content */}
                <div className="pl-8">
                  <h3
                    className={`font-title-md text-sm sm:text-base font-bold text-[#e2e2e2] ${
                      task.isCompleted ? 'line-through text-[#c4c6cf]' : ''
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="font-body-sm text-xs text-[#c4c6cf] mt-0.5">
                      {task.description}
                    </p>
                  )}

                  {/* Submission target info */}
                  {task.targetSubmission && (
                    <div className="mt-2 p-2 bg-[#282a2b] rounded-lg text-xs text-[#c4c6cf] flex items-center justify-between flex-wrap gap-1 border border-[#85888f]/10">
                      <span className="font-label-sm text-[11px] truncate">
                        {task.targetSubmission}
                      </span>
                      {task.weight && (
                        <span className="font-label-sm text-[10px] text-[#ffb4a8] font-semibold">
                          {task.weight}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#282a2b] rounded-xl p-4 w-full max-w-sm flex flex-col gap-3 shadow-2xl border border-[#85888f]/20">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-md text-base font-bold text-[#e2e2e2]">
                New Academic Deliverable
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#c4c6cf] hover:text-[#e2e2e2]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="flex flex-col gap-3">
              <div>
                <label className="font-label-sm text-[10px] uppercase text-[#c4c6cf]">Course</label>
                <select
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1e2020] text-[#e2e2e2] font-label-md text-xs outline-none border border-[#85888f]/30"
                >
                  <option value="CS 311">CS 311 - Operating Systems</option>
                  <option value="CS 315">CS 315 - Database Systems</option>
                  <option value="CS 321">CS 321 - Computer Networks</option>
                  <option value="CS 325">CS 325 - Software Engineering</option>
                  <option value="MATH 305">MATH 305 - Numerical Analysis</option>
                  <option value="AFR 301">AFR 301 - African Studies</option>
                </select>
              </div>

              <div>
                <label className="font-label-sm text-[10px] uppercase text-[#c4c6cf]">
                  Title / Task Name
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Lab 4 Implementation"
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1e2020] text-[#e2e2e2] font-body-md text-xs outline-none border border-[#85888f]/30 focus:border-[#ff5540]"
                />
              </div>

              <div>
                <label className="font-label-sm text-[10px] uppercase text-[#c4c6cf]">
                  Description / Details
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Normalization and ER Diagram report"
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1e2020] text-[#e2e2e2] font-body-md text-xs outline-none border border-[#85888f]/30 focus:border-[#ff5540]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-label-sm text-[10px] uppercase text-[#c4c6cf]">Due</label>
                  <input
                    type="text"
                    value={dueText}
                    onChange={(e) => setDueText(e.target.value)}
                    placeholder="e.g. Due Thursday, 5 PM"
                    className="w-full mt-1 px-2.5 py-2 rounded-lg bg-[#1e2020] text-[#e2e2e2] font-label-md text-xs outline-none border border-[#85888f]/30 focus:border-[#ff5540]"
                  />
                </div>

                <div>
                  <label className="font-label-sm text-[10px] uppercase text-[#c4c6cf]">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full mt-1 px-2.5 py-2 rounded-lg bg-[#1e2020] text-[#e2e2e2] font-body-sm text-xs outline-none border border-[#85888f]/30"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <input
                  type="checkbox"
                  id="isExamCheck"
                  checked={isExam}
                  onChange={(e) => setIsExam(e.target.checked)}
                  className="w-4 h-4 rounded text-[#ff5540] focus:ring-0"
                />
                <label
                  htmlFor="isExamCheck"
                  className="font-body-sm text-xs text-[#e2e2e2] cursor-pointer"
                >
                  This is a Midsem or Final Examination paper
                </label>
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
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
