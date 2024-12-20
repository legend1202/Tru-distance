import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import React, { useMemo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Typography } from '@mui/material';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

import { ITask } from 'src/types/task';

type Props = {
  recommendHours: number;
  task: ITask;
  handleSetRecommendHours: (data: number) => void;
};
const RecommendHourItem = ({ recommendHours, task, handleSetRecommendHours }: Props) => {
  const NewDescriptionSchema = Yup.object().shape({
    recommendHours: Yup.number(),
  });

  const defaultValues = useMemo(
    () => ({
      recommendHours: recommendHours || 0,
    }),
    [recommendHours]
  );

  const methods = useForm({
    resolver: yupResolver(NewDescriptionSchema),
    defaultValues,
  });

  const { watch } = methods;

  const values = watch();

  useEffect(() => {
    handleSetRecommendHours(values.recommendHours || 0);
  }, [handleSetRecommendHours, values]);

  return (
    <FormProvider methods={methods}>
      <Box gap={3} display="flex" justifyContent="space-between">
        <Typography
          sx={{
            width: 600,
          }}
        >
          Task
        </Typography>
        <Typography>Est.Hrs</Typography>
        <Typography
          sx={{
            width: 300,
          }}
        >
          Rec.Hrs
        </Typography>
      </Box>
      <Box gap={3} display="flex" justifyContent="space-between">
        <Typography
          sx={{
            py: 4,
            width: 600,
          }}
        >
          {task.name}
        </Typography>
        <Typography
          sx={{
            py: 4,
          }}
        >
          {task.hours || 0}
        </Typography>
        <RHFTextField
          sx={{
            py: 2,
            width: 240,
          }}
          name="recommendHours"
        />
      </Box>
    </FormProvider>
  );
};

export default RecommendHourItem;
