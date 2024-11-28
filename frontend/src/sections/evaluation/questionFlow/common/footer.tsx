import * as React from 'react';

import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

type Props = {
  handleWorkflowPosition: (step: boolean) => void;
};
const Footer = ({ handleWorkflowPosition }: Props) => {
  console.log('');
  return (
    <Card
      sx={{
        mt: 2,
        flexGrow: { md: 1 },
        display: { md: 'flex' },
        flexDirection: { md: 'row' },
        justifyContent: 'space-between',
        bgcolor: 'background.default',
      }}
    >
      <Grid container sx={{ justifyContent: 'left' }}>
        <Grid item>
          <ButtonGroup variant="text">
            <Button sx={{ width: '150px' }}>Quick Reference</Button>
            <Button sx={{ width: '150px' }}>SOW / PWS</Button>
            <Button sx={{ width: '150px' }}>Basis of Estimate</Button>
            <Button sx={{ width: '150px' }}>Hrs / Labor Cat.</Button>
            <Button sx={{ width: '150px' }}>BOM / CBOM</Button>
            <Button sx={{ width: '150px' }}>Travel</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: 'right', display: 'flex' }}>
        <Button sx={{ mr: 1 }} onClick={() => handleWorkflowPosition(false)}>
          Back
        </Button>
        <Button variant="contained" sx={{ mr: 1 }} onClick={() => handleWorkflowPosition(true)}>
          Next
        </Button>
      </Box>
    </Card>
  );
};

export default Footer;
