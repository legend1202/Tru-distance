import { useState, useEffect } from 'react';

import { Card, Typography } from '@mui/material';

import { calculateTotals } from 'src/utils/wbs-total';

import { IClin } from 'src/types/clin';
import { IOriginData } from 'src/types/gantt';

import ClinTotalItem from './clin-total-item';

type Props = {
  proposaedData: IOriginData[];
  clins: IClin[];
};

const ProposalSummaryView = ({ proposaedData, clins }: Props) => {
  const [totalHours, setTotalHours] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalTravel, setTotalTravel] = useState(0);
  const [totalMaterial, setTotalMaterial] = useState(0);

  useEffect(() => {
    if (proposaedData.length > 0) {
      const totals = calculateTotals(proposaedData);
      setTotalHours(totals.totalHours);
      setTotalCost(totals.totalCost);
      setTotalTravel(totals.totalTravel);
      setTotalMaterial(totals.totalMaterial);
    }
  }, [proposaedData]);

  return (
    <Card
      sx={{
        p: 3,
        border: '1px solid #ccc',
      }}
    >
      <Typography align="center">Proposal Summary</Typography>
      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'row' },
          justifyContent: 'space-between',
        }}
      >
        <Typography>Total Hours: </Typography>
        <Typography sx={{ textDecoration: 'underline' }}> {totalHours}</Typography>
      </Card>
      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'row' },
          justifyContent: 'space-between',
        }}
      >
        <Typography>Total Cost: </Typography>
        <Typography sx={{ textDecoration: 'underline' }}> {totalCost}</Typography>
      </Card>
      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'row' },
          justifyContent: 'space-between',
        }}
      >
        <Typography>Total Material: </Typography>
        <Typography sx={{ textDecoration: 'underline' }}>{totalMaterial}</Typography>
      </Card>
      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'row' },
          justifyContent: 'space-between',
        }}
      >
        <Typography>Total Travel : </Typography>
        <Typography sx={{ textDecoration: 'underline' }}> {totalTravel}</Typography>
      </Card>
      <Typography
        sx={{
          mt: 3,
        }}
      >
        Total Hours By CLIN:{' '}
      </Typography>

      {clins &&
        clins.map((clin) => (
          <ClinTotalItem
            key={clin.id} // Unique key added here
            clinId={clin.id}
            clinNumber={clin.clinNumber}
            clinData={proposaedData}
          />
        ))}
    </Card>
  );
};

export default ProposalSummaryView;
