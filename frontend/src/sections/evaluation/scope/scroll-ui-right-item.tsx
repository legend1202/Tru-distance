import styled from '@emotion/styled';
import { useResizable } from 'react-resizable-layout';

import Box from '@mui/material/Box';
import { Button, Typography, ButtonGroup } from '@mui/material';

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
  text1: string;
  text2: string;
};

const ScrolUIRightItem = ({ text1, text2 }: Props) => {
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
      >
        <Box overflow="hidden">
          <Typography variant="body1" p={2}>
            {text1}
          </Typography>
        </Box>
        <SimpleSplitter isDragging={isTerminalDragging} {...terminalDragBarProps} />
        <Box height={terminalH} overflow="hidden">
          <Typography variant="body1" p={2}>
            {text2}
          </Typography>
        </Box>
      </Box>
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
    </Box>
  );
};

export default ScrolUIRightItem;
