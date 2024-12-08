import * as Yup from 'yup';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useResizable } from 'react-resizable-layout';

import Box from '@mui/material/Box';
import {
  Card,
  Button,
  useTheme,
  Checkbox,
  CardHeader,
  Typography,
  ButtonGroup,
  CardContent,
} from '@mui/material';

import Label from 'src/components/label';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import { IflowDataItemChild } from 'src/types/flowData';

import SimpleSplitter from './simple-spliter';
import FactorGroup from '../component/factor-group';
import MoveOptionGroup from '../component/move-option-item';
import SelectOptionGroup from '../component/select-option-item';

const FirstButtonGroupContainer = styled('div')({
  position: 'absolute',
  top: '25%',
  right: '-4.5%',
});

const CustomButton = styled(Button)({
  p: '0px',
  fontSize: '12px',
  width: '56px',
});

const ThirdButtonGroupContainer = styled('div')({
  position: 'absolute',
  top: '55%',
  right: '-4.5%',
});

type Props = {
  data: IflowDataItemChild;
  scrollStatus: boolean;
  setCurrentWorkflowPosition: (pos: number[]) => void;
  handleCurrentStatus: (status: number, statusFlag: boolean) => void;
};

const ScrolUILeftItem = ({
  data,
  scrollStatus,
  setCurrentWorkflowPosition,
  handleCurrentStatus,
}: Props) => {
  const [checkbox1, setCheckbox1] = useState<boolean>(data?.status1 === 1);
  const [checkbox2, setCheckbox2] = useState<boolean>(data?.status1 === 1);
  const [optionIndex, setOptionIndex] = useState<number>(data?.status1 || 0);

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
    description1: Yup.string(),
    description3: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      description1: data.description1 || '',
      description3: data.description3 || '',
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
    if (data?.status1 !== 1) {
      setCheckbox1(false);
    } else {
      setCheckbox1(true);
    }
    if (data?.status2 !== 1) {
      setCheckbox2(false);
    } else {
      setCheckbox2(true);
    }
    if (data?.status1) {
      setOptionIndex(data.status1);
    }
    if (data.description1) {
      setValue('description1', data.description1);
    } else {
      setValue('description1', '');
    }
    if (data.description3) {
      setValue('description3', data.description3);
    } else {
      setValue('description3', '');
    }
  }, [data, setValue]);

  const handleClickCheckbox1 = () => {
    setCheckbox1(true);
    setCheckbox2(false);
    handleCurrentStatus(1, true);
    setCurrentWorkflowPosition(data.yes1 || [0, 0]);
  };

  const handleClickCheckbox2 = () => {
    setCheckbox2(true);
    setCheckbox1(false);
    handleCurrentStatus(2, true);
    setCurrentWorkflowPosition(data.no1 || [0, 0]);
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
            <CardHeader title={data.intro} />
            <CardContent>{data.question1}</CardContent>
            {data?.yes1?.length ? (
              <Typography
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 0,
                }}
              >
                <Label
                  sx={{
                    color: 'green',
                  }}
                >
                  Y
                </Label>
                <Checkbox checked={checkbox1} onChange={() => handleClickCheckbox1()} />
                <Label
                  sx={{
                    color: 'red',
                  }}
                >
                  N
                </Label>
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
              {data.description1 && (
                <FormProvider methods={methods}>
                  <RHFTextField
                    name="description1"
                    label=""
                    multiline
                    rows={18}
                    // disabled
                  />
                </FormProvider>
              )}
              {data.moveOptions && (
                <MoveOptionGroup
                  data={data.moveOptions}
                  optionIndex={optionIndex}
                  setCurrentWorkflowPosition={setCurrentWorkflowPosition}
                  handleCurrentStatus={handleCurrentStatus}
                />
              )}
              {data.selectOptions && (
                <SelectOptionGroup
                  data={data.selectOptions}
                  optionIndex={optionIndex}
                  handleCurrentStatus={handleCurrentStatus}
                />
              )}

              {data.factor && <FactorGroup data={data.factor} />}
            </CardContent>
          </Card>
        </Box>

        <SimpleSplitter isDragging={isTerminalDragging} {...terminalDragBarProps} />
        {data.description3 && (
          <Box height={terminalH - 100} overflow="hidden">
            <Card>
              <CardContent>
                <FormProvider methods={methods}>
                  <RHFTextField
                    name="description3"
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
          <FirstButtonGroupContainer>
            <ButtonGroup variant="contained" orientation="vertical">
              <CustomButton>SOW</CustomButton>
              <CustomButton>BOE</CustomButton>
              <CustomButton>Hours</CustomButton>
              <CustomButton>Material</CustomButton>
              <CustomButton>Travel</CustomButton>
            </ButtonGroup>
          </FirstButtonGroupContainer>
          <ThirdButtonGroupContainer>
            <ButtonGroup variant="contained" orientation="vertical">
              <CustomButton>SOW</CustomButton>
              <CustomButton>BOE</CustomButton>
              <CustomButton>Hours</CustomButton>
              <CustomButton>Material</CustomButton>
              <CustomButton>Travel</CustomButton>
            </ButtonGroup>
          </ThirdButtonGroupContainer>
        </>
      )}
    </Box>
  );
};

export default ScrolUILeftItem;
