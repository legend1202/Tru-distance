import { useState, useEffect } from 'react';

import { Card } from '@mui/material';
import { Container } from '@mui/system';

import { useAuthContext } from 'src/auth/hooks';
import { useGetApprovedTaskByWbsId } from 'src/api/approve';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { IEvaluationData } from 'src/types/gantt';

import Footer from '../footer';
import ScrolUILeftItem from '../scroll-ui-left-item';
import ScrolUIRightItem from '../scroll-ui-right-item';

const text1 = 'text1';
const text2 = 'text2';
const text3 = 'text3';
const text4 = 'text4';

type Props = {
  wbsId: string;
  taskId: string;
  subTaskIndex: number;
};

export default function EvaluationQuestionFlowScopeSectionView({
  wbsId,
  taskId,
  subTaskIndex,
}: Props) {
  const settings = useSettingsContext();

  const { user } = useAuthContext();

  const [wbsTitle, setWbsTitle] = useState('');

  const [tasks, setTasks] = useState<IEvaluationData[]>([]);

  const [currentTask, setCurrentTask] = useState<IEvaluationData>();

  const { approvedData } = useGetApprovedTaskByWbsId(wbsId);
  useEffect(() => {
    if (approvedData?.length > 0) {
      const filteredData: IEvaluationData[] = approvedData
        .map((task) => {
          // Filter subtasks if they have the userId
          const filteredSubtasks = task.subtasks.filter((subtask) =>
            subtask.assignedUsers.includes(user?.userId)
          );

          // Include task only if it has the userId or there are relevant subtasks
          if (task.assignedUsers.includes(user?.userId) || filteredSubtasks.length > 0) {
            return {
              ...task,
              subtasks: filteredSubtasks, // Include only the filtered subtasks
            };
          }

          return null; // Return null for tasks that don't match the criteria
        })
        .filter((task) => task !== null) as IEvaluationData[]; // Type-cast to ensure correct type

      if (filteredData.length > 0) {
        setWbsTitle(filteredData[0]?.wbsDetails[0].wbsTitle);
        setTasks(filteredData);
        setCurrentTask(filteredData[0]);
      }
    }
  }, [approvedData, user?.userId]);

  console.log(tasks);

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CustomBreadcrumbs
        heading="Section 4.1: Scope Sectione"
        links={[{ name: wbsTitle }, { name: currentTask?.name }]}
        sx={{
          mb: {
            xs: 3,
            md: 5,
          },
        }}
      />
      <Card
        sx={{
          height: { xs: '80vh' },

          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'row' },
          justifyContent: 'space-between',
          bgcolor: 'background.default',
        }}
      >
        <ScrolUILeftItem text1={text1} text2={text2} />

        <ScrolUIRightItem text1={text3} text2={text4} />
      </Card>
      <Footer />
    </Container>
  );
}
