import { useMemo, useState, useEffect } from 'react';

import { Card } from '@mui/material';
import { Container } from '@mui/system';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { flowData } from 'src/utils/evaluation-flow';

import { useAuthContext } from 'src/auth/hooks';
import { useGetApprovedTaskByWbsId } from 'src/api/approve';
import { UpdateFlowData, useGetFlowDataByTask } from 'src/api/evaluation';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { IEvaluationData } from 'src/types/gantt';
import { IflowDataItem, IflowDataItemChild } from 'src/types/flowData';

import Footer from './common/footer';
import ScrolUILeftItem from './common/scroll-ui-left-item';
import ScrolUIRightItem from './common/scroll-ui-right-item';

type Props = {
  wbsId: string;
  taskId: string;
  subTaskIndex: number;
};

export default function EvaluationQuestionFlowView({ wbsId, taskId, subTaskIndex }: Props) {
  // const settings = useSettingsContext();

  const router = useRouter();

  const [flowDataId, setFlowDataId] = useState<string>('');

  const [currenFlowPosition, setCurrentFlowPosition] = useState<number[]>([0, 0]);

  const [totalFlowData, setTotalFlowData] = useState<IflowDataItem[] | any>();

  const [currentFlowData, setCurrentFlowData] = useState<IflowDataItemChild | any>();

  const [currentWorkFlowHeader, setCurrentWorkFlowheader] = useState<string>('');

  const [scrollStatus, setScrollStatus] = useState<boolean>(false);

  const { user } = useAuthContext();

  const [wbsTitle, setWbsTitle] = useState('');

  const [tasks, setTasks] = useState<IEvaluationData[]>([]);

  const [currentTask, setCurrentTask] = useState<IEvaluationData>();

  const { approvedData } = useGetApprovedTaskByWbsId(wbsId);

  const { taskFlowData } = useGetFlowDataByTask(wbsId, taskId, subTaskIndex);

  // task data from api
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

  useMemo(() => {
    if (taskFlowData?.flowData?.length > 0) {
      setFlowDataId(taskFlowData.id || '');
      setTotalFlowData(taskFlowData.flowData);
      // eslint-disable-next-line no-bitwise
    } else if (wbsId || taskId) {
      setTotalFlowData([]);
      setTotalFlowData(flowData);
    }
  }, [taskFlowData, wbsId, taskId]);

  // workflow data from static
  useMemo(() => {
    if (currenFlowPosition.length > 0 && totalFlowData?.length > 0) {
      const flowdata = totalFlowData[currenFlowPosition[0]].children[currenFlowPosition[1]];

      if (flowdata) {
        setCurrentWorkFlowheader(totalFlowData[currenFlowPosition[0]].title || '');
        setCurrentFlowData(flowdata);
      }
      if (currenFlowPosition[0] === 1) {
        setScrollStatus(true);
      } else {
        setScrollStatus(false);
      }
    }
  }, [totalFlowData, currenFlowPosition]);

  // set workflow position
  const handleSetCurrentWorkflowPosition = async (pos: number[]) => {
    const updatedFlowData = await UpdateFlowData({
      id: flowDataId,
      wbsId,
      taskId,
      subTaskIndex,
      flowData: totalFlowData,
    });

    if (updatedFlowData.data.id) {
      setFlowDataId(updatedFlowData.data.id);
    }

    if (pos[0] === 100 && pos[1] === 100) {
      setCurrentFlowPosition(pos);
      router.push(paths.evalation.tasks);
    } else {
      setCurrentFlowPosition(pos);
    }
  };

  const handleWorkflowPosition = (nextStep: boolean) => {
    if (nextStep) {
      handleSetCurrentWorkflowPosition(currentFlowData.next);
    } else {
      handleSetCurrentWorkflowPosition(currentFlowData.prev);
    }
  };

  const handleCurrentStatus = (status: number, statusFlag: boolean) => {
    const tempFlowData = totalFlowData;
    if (statusFlag) {
      tempFlowData[currenFlowPosition[0]].children[currenFlowPosition[1]].status1 = status;
    } else {
      tempFlowData[currenFlowPosition[0]].children[currenFlowPosition[1]].status2 = status;
    }
    setTotalFlowData(tempFlowData);
  };

  return (
    <Container
      // maxWidth={settings.themeStretch ? false : 'lg'}
      maxWidth={false}
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CustomBreadcrumbs
        heading={currentWorkFlowHeader}
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
          height: { xs: '70vh' },

          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'row' },
          justifyContent: 'space-between',
          bgcolor: 'background.default',
        }}
      >
        <ScrolUILeftItem
          data={currentFlowData}
          scrollStatus={scrollStatus}
          setCurrentWorkflowPosition={handleSetCurrentWorkflowPosition}
          handleCurrentStatus={handleCurrentStatus}
        />

        <ScrolUIRightItem data={currentFlowData} scrollStatus={scrollStatus} />
      </Card>
      <Footer handleWorkflowPosition={handleWorkflowPosition} />
    </Container>
  );
}
