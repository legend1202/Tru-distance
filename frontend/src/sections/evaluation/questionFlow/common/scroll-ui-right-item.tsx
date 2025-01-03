import * as Yup from 'yup';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { useResizable } from 'react-resizable-layout';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import {
  Card,
  Button,
  Checkbox,
  useTheme,
  Typography,
  ButtonGroup,
  CardContent,
} from '@mui/material';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

import { IflowDataItemChild, IFactorJustification } from 'src/types/flowData';

import SimpleSplitter from './simple-spliter';
import IFactorJustificationGroup from '../component/factor-justification-group';

const SecondButtonGroupContainer = styled('div')({
  position: 'absolute',
  top: '25%',
  left: '-5.5%',
});

const ForthButtonGroupContainer = styled('div')({
  position: 'absolute',
  top: '55%',
  left: '-5.5%',
});

const CustomButton = styled(Button)({
  p: '0px',
  fontSize: '12px',
  width: '56px',
});

type Props = {
  data: IflowDataItemChild;
  scrollStatus: boolean;
  handleSetDescription2: (description: string) => void;
  handleSetDescription4: (description: string) => void;
  handleSetFactorJustification: (data: IFactorJustification) => void;
};

const ScrolUIRightItem = ({
  data,
  scrollStatus,
  handleSetDescription2,
  handleSetDescription4,
  handleSetFactorJustification,
}: Props) => {
  const [checkbox1, setCheckbox1] = useState<boolean>(false);
  const [checkbox2, setCheckbox2] = useState<boolean>(false);

  const theme = useTheme();
  const {
    isDragging: isTerminalDragging,
    position: terminalH,
    splitterProps: terminalDragBarProps,
  } = useResizable({
    axis: 'y',
    initial: 250,
    min: 0,
    reverse: true,
  });

  const NewDescriptionSchema = Yup.object().shape({
    description2: Yup.string(),
    description4: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      description2: data.description2 || '',
      description4: data.description4 || '',
    }),
    [data]
  );

  const methods = useForm({
    resolver: yupResolver(NewDescriptionSchema),
    defaultValues,
  });

  const { watch, setValue } = methods;

  const values = watch();

  useEffect(() => {
    if (data.description2) {
      setValue('description2', data.description2);
    } else {
      setValue('description2', '');
    }
    if (data.description4) {
      setValue('description4', data.description4);
    } else {
      setValue('description4', '');
    }
  }, [data, setValue]);

  useEffect(() => {
    handleSetDescription2(values.description2 || '');
  }, [handleSetDescription2, values.description2]);

  useEffect(() => {
    handleSetDescription4(values.description4 || '');
  }, [handleSetDescription4, values.description4]);

  const handleClickCheckbox1 = () => {
    setCheckbox1(true);
    setCheckbox2(false);
  };

  const handleClickCheckbox2 = () => {
    setCheckbox2(true);
    setCheckbox1(false);
  };

  return (
    <Box
      sx={{
        width: '48%',
        position: 'relative',
      }}
    >
      <Box
        display="grid"
        gridTemplateRows="1fr auto"
        height="70vh"
        bgcolor="#333"
        color="white"
        fontFamily="monospace"
        overflow="hidden"
        sx={{
          p: 2,
          borderRight: `solid 1px ${theme.palette.divider}`,
          transition: theme.transitions.create(['width'], {
            duration: theme.transitions.duration.shorter,
          }),
        }}
      >
        <Box overflow="hidden">
          <Card
            sx={{
              position: 'relative',
            }}
          >
            {/* <CardHeader title={data.intro} /> */}
            <CardContent>{data.question2}</CardContent>
            {data.yes2?.length ? (
              <Typography
                sx={{
                  position: 'absolute',
                  right: 8,
                  bottom: 16,
                }}
              >
                <Checkbox checked={checkbox1} onChange={() => handleClickCheckbox1()} />
                <Checkbox checked={checkbox2} onChange={() => handleClickCheckbox2()} />
              </Typography>
            ) : (
              ''
            )}
          </Card>
          <Card
            sx={{
              mt: 2,
            }}
          >
            <CardContent>
              {data.description2 && (
                <FormProvider methods={methods}>
                  <RHFTextField
                    name="description2"
                    label=""
                    multiline
                    rows={18}
                    // disabled
                  />
                </FormProvider>
              )}
              {data.factorJustification && (
                <IFactorJustificationGroup
                  data={data.factorJustification}
                  handleSetFactorJustification={handleSetFactorJustification}
                />
              )}
            </CardContent>
          </Card>
        </Box>

        <SimpleSplitter isDragging={isTerminalDragging} {...terminalDragBarProps} />
        {data.description4 && (
          <Box height={terminalH - 100} overflow="hidden">
            <Card>
              <CardContent>
                <FormProvider methods={methods}>
                  <RHFTextField
                    name="description4"
                    label=""
                    multiline
                    rows={18}
                    // disabled
                  />
                </FormProvider>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
      {scrollStatus && !data.factor && (
        <>
          <SecondButtonGroupContainer>
            <ButtonGroup variant="contained" orientation="vertical">
              <CustomButton>SOW</CustomButton>
              <CustomButton>BOE</CustomButton>
              <CustomButton>Hours</CustomButton>
              <CustomButton>Material</CustomButton>
              <CustomButton>Travel</CustomButton>
            </ButtonGroup>
          </SecondButtonGroupContainer>
          <ForthButtonGroupContainer>
            <ButtonGroup variant="contained" orientation="vertical">
              <CustomButton>SOW</CustomButton>
              <CustomButton>BOE</CustomButton>
              <CustomButton>Hours</CustomButton>
              <CustomButton>Material</CustomButton>
              <CustomButton>Travel</CustomButton>
            </ButtonGroup>
          </ForthButtonGroupContainer>
        </>
      )}
    </Box>
  );
};

export default ScrolUIRightItem;
