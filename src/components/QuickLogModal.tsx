import React, { useState } from 'react';
import { TaskItem, Course } from '../types';

interface QuickLogModalProps {
  type: 'task' | 'course' | 'exam' | 'study';
  onClose: () => void;
  onAddTask: (task: TaskItem) => void;
  onAddCourse: (course: Course) => void;
  onShowToast: (msg: string) => void;
}

export const QuickLogModal: React.FC<QuickLogModalProps> = ({
  type,
  onClose,
  onAddTask,
  onAddCourse,
  onShowToast,
}) => {
  const [courseCode, setCourseCode] = useState('CS 311');
  const [title, setTitle] = useState('');
  const [dateOrTime, setDateOrTime] = useState('');
  const [studyNotes, setStudyNotes] = useState('');
  const [courseCredits, setCourseCredits] = useState(3);

  const getTitleText = () => {
    switch (type) {
      case 'task':
        return '+ Add Task / Deadline';
      case 'course':
        return '+ Enroll L300 Course';
      case 'exam':
        return '+ Schedule Examination Paper';
      case 'study':
        return '+ Log Deep Work Study Session';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (type === 'course') {
      if (!title.trim() || !courseCode.trim()) {
        onShowToast('Please specify code and title.');
        return;
      }
      const newCourse: Course = {
        id: `course-${Date.now()}`,
        code: courseCode.trim().toUpperCase(),
        title: title.trim(),
        credits: courseCredits,
        type: 'Core',
        lecturer: {
          name: 'Faculty Lecturer',
          office: 'New Science Block',
          officeHours: 'TBA',
          email: 'lecturer@ucc.edu.gh',
          phone: '0244123000',
        },
        coveragePercent: 15,
        weekCurrent: 2,
        weekTotal: 12,
        offlineFilesCount: 3,
      };
      onAddCourse(newCourse);
      onShowToast(`Enrolled: ${newCourse.code} (${newCourse.title})`);
    } else if (type === 'study') {
      onShowToast(`Logged 1.5 hrs deep work session for ${courseCode}!`);
    } else {
      // Task or Exam
      if (!title.trim()) {
        onShowToast('Please enter a title.');
        return;
      }
      const isExam = type === 'exam';
      const newTask: TaskItem = {
        id: `task-${Date.now()}`,
        courseCode,
        courseTitle: courseCode,
        title: title.trim(),
        description: isExam
          ? 'Midsem/Final Examination Paper'
          : 'Continuous Assessment Deliverable',
        dueText: dateOrTime.trim() || (isExam ? 'Upcoming Exam' : 'Due Soon'),
        dueDate: dateOrTime.trim() || 'Upcoming',
        priority: isExam ? 'High' : 'Medium',
        weight: isExam ? '30% Paper' : '15% Assignment',
        targetSubmission: isExam ? 'Venue: UCC Lecture Hall' : 'Target: Submit to Course Portal',
        isCompleted: false,
        isExam,
      };
      onAddTask(newTask);
      onShowToast(`${isExam ? 'Exam scheduled' : 'Task added'}: ${newTask.title}`);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#282a2b] rounded-xl p-4 w-full max-w-sm flex flex-col gap-3 shadow-2xl border border-[#85888f]/20">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-md text-base font-bold text-[#e2e2e2]">
            {getTitleText()}
          </h3>
          <button onClick={onClose} className="text-[#c4c6cf] hover:text-[#e2e2e2]">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {type !== 'course' && (
            <div>
              <label className="font-label-sm text-[10px] uppercase text-[#c4c6cf]">
                Select Course
              </label>
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
          )}

          {type === 'course' && (
            <div>
              <label className="font-label-sm text-[10px] uppercase text-[#c4c6cf]">
                Course Code
              </label>
              <input
                type="text"
                required
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                placeholder="e.g. CS 331"
                className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1e2020] text-[#e2e2e2] font-label-md text-xs outline-none border border-[#85888f]/30 focus:border-[#ff5540]"
              />
            </div>
          )}

          {type !== 'study' ? (
            <div>
              <label className="font-label-sm text-[10px] uppercase text-[#c4c6cf]">
                {type === 'course' ? 'Course Title' : type === 'exam' ? 'Paper Name' : 'Task Title'}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  type === 'course'
                    ? 'e.g. Artificial Intelligence'
                    : type === 'exam'
                    ? 'e.g. End of Semester Final Paper'
                    : 'e.g. Lab Exercise 4'
                }
                className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1e2020] text-[#e2e2e2] font-body-md text-xs outline-none border border-[#85888f]/30 focus:border-[#ff5540]"
              />
            </div>
          ) : (
            <div>
              <label className="font-label-sm text-[10px] uppercase text-[#c4c6cf]">
                Study Focus / Topics
              </label>
              <input
                type="text"
                required
                value={studyNotes}
                onChange={(e) => setStudyNotes(e.target.value)}
                placeholder="e.g. Graph Algorithms & Dijkstra's Algorithm"
                className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1e2020] text-[#e2e2e2] font-body-md text-xs outline-none border border-[#85888f]/30 focus:border-[#ff5540]"
              />
            </div>
          )}

          {type === 'course' ? (
            <div>
              <label className="font-label-sm text-[10px] uppercase text-[#c4c6cf]">
                Credit Units
              </label>
              <input
                type="number"
                min={1}
                max={6}
                value={courseCredits}
                onChange={(e) => setCourseCredits(Number(e.target.value))}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1e2020] text-[#e2e2e2] font-label-md text-xs outline-none border border-[#85888f]/30 focus:border-[#ff5540]"
              />
            </div>
          ) : (
            <div>
              <label className="font-label-sm text-[10px] uppercase text-[#c4c6cf]">
                {type === 'study' ? 'Duration / Scheduled Time' : 'Due Date & Time'}
              </label>
              <input
                type="text"
                value={dateOrTime}
                onChange={(e) => setDateOrTime(e.target.value)}
                placeholder={
                  type === 'study'
                    ? 'e.g. 1.5 hrs (06:00 PM — 07:30 PM)'
                    : 'e.g. Due Friday, 5:00 PM'
                }
                className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1e2020] text-[#e2e2e2] font-label-md text-xs outline-none border border-[#85888f]/30 focus:border-[#ff5540]"
              />
            </div>
          )}

          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-lg bg-[#1e2020] text-[#c4c6cf] font-semibold text-xs border border-[#85888f]/20 hover:bg-[#333535]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-lg bg-[#ff5540] hover:bg-[#ff5540]/90 text-white font-bold text-xs shadow"
            >
              Confirm Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
