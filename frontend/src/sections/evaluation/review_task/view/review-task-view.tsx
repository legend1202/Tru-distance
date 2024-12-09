import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Container } from '@mui/system';
import { Card, MenuItem } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useGetProposalLists } from 'src/api/proposal';
import { useGetEvaluationDataByEvaluator } from 'src/api/evaluation';

import { useSettingsContext } from 'src/components/settings';
import FormProvider, { RHFSelect } from 'src/components/hook-form';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { IEvaluationData } from 'src/types/gantt';

import ScrolUILeftItem from '../scroll-ui-left-item';
import ScrolUIRightItem from '../scroll-ui-right-item';

export default function ReviewTaskView() {
  const settings = useSettingsContext();

  const { proposalList } = useGetProposalLists();

  const [proposalId, setProposalId] = useState<string>('');

  const [wbsId, setWbsId] = useState<string>('');

  const { dataList } = useGetEvaluationDataByEvaluator(proposalId);

  const [assignedTasks, setAssignedTasks] = useState<IEvaluationData[]>([]);

  const ProposalSchema = Yup.object().shape({
    proposalId: Yup.string().required('Wbs is required'),
  });

  const defaultValues = useMemo(
    () => ({
      proposalId: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(ProposalSchema),
    defaultValues,
  });

  const { watch, setValue } = methods;

  const values = watch();

  useEffect(() => {
    if (proposalList.length > 0) {
      setValue('proposalId', proposalList[0].id);
    }
  }, [proposalList, setValue]);

  useEffect(() => {
    if (values.proposalId) {
      setProposalId(values.proposalId);
    }
  }, [values.proposalId]);

  useEffect(() => {
    if (dataList.length > 0) {
      setWbsId(dataList[0].id);
    }
  }, [dataList]);

  useEffect(() => {
    if (proposalId && wbsId) {
      const filteredData = dataList.filter(
        (wbs) => wbs.proposalId === proposalId && wbs.id === wbsId
      );
      setAssignedTasks(filteredData[0].tasks);
    }
  }, [proposalId, wbsId, dataList]);

  const handleSelectedWbsId = (id: string) => {
    setWbsId(id);
  };

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
        heading="Review Task"
        links={[{ name: 'Review', href: paths.evalation.tasks }, { name: 'Tasks' }]}
        action={
          <FormProvider methods={methods}>
            <RHFSelect
              name="proposalId"
              label="Proposal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              PaperPropsSx={{ textTransform: 'capitalize' }}
              sx={{ minWidth: 140 }}
            >
              {proposalList &&
                proposalList.map((proposal) => (
                  <MenuItem key={proposal.id} value={proposal.id}>
                    {proposal.proposalName}
                  </MenuItem>
                ))}
            </RHFSelect>
          </FormProvider>
        }
        sx={{
          mb: {
            xs: 3,
            md: 5,
          },
        }}
      />
      <Card
        sx={{
          height: { sx: '80vh' },

          flexGrow: { md: 1 },
          display: 'flex',
          flexDirection: { md: 'row' },
          justifyContent: 'space-between',
          bgcolor: 'background.default',
        }}
      >
        <ScrolUILeftItem
          data={dataList}
          selectedWbsId={wbsId}
          handleSelectedWbsId={handleSelectedWbsId}
        />

        <ScrolUIRightItem data={assignedTasks} wbsId={wbsId} />
      </Card>
    </Container>
  );
}
