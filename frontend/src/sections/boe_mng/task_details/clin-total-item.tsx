import { useState, useEffect } from 'react';

import { Card, Typography } from '@mui/material';

import { calculateTotals } from 'src/utils/wbs-total';

import { IOriginData, IEvaluationData } from 'src/types/gantt';

type Props = {
  clinId: string;
  clinNumber: string;
  clinData: IOriginData[] | IEvaluationData[];
};

const ClinTotalItem = ({ clinId, clinNumber, clinData }: Props) => {
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    if (clinId && clinData.length > 0) {
      // const filteredClinData = clinData.filter((clin) => clin.id === clinId);
      const total = calculateTotals(clinData);
      setTotalHours(total.totalHours);
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
