import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { styled } from '@mui/material/styles';

import { useGlobalData } from 'src/context/global-data/use-global-data';
import Popover from '@mui/material/Popover';

const FooterContainer = styled('div')({
  height: '50px',
  width: '100%',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const STEPS = [
  'Main : 1.0',
  'BOE Summary : 2.0',
  'Technical Eval Lead : 3.0',
  'Evaluators : 4.0',
  'Reports : 5.0',
  'Cost Analysis : 6.0',
  'Material Analysis : 7.0',
  'Travel : 8.0',
  'Evaluation Status : 9.0',
];

export default function Footer() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const { currentStep, nextStep, prevStep } = useGlobalData();

  return (
    <FooterContainer>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        The content of the Popover.
      </Popover>

      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid item>
          <ButtonGroup variant="text">
            <Button aria-describedby={id} onClick={handleClick} sx={{ width: '150px' }}>
              Quick Reference
            </Button>
            <Button aria-describedby={id} onClick={handleClick} sx={{ width: '150px' }}>
              SOW / PWS
            </Button>
            <Button aria-describedby={id} onClick={handleClick} sx={{ width: '150px' }}>
              Basis of Estimate
            </Button>
            <Button aria-describedby={id} onClick={handleClick} sx={{ width: '150px' }}>
              Hrs / Labor Cat.
            </Button>
            <Button aria-describedby={id} onClick={handleClick} sx={{ width: '150px' }}>
              BOM / CBOM
            </Button>
            <Button aria-describedby={id} onClick={handleClick} sx={{ width: '150px' }}>
              Travel
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: 'right', display: 'flex' }}>
        <Button disabled={currentStep === 0} onClick={prevStep} sx={{ mr: 1 }}>
          Back
        </Button>
        <Button variant="contained" onClick={nextStep} sx={{ mr: 1 }}>
          {currentStep >= STEPS.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </FooterContainer>
  );
}
