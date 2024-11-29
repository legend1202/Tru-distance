import * as Yup from 'yup';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Typography } from '@mui/material';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

import { IFactorJustification } from 'src/types/flowData';

type Props = {
  data: IFactorJustification;
  optionIndex?: number;
  setCurrentWorkflowPosition?: (pos: number[]) => void;
  handleCurrentStatus?: (status: number, statusFlag: boolean) => void;
};
const IFactorJustificationGroup = ({
  data,
  optionIndex,
  setCurrentWorkflowPosition,
  handleCurrentStatus,
}: Props) => {
  const NewDescriptionSchema = Yup.object().shape({
    complexity: Yup.string(),
    risk: Yup.string(),
    curve: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      complexity: data.complexity || '',
      risk: data.risk || '',
      curve: data.curve || '',
    }),
    [data]
  );

  const methods = useForm({
    resolver: yupResolver(NewDescriptionSchema),
    defaultValues,
  });

  //   const { watch, setValue } = methods;

  //   const values = watch();

  return (
    <FormProvider methods={methods}>
      <Typography>Complexity Factor Justification: (Q2.1)</Typography>
      <RHFTextField
        sx={{
          py: 2,
        }}
        name="complexity"
        multiline
        rows={2}
      />
      <Typography>Risk Factor Justification: (Q2.2)</Typography>
      <RHFTextField
        sx={{
          py: 2,
        }}
        name="risk"
        multiline
        rows={2}
      />
      <Typography>Learning Curve Factor Justification: (Q2.3)</Typography>
      <RHFTextField
        sx={{
          py: 2,
        }}
        name="curve"
        multiline
        rows={2}
      />
    </FormProvider>
  );
};

export default IFactorJustificationGroup;
