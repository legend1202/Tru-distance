import { useState, useEffect } from 'react';

import { Card, Button, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { calculateTotals } from 'src/utils/wbs-total';

import { IClin } from 'src/types/clin';
import { IEvaluationData } from 'src/types/gantt';

import ClinTotalItem from './clin-total-item';

type Props = {
  evaluationData: IEvaluationData[];
  clins: IClin[];
};

const EvaluationSummaryView = ({ evaluationData, clins }: Props) => {
  const [totalHours, setTotalHours] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalTravel, setTotalTravel] = useState(0);
  const [totalMaterial, setTotalMaterial] = useState(0);

  const router = useRouter();

  const handleMoveToPivot = () => {
    router.push(paths.boe_mng.boe_pivot);
  };

  useEffect(() => {
    if (evaluationData.length > 0) {
      const totals = calculateTotals(evaluationData);
      setTotalHours(totals.totalHours);
      setTotalCost(totals.totalCost);
      setTotalTravel(totals.totalTravel);
      setTotalMaterial(totals.totalMaterial);
    }
  }, [evaluationData]);

  return (
    <Card
      sx={{
        p: 3,
        border: '1px solid #ccc',
      }}
    >
      <Typography align="center">Evaluation Summary</Typography>
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
        <Typography sx={{ textDecoration: 'underline' }}> {totalMaterial}</Typography>
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
            key={clin.id}
            clinId={clin.id}
            clinNumber={clin.clinNumber}
            clinData={evaluationData}
          />
        ))}

      <Card
        sx={{
          height: '48px',
          mt: 2,
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'row' },
          justifyContent: 'center',
        }}
      >
        <Button
          sx={{ py: 1, px: 2, color: 'white', backgroundColor: 'CornflowerBlue' }}
          onClick={handleMoveToPivot}
        >
          Enter PIVOT Selections
        </Button>
      </Card>
    </Card>
  );
};
export default EvaluationSummaryView;
