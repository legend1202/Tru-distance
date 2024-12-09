import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import React, { useMemo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Typography } from '@mui/material';

import { fMonth } from 'src/utils/format-time';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

import { IFlowDataTask, IPeriodOfPerformance } from 'src/types/flowData';

type Props = {
  periodOfPerformance: IPeriodOfPerformance;
  task: IFlowDataTask;
  handleSetPopDistribution: (data: IPeriodOfPerformance) => void;
};
const PopGroup = ({ periodOfPerformance, task, handleSetPopDistribution }: Props) => {
  const NewDescriptionSchema = Yup.object().shape({
    start: Yup.string(),
    end: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      start: periodOfPerformance.start
        ? new Date(periodOfPerformance.start).toISOString().slice(0, 7)
        : new Date(task.periodOfPerformance.start).toISOString().slice(0, 7),
      end: periodOfPerformance.end
        ? new Date(periodOfPerformance.end).toISOString().slice(0, 7)
        : new Date(task.periodOfPerformance.end).toISOString().slice(0, 7),
    }),
    [periodOfPerformance, task]
  );

  const methods = useForm({
    resolver: yupResolver(NewDescriptionSchema),
    defaultValues,
  });

  const { watch } = methods;

  const values = watch();

  useEffect(() => {
    const popdata = {
      start: values.start || '',
      end: values.end || '',
    };
    handleSetPopDistribution(popdata);
  }, [handleSetPopDistribution, values.end, values.start]);

  return (
    <FormProvider methods={methods}>
      <Box gap={3} display="flex" justifyContent="space-between">
        <Typography
          sx={{
            py: 4,
            width: 200,
          }}
        >
          Prop.
        </Typography>
        <Typography
          sx={{
            py: 4,
            width: 400,
          }}
        >
          {fMonth(task.periodOfPerformance.start) || ''}
        </Typography>
        <Typography
          sx={{
            py: 4,
            width: 400,
          }}
        >
          {fMonth(task.periodOfPerformance.end) || ''}
        </Typography>
      </Box>
      <Box gap={3} display="flex" justifyContent="space-between">
        <Typography
          sx={{
            py: 4,
            width: 150,
          }}
        >
          Rec.
        </Typography>
        <RHFTextField
          sx={{
            py: 2,
            width: 400,
          }}
          name="start"
          type="month"
        />
        <RHFTextField
          sx={{
            py: 2,
            width: 400,
          }}
          name="end"
          type="month"
        />
      </Box>
    </FormProvider>
  );
};

export default PopGroup;
