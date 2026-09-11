export type TabType = 'home' | 'academic' | 'courses' | 'tasks' | 'more';

export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  type: 'Core' | 'Elective' | 'Required' | 'Univ. Req';
  lecturer: {
    name: string;
    office: string;
    officeHours: string;
    email: string;
    phone: string;
    image?: string;
    hasOfficeHoursToday?: boolean;
  };
  nextClass?: string;
  pendingTasksCount?: number;
  coveragePercent: number;
  weekCurrent: number;
  weekTotal: number;
  offlineFilesCount?: number;
  badge?: {
    text: string;
    variant: 'urgent' | 'exam' | 'sprint' | 'prepared' | 'default';
  };
  banner?: {
    text: string;
    subtext?: string;
    variant: 'urgent' | 'warning' | 'info';
  };
}

export interface TaskItem {
  id: string;
  courseCode: string;
  courseTitle: string;
  title: string;
  description?: string;
  dueText: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  weight?: string;
  targetSubmission?: string;
  isCompleted: boolean;
  isExam?: boolean;
}

export interface SemesterRecord {
  level: string;
  semester: string;
  gpa: number;
  credits: number;
  cgpa: number;
  status: 'In Progress' | 'Validated';
  isCurrent?: boolean;
}

export interface GradeOption {
  letter: string;
  point: number;
  range: string;
}
