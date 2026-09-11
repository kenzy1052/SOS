import React, { useState, useMemo } from 'react';
import { UCC_GRADE_OPTIONS, HISTORICAL_SEMESTERS } from '../data/initialData';

interface AcademicTabProps {
  onShowToast: (msg: string) => void;
}

interface SimulatedCourse {
  code: string;
  title: string;
  credits: number;
  defaultGrade: number;
}

const SIMULATED_COURSES: SimulatedCourse[] = [
  { code: 'CS 311', title: 'Operating Systems', credits: 3, defaultGrade: 4.0 },
  { code: 'CS 315', title: 'Database Systems', credits: 3, defaultGrade: 4.0 },
  { code: 'CS 321', title: 'Computer Networks', credits: 3, defaultGrade: 3.5 },
  { code: 'CS 325', title: 'Software Engineering', credits: 3, defaultGrade: 4.0 },
  { code: 'MATH 305', title: 'Numerical Analysis', credits: 3, defaultGrade: 3.0 },
  { code: 'AFR 301', title: 'African Studies', credits: 3, defaultGrade: 4.0 },
];

export const AcademicTab: React.FC<AcademicTabProps> = ({ onShowToast }) => {
  const [grades, setGrades] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    SIMULATED_COURSES.forEach((c) => {
      initial[c.code] = c.defaultGrade;
    });
    return initial;
  });

  const earnedCredits = 76;
  const currentCgpa = 3.42;
  const priorQualityPoints = earnedCredits * currentCgpa; // 259.92

  const { semGpa, newCgpa, gainText, isGainPositive } = useMemo(() => {
    let semQp = 0;
    let semCredits = 0;

    SIMULATED_COURSES.forEach((c) => {
      const g = grades[c.code] ?? 4.0;
      semQp += c.credits * g;
      semCredits += c.credits;
    });

    const sGpa = semCredits > 0 ? semQp / semCredits : 0;
    const nCgpa = (priorQualityPoints + semQp) / (earnedCredits + semCredits);
    const diff = nCgpa - currentCgpa;
    const diffSign = diff >= 0 ? '+' : '';

    return {
      semGpa: sGpa.toFixed(2),
      newCgpa: nCgpa.toFixed(2),
      gainText: `${diffSign}${diff.toFixed(2)} ${diff >= 0 ? 'GAIN' : 'SHIFT'}`,
      isGainPositive: diff >= 0,
    };
  }, [grades, priorQualityPoints, earnedCredits, currentCgpa]);

  const handleGradeChange = (code: string, val: number) => {
    setGrades((prev) => ({ ...prev, [code]: val }));
  };

  const handleReset = () => {
    const resetValues: Record<string, number> = {};
    SIMULATED_COURSES.forEach((c) => {
      resetValues[c.code] = c.defaultGrade;
    });
    setGrades(resetValues);
    onShowToast('Semester scenario simulator reset to baseline target.');
  };

  // Calculate SVG Y coordinate for GPA (3.0 -> y=90, 4.0 -> y=10)
  const getY = (gpa: number) => {
    const minGpa = 3.0;
    const maxGpa = 4.0;
    const clamped = Math.max(minGpa, Math.min(maxGpa, gpa));
    const ratio = (clamped - minGpa) / (maxGpa - minGpa);
    return 90 - ratio * 75;
  };

  const simulatedLastY = getY(parseFloat(newCgpa));

  return (
    <div className="flex flex-col w-full px-4 py-3 pb-24 gap-4 max-w-lg mx-auto">
      {/* Top Hero Status & Academic Goal Tracker */}
      <div className="flex flex-col bg-[#1e2020] rounded-xl p-4 shadow-xl relative overflow-hidden border border-[#85888f]/15">
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#ff5540]/10 blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between pb-3 border-b border-[#2c2f36]/60">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-[#ffb4a8] text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              workspace_premium
            </span>
            <span className="font-label-sm text-[10px] text-[#c4c6cf] uppercase tracking-wider font-mono">
              UCC 4.0 Standard Scale
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#282a2b] px-2.5 py-0.5 rounded-full border border-[#85888f]/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5540] animate-ping"></span>
            <span className="font-label-sm text-[10px] text-[#ebbbb4] font-semibold font-mono">
              L300 SEM 1
            </span>
          </div>
        </div>

        {/* Main Dual Metric Display */}
        <div className="grid grid-cols-2 gap-3 py-3">
          <div className="flex flex-col">
            <span className="font-body-sm text-xs text-[#c4c6cf]">Cumulative GPA</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-metric-display text-3xl font-bold text-[#e2e2e2] tracking-tight">
                3.42
              </span>
              <span className="font-label-md text-xs text-[#c4c6cf]">/ 4.00</span>
            </div>
            <span className="font-label-sm text-[11px] text-[#c4c6cf] mt-0.5 font-medium">
              Second Class Upper
            </span>
          </div>

          <div className="flex flex-col pl-3 border-l border-[#2c2f36]">
            <span className="font-body-sm text-xs text-[#c4c6cf]">Target Goal</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-metric-display text-3xl font-bold text-[#ffb4a8] tracking-tight">
                3.60
              </span>
              <span className="font-label-md text-xs text-[#c4c6cf]">/ 4.00</span>
            </div>
            <span className="font-label-sm text-[11px] text-[#ffb4a8] font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">flag</span>
              First Class Honours
            </span>
          </div>
        </div>

        {/* Progress to Target Indicator */}
        <div className="mt-2 pt-2 bg-[#1a1c1c] rounded-lg p-3 flex flex-col gap-1.5 border border-[#85888f]/10">
          <div className="flex justify-between items-center text-[#c4c6cf]">
            <span className="font-body-sm text-xs">Degree Completion</span>
            <span className="font-label-md text-xs text-[#e2e2e2] font-semibold">
              76 / 120 Cr. (63.3%)
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#333535] overflow-hidden flex">
            <div className="h-full bg-[#c4c6cf]" style={{ width: '63.3%' }}></div>
            <div className="h-full bg-[#ff5540]" style={{ width: '15%' }}></div>
          </div>
          <div className="flex justify-between items-center text-[#c4c6cf] text-[11px] mt-0.5">
            <span className="font-label-sm flex items-center gap-1 text-[10px]">
              <span className="w-2 h-2 rounded-full bg-[#c4c6cf] inline-block"></span> 76 Earned
            </span>
            <span className="font-label-sm flex items-center gap-1 text-[10px]">
              <span className="w-2 h-2 rounded-full bg-[#ff5540] inline-block"></span> 18 In Progress
            </span>
            <span className="font-label-sm text-[10px]">26 Remaining</span>
          </div>
        </div>

        {/* Projected Semester Impact Banner */}
        <div className="mt-3 flex items-center justify-between bg-[#333535]/60 rounded-lg px-3 py-2 border border-[#85888f]/15">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ffb4a8] text-[20px]">
              auto_graph
            </span>
            <span className="font-body-md text-xs sm:text-sm text-[#e2e2e2]">
              Simulated Semester GPA
            </span>
          </div>
          <span className="font-headline-md text-xl text-[#ffb4a8] font-bold font-mono">
            {semGpa}
          </span>
        </div>
      </div>

      {/* 'What Grade Do I Need?' Smart Pathfinder Card */}
      <div className="flex flex-col bg-[#1e2020] rounded-xl p-4 shadow-md border border-[#85888f]/15">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ffb4a8] text-[22px]">
              psychology
            </span>
            <h2 className="font-title-md text-base text-[#e2e2e2] font-bold">
              What Grade Do I Need?
            </h2>
          </div>
          <span className="font-label-sm text-[10px] px-2 py-0.5 rounded-full bg-[#ff5540]/20 text-[#ffb4a8] font-bold tracking-wider">
            SMART PATHFINDER
          </span>
        </div>

        <p className="font-body-md text-xs sm:text-sm text-[#c4c6cf] leading-snug">
          To attain your targeted <strong className="text-[#e2e2e2] font-semibold">3.60 CGPA</strong> threshold across the{' '}
          <strong className="text-[#e2e2e2] font-semibold">18 registered credits</strong> this semester:
        </p>

        {/* Required Combination Pill Grid */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="flex items-center gap-2.5 p-2.5 bg-[#282a2b] rounded-lg border border-[#85888f]/10">
            <div className="w-10 h-10 rounded bg-[#ff5540] flex items-center justify-center font-headline-md text-xl text-white font-bold flex-shrink-0">
              4
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-xs text-[#e2e2e2] font-bold truncate">
                Grade A (4.0)
              </span>
              <span className="font-body-sm text-[11px] text-[#c4c6cf] truncate">
                12 Credits @ 80-100%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 bg-[#282a2b] rounded-lg border border-[#85888f]/10">
            <div className="w-10 h-10 rounded bg-[#464950] flex items-center justify-center font-headline-md text-xl text-white font-bold flex-shrink-0">
              2
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-xs text-[#e2e2e2] font-bold truncate">
                Grade B+ (3.5)
              </span>
              <span className="font-body-sm text-[11px] text-[#c4c6cf] truncate">
                6 Credits @ 75-79%
              </span>
            </div>
          </div>
        </div>

        {/* Threshold Formula Note Box */}
        <div className="mt-3 p-3 bg-[#1a1c1c] rounded-lg flex items-start gap-2 border border-[#85888f]/10">
          <span className="material-symbols-outlined text-[#c4c6cf] text-[18px] mt-0.5 flex-shrink-0">
            verified
          </span>
          <div className="flex flex-col">
            <span className="font-label-sm text-[10px] text-[#c4c6cf] uppercase font-semibold">
              UCC Senate Statutory Formula
            </span>
            <span className="font-body-sm text-xs text-[#c4c6cf] leading-relaxed mt-0.5">
              Strictly keyed to official University of Cape Coast 4.0 grading regulations:{' '}
              <span className="text-[#e2e2e2]">
                A (80-100%, 4.0), B+ (75-79%, 3.5), B (70-74%, 3.0), C+ (65-69%, 2.5)
              </span>
              . Complete, 100% offline verifiable algebraic projection.
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Semester Scenario Simulator */}
      <div className="flex flex-col bg-[#1e2020] rounded-xl p-4 shadow-md gap-3 border border-[#85888f]/15">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ffb4a8] text-[22px]">tune</span>
            <h2 className="font-title-md text-base text-[#e2e2e2] font-bold">
              Semester Scenario Simulator
            </h2>
          </div>
          <button
            onClick={handleReset}
            className="font-label-sm text-xs text-[#ffb4a8] hover:text-[#e2e2e2] transition-colors uppercase font-bold py-1 px-2.5 rounded bg-[#282a2b] hover:bg-[#333535]"
          >
            Reset
          </button>
        </div>

        <p className="font-body-sm text-xs text-[#c4c6cf]">
          Adjust projected letter grades to evaluate immediate cumulative shifts:
        </p>

        {/* Course List with Select Steppers */}
        <div className="flex flex-col gap-1.5">
          {SIMULATED_COURSES.map((course) => (
            <div
              key={course.code}
              className="flex items-center justify-between p-2.5 bg-[#282a2b] rounded-lg border border-[#85888f]/10"
            >
              <div className="flex flex-col min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-md text-xs text-[#ffb4a8] font-bold">
                    {course.code}
                  </span>
                  <span className="font-label-sm text-[10px] text-[#c4c6cf]">
                    {course.credits} Cr
                  </span>
                </div>
                <span className="font-body-md text-xs sm:text-sm text-[#e2e2e2] font-medium truncate">
                  {course.title}
                </span>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <select
                  value={grades[course.code] ?? 4.0}
                  onChange={(e) => handleGradeChange(course.code, parseFloat(e.target.value))}
                  className="bg-[#0c0f0f] text-[#e2e2e2] font-label-md text-xs px-2.5 py-1.5 rounded-lg font-bold border border-[#85888f]/30 outline-none cursor-pointer focus:border-[#ff5540]"
                >
                  {UCC_GRADE_OPTIONS.map((opt) => (
                    <option key={opt.letter} value={opt.point}>
                      {opt.letter}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Live Recalculated Dynamic Banner */}
        <div className="p-3 bg-[#0c0f0f] rounded-xl flex items-center justify-between border border-[#85888f]/20">
          <div className="flex flex-col">
            <span className="font-label-sm text-[10px] text-[#c4c6cf] uppercase tracking-wide">
              Projected Outcome
            </span>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <span className="font-label-md text-xs text-[#c4c6cf]">Sem GPA:</span>
              <span className="font-label-md text-xs text-[#e2e2e2] font-bold font-mono">
                {semGpa}
              </span>
              <span className="text-[#c4c6cf] text-xs">➜</span>
              <span className="font-label-md text-xs text-[#c4c6cf]">New CGPA:</span>
              <span className="font-label-md text-xs text-[#ffb4a8] font-bold font-mono">
                {newCgpa}
              </span>
            </div>
          </div>
          <div
            className={`px-3 py-1.5 rounded-lg text-white font-label-sm text-xs font-bold tracking-tight ${
              isGainPositive ? 'bg-[#ff5540]' : 'bg-[#464950]'
            }`}
          >
            {gainText}
          </div>
        </div>
      </div>

      {/* Historical Academic Journey Card */}
      <div className="flex flex-col bg-[#1e2020] rounded-xl p-4 shadow-md gap-3 border border-[#85888f]/15">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ffb4a8] text-[22px]">
              history_edu
            </span>
            <h2 className="font-title-md text-base text-[#e2e2e2] font-bold">
              Historical Academic Journey
            </h2>
          </div>
          <span className="font-label-sm text-xs text-[#c4c6cf]">5 Semesters</span>
        </div>

        {/* Trend Line Sparkline (SVG) */}
        <div className="w-full bg-[#1a1c1c] rounded-lg p-3 flex flex-col gap-1 border border-[#85888f]/10">
          <div className="flex justify-between items-center mb-1">
            <span className="font-label-sm text-[10px] text-[#c4c6cf] font-mono">
              GPA PROGRESSION OVER TIME
            </span>
            <span className="font-label-sm text-[10px] text-[#ffb4a8] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              Consistent Climb
            </span>
          </div>

          {/* Historical SVG Trend Chart */}
          <div className="w-full h-32 relative pt-2">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 320 100"
              preserveAspectRatio="none"
            >
              {/* Target 3.60 Guide Line (y = 45) */}
              <line
                x1="0"
                y1="35"
                x2="320"
                y2="35"
                stroke="#ffb4a8"
                strokeOpacity="0.4"
                strokeDasharray="3,3"
                strokeWidth="1"
              />
              <text
                x="320"
                y="31"
                fill="#ffb4a8"
                textAnchor="end"
                className="text-[9px] font-mono"
              >
                Target 3.60
              </text>

              {/* CGPA Progression Trend Line */}
              {/* L100 S1: 3.20 (y=75), L100 S2: 3.35 (y=63), L200 S1: 3.40 (y=60), L200 S2: 3.45 (y=56), L300 S1: dynamic */}
              <path
                d={`M 20,75 L 85,63 L 155,59 L 225,55 L 295,${simulatedLastY}`}
                fill="none"
                stroke="#ff5540"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data Points */}
              <circle cx="20" cy="75" r="4" fill="#e2e2e2" />
              <circle cx="85" cy="63" r="4" fill="#e2e2e2" />
              <circle cx="155" cy="59" r="4" fill="#e2e2e2" />
              <circle cx="225" cy="55" r="4" fill="#e2e2e2" />
              {/* Active L300 point */}
              <circle
                cx="295"
                cy={simulatedLastY}
                r="5"
                fill="#ff5540"
                className="animate-pulse"
              />
              <circle
                cx="295"
                cy={simulatedLastY}
                r="9"
                fill="none"
                stroke="#ff5540"
                strokeOpacity="0.4"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="flex justify-between font-label-sm text-[10px] text-[#c4c6cf] pt-1 border-t border-[#2c2f36]/40">
            <span>L100 S1</span>
            <span>L100 S2</span>
            <span>L200 S1</span>
            <span>L200 S2</span>
            <span className="text-[#ffb4a8] font-bold">L300 S1</span>
          </div>
        </div>

        {/* Structured Academic Ledger Records */}
        <div className="flex flex-col gap-1.5">
          {/* Active record */}
          <div className="flex items-center justify-between p-2.5 bg-[#282a2b] rounded-lg border border-[#ff5540]/30">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-8 rounded-full bg-[#ff5540]"></div>
              <div className="flex flex-col">
                <span className="font-body-md text-xs sm:text-sm text-[#e2e2e2] font-bold">
                  Level 300 - Semester 1
                </span>
                <span className="font-label-sm text-[10px] text-[#ffb4a8]">
                  In Progress • Projected {semGpa}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-label-md text-xs text-[#e2e2e2] font-bold font-mono">
                {newCgpa} CGPA
              </span>
              <span className="font-label-sm text-[10px] text-[#c4c6cf]">18 Cr. registered</span>
            </div>
          </div>

          {/* Previous semesters */}
          {HISTORICAL_SEMESTERS.filter((s) => !s.isCurrent).map((s) => (
            <div
              key={`${s.level}-${s.semester}`}
              className="flex items-center justify-between p-2.5 bg-[#1a1c1c] rounded-lg border border-[#85888f]/10"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-8 rounded-full bg-[#464950]"></div>
                <div className="flex flex-col">
                  <span className="font-body-md text-xs sm:text-sm text-[#e2e2e2] font-medium">
                    {s.level} - {s.semester}
                  </span>
                  <span className="font-label-sm text-[10px] text-[#c4c6cf]">
                    GPA: {s.gpa.toFixed(2)} • {s.credits} Credits
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-label-md text-xs text-[#e2e2e2] font-semibold font-mono">
                  {s.cgpa.toFixed(2)} CGPA
                </span>
                <span className="font-label-sm text-[10px] text-emerald-400 font-medium">
                  Validated
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
