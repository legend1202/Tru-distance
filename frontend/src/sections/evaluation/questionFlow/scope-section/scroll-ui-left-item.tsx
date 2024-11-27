import styled from '@emotion/styled';
import { useResizable } from 'react-resizable-layout';

import Box from '@mui/material/Box';
import { Card, Button, useTheme, CardHeader, ButtonGroup, CardContent } from '@mui/material';

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
  text1: string;
  text2: string;
};

const ScrolUILeftItem = ({ text1, text2 }: Props) => {
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
          <Card>
            <CardHeader title="WBS" />
            <CardContent>body</CardContent>
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
        <SimpleSplitter isDragging={isTerminalDragging} {...terminalDragBarProps} />
        <Box height={terminalH} overflow="hidden">
          <Card>
            <CardHeader title="WBS" />
            <CardContent>body</CardContent>
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
      </Box>
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
    </Box>
  );
};

export default ScrolUILeftItem;