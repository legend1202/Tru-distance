import gantt from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import React, { useRef, useEffect } from 'react';

import { ITempTask } from 'src/types/task';

const sampleTasks: ITempTask[] = [
  {
    id: '1',
    wbsId: 'WBS-001',
    name: 'Project Initiation',
    taskCode: 'T-001',
    description: 'Initiate the project and gather requirements.',
    assignedEvaluators: 'John Doe',
    periodOfPerformance: {
      start: new Date('2024-01-01'),
      end: new Date('2024-02-28'),
    },
    methodOfQuoting: {
      historicalProgramName: 'Initiation Program',
      contractNumber: 'CN-1001',
      periodOfPerformanceMonths: 2,
      totalHours: 200,
    },
    methodology: 'Waterfall',
    hoursDistribution: {
      yearly: 200,
      monthly: [100, 100],
    },
    costDistribution: {
      yearly: 5000,
      monthly: [2500, 2500],
    },
    evaluation: {
      scope: 'Initial project scope definition',
      methodologyReview: 'Reviewed',
      riskComplexity: 'Medium',
      costAnalysis: 'Within budget',
      recommendation: 'Proceed',
      status: 'In Progress',
    },
    createdAt: new Date('2023-12-01'),
    updateAt: new Date('2023-12-05'),
  },
  {
    id: '2',
    wbsId: 'WBS-002',
    name: 'Development Phase 1',
    taskCode: 'T-002',
    description: 'First phase of development, including core features.',
    assignedEvaluators: 'Jane Smith',
    periodOfPerformance: {
      start: new Date('2024-02-01'),
      end: new Date('2024-06-30'),
    },
    methodOfQuoting: {
      historicalProgramName: 'Development Program',
      contractNumber: 'CN-1002',
      periodOfPerformanceMonths: 4,
      totalHours: 800,
    },
    methodology: 'Agile',
    hoursDistribution: {
      yearly: 800,
      monthly: [200, 200, 200, 200],
    },
    costDistribution: {
      yearly: 16000,
      monthly: [4000, 4000, 4000, 4000],
    },
    evaluation: {
      scope: 'Build core functionality',
      methodologyReview: 'Approved',
      riskComplexity: 'High',
      costAnalysis: 'Exceeds budget',
      recommendation: 'Adjust resources',
      status: 'Not Started',
    },
    createdAt: new Date('2023-12-10'),
    updateAt: new Date('2023-12-15'),
  },
  {
    id: '3',
    wbsId: 'WBS-003',
    name: 'Quality Assurance',
    taskCode: 'T-003',
    description: 'Testing and QA for all developed features.',
    assignedEvaluators: 'Alice Brown',
    periodOfPerformance: {
      start: new Date('2024-05-01'),
      end: new Date('2024-08-31'),
    },
    methodOfQuoting: {
      historicalProgramName: 'QA Program',
      contractNumber: 'CN-1003',
      periodOfPerformanceMonths: 2,
      totalHours: 300,
    },
    methodology: 'V-Model',
    hoursDistribution: {
      yearly: 300,
      monthly: [150, 150],
    },
    costDistribution: {
      yearly: 6000,
      monthly: [3000, 3000],
    },
    evaluation: {
      scope: 'Test all features for bugs and issues',
      methodologyReview: 'Pending',
      riskComplexity: 'Low',
      costAnalysis: 'Within budget',
      recommendation: 'Proceed',
      status: 'In Progress',
    },
    createdAt: new Date('2024-01-05'),
    updateAt: new Date('2024-01-10'),
  },
  {
    id: '4',
    wbsId: 'WBS-004',
    name: 'Project Closure',
    taskCode: 'T-004',
    description: 'Finalize project and complete documentation.',
    assignedEvaluators: 'Bob Green',
    periodOfPerformance: {
      start: new Date('2024-09-01'),
      end: new Date('2024-09-30'),
    },
    methodOfQuoting: {
      historicalProgramName: 'Closure Program',
      contractNumber: 'CN-1004',
      periodOfPerformanceMonths: 1,
      totalHours: 100,
    },
    methodology: 'Hybrid',
    hoursDistribution: {
      yearly: 100,
      monthly: [100],
    },
    costDistribution: {
      yearly: 2000,
      monthly: [2000],
    },
    evaluation: {
      scope: 'Wrap up project and final reports',
      methodologyReview: 'Completed',
      riskComplexity: 'Low',
      costAnalysis: 'Within budget',
      recommendation: 'Complete',
      status: 'Completed',
    },
    createdAt: new Date('2024-08-01'),
    updateAt: new Date('2024-08-05'),
  },
  // Additional tasks can be added here...
];

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

/* const GanttWithCurrentTime = () => {
  const ganttContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gantt.config.scale_unit = 'year';
    gantt.config.date_scale = '%Y'; // Shows month and year in the header
    gantt.config.subscales = [
      { unit: 'month' }, // Optional, shows days within each month
    ];
    gantt.config.task_text = '%{name}'; // Set to only show task name in the bar

    // Remove other details from the task display
    gantt.templates.task_text = (start: any, end: any, task: any) => task.name;

    // Initialize gantt only once when the component mounts
    gantt.init(ganttContainerRef.current!);

    // Load data to gantt
    gantt.clearAll();
    gantt.parse({
      data: sampleTasks.map((task) => ({
        id: task.id,
        text: task.name,
        start_date: formatDate(new Date(task.periodOfPerformance.start)),
        end_date: formatDate(new Date(task.periodOfPerformance.end)),
        progress: 0.5, // Set progress as required
      })),
    });

    // Cleanup on component unmount
    return () => {
      gantt.clearAll();
    };
  }, [sampleTasks]);

  return <div ref={ganttContainerRef} style={{ width: '100%', height: '600px' }} />;
}; */
const GanttWithCurrentTime = () => {
  const ganttContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gantt.config.scale_unit = 'month';
    gantt.config.date_scale = '%m'; // Displays only month and year in the header
    gantt.config.subscales = []; // Remove subscale for days

    // Configure columns to show Task name, Total hours, and Total costs
    gantt.config.columns = [
      { name: 'text', label: 'Task Name', width: '*', tree: true },
      { name: 'total_hours', label: 'Hours', width: 80, align: 'center' },
      { name: 'total_costs', label: 'Costs', width: 100, align: 'center' },
    ];

    // Add total hours and total costs as properties on each task for display
    gantt.attachEvent('onTaskLoading', (task: any) => {
      const taskData = sampleTasks.find((t) => t.id === task.id);
      if (taskData) {
        task.total_hours = taskData.methodOfQuoting.totalHours;
        task.total_costs = taskData.costDistribution.yearly;
      }
      return true;
    });

    // Show only task name in the Gantt chart bar
    gantt.templates.task_text = (start: any, end: any, task: any) => task.text;

    // Initialize gantt
    gantt.init(ganttContainerRef.current!);

    // Load data into gantt
    gantt.clearAll();
    gantt.parse({
      data: sampleTasks.map((task) => ({
        id: task.id,
        text: task.name,
        start_date: formatDate(new Date(task.periodOfPerformance.start)),
        end_date: formatDate(new Date(task.periodOfPerformance.end)),
        progress: 0.5, // Adjust progress as needed
      })),
    });

    // Cleanup on component unmount
    return () => {
      gantt.clearAll();
    };
  }, []);

  return <div ref={ganttContainerRef} style={{ width: '100%', height: '400px' }} />;
};
export default GanttWithCurrentTime;
