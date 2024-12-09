import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import React, { useMemo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Typography } from '@mui/material';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

import { IFactor } from 'src/types/flowData';

type Props = {
  data: IFactor;
  optionIndex?: number;
  setCurrentWorkflowPosition?: (pos: number[]) => void;
  handleCurrentStatus?: (status: number, statusFlag: boolean) => void;
  handleSetFactor: (data: IFactor) => void;
};
const FactorGroup = ({
  data,
  optionIndex,
  setCurrentWorkflowPosition,
  handleCurrentStatus,
  handleSetFactor,
}: Props) => {
  const NewDescriptionSchema = Yup.object().shape({
    complexityValue: Yup.string(),
    complexityConcur: Yup.string(),
    complexityNonConcur: Yup.string(),

    riskValue: Yup.string(),
    riskConcur: Yup.string(),
    riskNonConcur: Yup.string(),

    curveValue: Yup.string(),
    curveConcur: Yup.string(),
    curveNonConcur: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      complexityValue: data.complexityValue || '',
      complexityConcur: data.complexityConcur || '',
      complexityNonConcur: data.complexityNonConcur || '',

      riskValue: data.riskValue || '',
      riskConcur: data.riskConcur || '',
      riskNonConcur: data.riskNonConcur || '',

      curveValue: data.curveValue || '',
      curveConcur: data.curveConcur || '',
      curveNonConcur: data.curveNonConcur || '',
    }),
    [data]
  );

  const methods = useForm({
    resolver: yupResolver(NewDescriptionSchema),
    defaultValues,
  });

  const { watch } = methods;

  const values = watch();

  useEffect(() => {
    const factor: IFactor = {
      complexityValue: values.complexityValue || '',
      complexityConcur: values.complexityConcur || '',
      complexityNonConcur: values.complexityNonConcur || '',
      riskValue: values.riskValue || '',
      riskConcur: values.riskConcur || '',
      riskNonConcur: values.riskNonConcur || '',
      curveValue: values.curveValue || '',
      curveConcur: values.curveConcur || '',
      curveNonConcur: values.curveNonConcur || '',
    };
    handleSetFactor(factor);
  }, [handleSetFactor, values]);

  console.log('factor');

  return (
    <FormProvider methods={methods}>
      <Box gap={3} display="flex" justifyContent="space-between">
        <Typography
          sx={{
            width: 100,
          }}
        >
          Factors
        </Typography>
        <Typography>Value</Typography>
        <Typography>Concur</Typography>
        <Typography>Non-Concur</Typography>
      </Box>
      <Box gap={3} display="flex" justifyContent="space-between">
        <Typography
          sx={{
            py: 4,
            width: 600,
          }}
        >
          Complexity
        </Typography>
        <RHFTextField
          sx={{
            py: 2,
          }}
          name="complexityValue"
        />
        <RHFTextField
          sx={{
            py: 2,
          }}
          name="complexityConcur"
        />
        <RHFTextField
          sx={{
            py: 2,
          }}
          name="complexityNonConcur"
        />
      </Box>
      <Box gap={3} display="flex" justifyContent="space-between">
        <Typography
          sx={{
            py: 4,
            width: 600,
          }}
        >
          Risk
        </Typography>
        <RHFTextField
          sx={{
            py: 2,
          }}
          name="riskValue"
        />
        <RHFTextField
          sx={{
            py: 2,
          }}
          name="riskConcur"
        />
        <RHFTextField
          sx={{
            py: 2,
          }}
          name="riskNonConcur"
        />
      </Box>
      <Box gap={3} display="flex" justifyContent="space-between">
        <Typography
          sx={{
            py: 4,
            width: 600,
          }}
        >
          Learning Curve
        </Typography>
        <RHFTextField
          sx={{
            py: 2,
          }}
          name="curveValue"
        />
        <RHFTextField
          sx={{
            py: 2,
          }}
          name="curveConcur"
        />
        <RHFTextField
          sx={{
            py: 2,
          }}
          name="curveNonConcur"
        />
      </Box>
    </FormProvider>
  );
};

export default FactorGroup;
