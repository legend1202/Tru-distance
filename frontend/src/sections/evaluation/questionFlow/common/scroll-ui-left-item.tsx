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
  useTheme,
  Checkbox,
  CardHeader,
  Typography,
  ButtonGroup,
  CardContent,
} from '@mui/material';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

import { IflowDataItemChild } from 'src/types/flowData';

import SimpleSplitter from './simple-spliter';

const FirstButtonGroupContainer = styled('div')({
  position: 'absolute',
  top: '25%',
  right: '-4.5%',
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

  const theme = useTheme();
  const {
    isDragging: isTerminalDragging,
    position: terminalH,
    splitterProps: terminalDragBarProps,
  } = useResizable({
    axis: 'y',
    initial: 250,
    min: 150,
    reverse: true,
  });

  const NewDescriptionSchema = Yup.object().shape({
    description: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      description: data.description1 || '',
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
    if (data.description1) {
      setValue('description', data.description1);
    }
  }, [data, setValue]);

  const handleClickCheckbox1 = () => {
    setCheckbox1(!checkbox1);
    if (!checkbox1) {
      handleCurrentStatus(1, true);
    } else {
      handleCurrentStatus(2, true);
    }
    setCurrentWorkflowPosition(data.yes1 || [0, 0]);
  };

  const handleClickCheckbox2 = () => {
    setCheckbox2(!checkbox2);
    if (!checkbox1) {
      handleCurrentStatus(1, false);
    } else {
      handleCurrentStatus(2, false);
    }
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
        height="80vh"
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
            {data.yes1?.length && (
              <Typography
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 0,
                }}
              >
                <Checkbox title="Yes" checked={checkbox1} onChange={() => handleClickCheckbox1()} />
                <Checkbox checked={checkbox2} onChange={() => handleClickCheckbox2()} />
              </Typography>
            )}
          </Card>
          <Card
            sx={{
              mt: 2,
            }}
          >
            <CardContent>
              <FormProvider methods={methods}>
                <RHFTextField name="description" label="" multiline rows={18} />
              </FormProvider>
            </CardContent>
          </Card>
        </Box>
        <SimpleSplitter isDragging={isTerminalDragging} {...terminalDragBarProps} />
        {scrollStatus && (
          <Box height={terminalH} overflow="hidden">
            <Card>
              <CardHeader title="WBS" />
              <CardContent>data</CardContent>
            </Card>
            <Card
              sx={{
                mt: 2,
              }}
            >
              <CardHeader title="WBS" />
              <CardContent>body</CardContent>
            </Card>
          </Box>
        )}
      </Box>
      {scrollStatus && (
        <>
          <FirstButtonGroupContainer>
            <ButtonGroup variant="contained" orientation="vertical">
              <Button>SOW</Button>
              <Button>BOE</Button>
              <Button>Hours</Button>
              <Button>Material</Button>
              <Button>Travel</Button>
            </ButtonGroup>
          </FirstButtonGroupContainer>
          <ThirdButtonGroupContainer>
            <ButtonGroup variant="contained" orientation="vertical">
              <Button>SOW</Button>
              <Button>BOE</Button>
              <Button>Hours</Button>
              <Button>Material</Button>
              <Button>Travel</Button>
            </ButtonGroup>
          </ThirdButtonGroupContainer>
        </>
      )}
    </Box>
  );
};

export default ScrolUILeftItem;
