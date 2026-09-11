/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { TabType, Course, TaskItem } from './types';
import { INITIAL_COURSES, INITIAL_TASKS } from './data/initialData';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HomeTab } from './components/HomeTab';
import { AcademicTab } from './components/AcademicTab';
import { CoursesTab } from './components/CoursesTab';
import { TasksTab } from './components/TasksTab';
import { MoreTab } from './components/MoreTab';
import { QuickLogModal } from './components/QuickLogModal';
import { NotificationModal } from './components/NotificationModal';
import { SearchModal } from './components/SearchModal';
import { Toast } from './components/Toast';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [quickLogType, setQuickLogType] = useState<'task' | 'course' | 'exam' | 'study' | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  const handleAddTask = (newTask: TaskItem) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleAddCourse = (newCourse: Course) => {
    setCourses((prev) => [newCourse, ...prev]);
  };

  const pendingTasksCount = tasks.filter((t) => !t.isCompleted).length;

  return (
    <div className="bg-[#121414] text-[#e2e2e2] min-h-screen flex flex-col font-sans selection:bg-[#ff5540]/30 selection:text-[#ffdad4]">
      {/* Fixed Sticky Header */}
      <Header
        currentTab={currentTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onSelectTab={(tab) => setCurrentTab(tab)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-16 pb-20">
        {currentTab === 'home' && (
          <HomeTab
            onNavigate={(tab) => setCurrentTab(tab)}
            onOpenQuickLog={(type) => setQuickLogType(type)}
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onShowToast={showToast}
            currentCgpa={3.42}
          />
        )}

        {currentTab === 'academic' && <AcademicTab onShowToast={showToast} />}

        {currentTab === 'courses' && (
          <CoursesTab
            courses={courses}
            onAddCourse={handleAddCourse}
            onNavigate={(tab) => setCurrentTab(tab)}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'tasks' && (
          <TasksTab
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'more' && <MoreTab onShowToast={showToast} />}
      </main>

      {/* Fixed Bottom Nav */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        pendingTasksCount={pendingTasksCount}
      />

      {/* Quick Action Log Modal */}
      {quickLogType && (
        <QuickLogModal
          type={quickLogType}
          onClose={() => setQuickLogType(null)}
          onAddTask={handleAddTask}
          onAddCourse={handleAddCourse}
          onShowToast={showToast}
        />
      )}

      {/* Notifications Drawer */}
      {isNotificationsOpen && (
        <NotificationModal
          onClose={() => setIsNotificationsOpen(false)}
          onNavigateToTasks={() => {
            setIsNotificationsOpen(false);
            setCurrentTab('tasks');
          }}
        />
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <SearchModal
          onClose={() => setIsSearchOpen(false)}
          courses={courses}
          tasks={tasks}
          onSelectCourse={() => {
            setIsSearchOpen(false);
            setCurrentTab('courses');
          }}
          onNavigate={(tab) => {
            setIsSearchOpen(false);
            setCurrentTab(tab);
          }}
        />
      )}

      {/* Floating Action Toast Notification */}
      <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />
    </div>
  );
}
