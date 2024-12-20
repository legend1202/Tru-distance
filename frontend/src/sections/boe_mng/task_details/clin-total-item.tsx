import { useState, useEffect } from 'react';

import { Card, Typography } from '@mui/material';

import { calculateClinTotals } from 'src/utils/wbs-total';

import { IWbs } from 'src/types/wbs';

type Props = {
  clinId: string;
  clinNumber: string;
  clinData: IWbs[];
};

const ClinTotalItem = ({ clinId, clinNumber, clinData }: Props) => {
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    if (clinId && clinData) {
      // const filteredClinData = clinData.filter((clin) => clin.id === clinId);
      const total = calculateClinTotals(clinData, clinId);
      setTotalHours(total);
    }
  }, [clinId, clinData]);

  return (
    <Card
      sx={{
        flexGrow: { md: 1 },
        display: { md: 'flex' },
        flexDirection: { md: 'row' },
        justifyContent: 'space-between',
      }}
    >
      <Typography>{clinNumber} : </Typography>
      <Typography sx={{ textDecoration: 'underline', ml: 1 }}> {totalHours}</Typography>
    </Card>
  );
};

export default ClinTotalItem;
