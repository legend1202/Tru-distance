import { useRef, useMemo, useState, useEffect } from 'react';

import { Card } from '@mui/material';
import { Container } from '@mui/system';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { isLeadFn } from 'src/utils/role-check';
import { flowData } from 'src/utils/evaluation-flow';

import { useAuthContext } from 'src/auth/hooks';
import { useGetApprovedTaskByWbsId } from 'src/api/approve';
import { UpdateFlowData, useGetFlowDataByTask } from 'src/api/evaluation';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { ITask } from 'src/types/task';
import {
  IFactor,
  IflowDataItem,
  IflowDataItemChild,
  IFactorJustification,
  IPeriodOfPerformance,
} from 'src/types/flowData';

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

  const { user } = useAuthContext();

  const [flowDataId, setFlowDataId] = useState<string>('');

  const [currenFlowPosition, setCurrentFlowPosition] = useState<number[]>([0, 0]);

  const [totalFlowData, setTotalFlowData] = useState<IflowDataItem[] | any>();

  const [currentFlowData, setCurrentFlowData] = useState<IflowDataItemChild | any>();

  const [currentWorkFlowHeader, setCurrentWorkFlowheader] = useState<string>('');

  const [scrollStatus, setScrollStatus] = useState<boolean>(false);

  const [wbsTitle, setWbsTitle] = useState('');

  const [currentTask, setCurrentTask] = useState<ITask>();

  const { approvedData } = useGetApprovedTaskByWbsId(wbsId);

  const { taskFlowData } = useGetFlowDataByTask(wbsId, taskId, subTaskIndex);

  const [description1, setDescription1] = useState<string>();
  const [description3, setDescription3] = useState<string>();
  const [description2, setDescription2] = useState<string>();
  const [description4, setDescription4] = useState<string>();

  const [factor, setFactor] = useState<IFactor>();
  const [factorJustification, setFactorJustification] = useState<IFactorJustification>();

  const [recommendHours, setRecommendHours] = useState<number>();

  const popDistributionRef = useRef<IPeriodOfPerformance>();

  // task data from api
  useEffect(() => {
    if (approvedData?.length > 0) {
      const filteredData = approvedData.filter(
        (task) => task.wbsId === wbsId && task.id === taskId
      );

      if (
        filteredData.length > 0 &&
        filteredData[0]?.wbsDetails &&
        filteredData[0]?.wbsDetails.length > 0
      ) {
        setWbsTitle(filteredData[0].wbsDetails[0].wbsTitle);
      }

      if (subTaskIndex) {
        setCurrentTask(filteredData[0].subtasks[subTaskIndex]);
      } else {
        setCurrentTask(filteredData[0]);
      }
    }
  }, [approvedData, subTaskIndex, taskId, wbsId]);

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
    await handleSaveCurrentData();
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
      const isLead = isLeadFn(user?.role);
      if (isLead) {
        router.push(paths.approval_workflow.task_review);
      } else {
        router.push(paths.evalation.tasks);
      }
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

  const handleSetDescription1 = (description: string) => {
    setDescription1(description);
  };

  const handleSetDescription3 = (description: string) => {
    setDescription3(description);
  };

  const handleSetDescription2 = (description: string) => {
    setDescription2(description);
  };

  const handleSetDescription4 = (description: string) => {
    setDescription4(description);
  };

  const handleSetFactor = (data: IFactor) => {
    setFactor(data);
  };

  const handleSetFactorJustification = (data: IFactorJustification) => {
    setFactorJustification(data);
  };

  const handleSetRecommendHours = (data: number) => {
    setRecommendHours(data);
  };

  const handleSetPopDistribution = (data: IPeriodOfPerformance) => {
    popDistributionRef.current = data;
  };

  const handleSaveCurrentData = () => {
    const tempFlowData = totalFlowData;
    if (tempFlowData[currenFlowPosition[0]].children[currenFlowPosition[1]]?.description1) {
      tempFlowData[currenFlowPosition[0]].children[currenFlowPosition[1]].description1 =
        description1;
    }
    if (tempFlowData[currenFlowPosition[0]].children[currenFlowPosition[1]]?.description3) {
      tempFlowData[currenFlowPosition[0]].children[currenFlowPosition[1]].description3 =
        description3;
    }
    if (tempFlowData[currenFlowPosition[0]].children[currenFlowPosition[1]]?.description2) {
      tempFlowData[currenFlowPosition[0]].children[currenFlowPosition[1]].description2 =
        description2;
    }
    if (tempFlowData[currenFlowPosition[0]].children[currenFlowPosition[1]]?.description4) {
      tempFlowData[currenFlowPosition[0]].children[currenFlowPosition[1]].description4 =
        description4;
    }

    if (tempFlowData[currenFlowPosition[0]].children[currenFlowPosition[1]]?.factor) {
      tempFlowData[currenFlowPosition[0]].children[currenFlowPosition[1]].factor = factor;
    }

    if (tempFlowData[currenFlowPosition[0]].children[currenFlowPosition[1]]?.factorJustification) {
      tempFlowData[currenFlowPosition[0]].children[currenFlowPosition[1]].factorJustification =
        factorJustification;
    }

    if (tempFlowData[currenFlowPosition[0]].children[currenFlowPosition[1]]?.hours >= 0) {
      tempFlowData[currenFlowPosition[0]].children[currenFlowPosition[1]].hours = recommendHours;
    }

    if (tempFlowData[currenFlowPosition[0]].children[currenFlowPosition[1]]?.periodOfPerformance) {
      tempFlowData[currenFlowPosition[0]].children[currenFlowPosition[1]].periodOfPerformance =
        popDistributionRef.current;
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
          task={currentTask}
          scrollStatus={scrollStatus}
          setCurrentWorkflowPosition={handleSetCurrentWorkflowPosition}
          handleCurrentStatus={handleCurrentStatus}
          handleSetDescription1={handleSetDescription1}
          handleSetDescription3={handleSetDescription3}
          handleSetFactor={handleSetFactor}
          handleSetRecommendHours={handleSetRecommendHours}
          handleSetPopDistribution={handleSetPopDistribution}
        />

        <ScrolUIRightItem
          data={currentFlowData}
          scrollStatus={scrollStatus}
          handleSetDescription2={handleSetDescription2}
          handleSetDescription4={handleSetDescription4}
          handleSetFactorJustification={handleSetFactorJustification}
        />
      </Card>
      <Footer handleWorkflowPosition={handleWorkflowPosition} />
    </Container>
  );
}
