import { useState } from 'react';
import styled from '@emotion/styled';
import { useResizable } from 'react-resizable-layout';

import Box from '@mui/material/Box';
import {
  Card,
  Button,
  Checkbox,
  useTheme,
  Typography,
  CardHeader,
  ButtonGroup,
  CardContent,
} from '@mui/material';

import { IflowDataItemChild } from 'src/types/flowData';

import SimpleSplitter from './simple-spliter';

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

type Props = {
  data: IflowDataItemChild;
  scrollStatus: boolean;
};

const ScrolUIRightItem = ({ data, scrollStatus }: Props) => {
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
    min: 150,
    reverse: true,
  });

  const handleClickCheckbox1 = () => {
    setCheckbox1(!checkbox1);
  };

  const handleClickCheckbox2 = () => {
    setCheckbox2(!checkbox2);
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
            {/* <CardHeader title={data.intro} /> */}
            <CardContent>{data.question2}</CardContent>
            {data?.yes2?.length ? (
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
            <CardContent>{data.description2}</CardContent>
          </Card>
        </Box>
        {scrollStatus && (
          <>
            <SimpleSplitter isDragging={isTerminalDragging} {...terminalDragBarProps} />
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
          </>
        )}
      </Box>
      {scrollStatus && (
        <>
          <SecondButtonGroupContainer>
            <ButtonGroup variant="contained" orientation="vertical">
              <Button>SOW</Button>
              <Button>BOE</Button>
              <Button>Hours</Button>
              <Button>Material</Button>
              <Button>Travel</Button>
            </ButtonGroup>
          </SecondButtonGroupContainer>
          <ForthButtonGroupContainer>
            <ButtonGroup variant="contained" orientation="vertical">
              <Button>SOW</Button>
              <Button>BOE</Button>
              <Button>Hours</Button>
              <Button>Material</Button>
              <Button>Travel</Button>
            </ButtonGroup>
          </ForthButtonGroupContainer>
        </>
      )}
    </Box>
  );
};

export default ScrolUIRightItem;
