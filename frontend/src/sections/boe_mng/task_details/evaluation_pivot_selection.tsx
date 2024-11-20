import { Card, Button, Typography } from '@mui/material';
import { path } from 'd3';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

const EvaluationPivotSelection = () => {
  const router = useRouter();

  const handleMoveToPivot = () => {
    router.push(paths.boe_mng.boe_pivot);
  };

  return (
    <Card
      sx={{
        p: 3,
        border: '1px solid #ccc',
      }}
    >
      <Typography align="center">PIVOT Data Enty - Evaluation</Typography>
      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'row' },
          justifyContent: 'space-between',
        }}
      >
        <Typography>Total Hours: </Typography>
        <Typography sx={{ textDecoration: 'underline' }}> 555</Typography>
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
        <Typography sx={{ textDecoration: 'underline' }}> 555</Typography>
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
        <Typography sx={{ textDecoration: 'underline' }}> 555</Typography>
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
        <Typography sx={{ textDecoration: 'underline' }}> 555</Typography>
      </Card>
      <Typography
        sx={{
          mt: 3,
        }}
      >
        Total Hours By CLIN:{' '}
      </Typography>
      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'row' },
        }}
      >
        <Card
          sx={{
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            flexDirection: { md: 'row' },
          }}
        >
          <Typography>CLIN 001: </Typography>
          <Typography sx={{ textDecoration: 'underline', ml: 1 }}> 555</Typography>
        </Card>
        <Card
          sx={{
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            flexDirection: { md: 'row' },
          }}
        >
          <Typography>CLIN 002: </Typography>
          <Typography sx={{ textDecoration: 'underline', ml: 1 }} align="center">
            {' '}
            555
          </Typography>
        </Card>
      </Card>
      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'row' },
        }}
      >
        <Card
          sx={{
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            flexDirection: { md: 'row' },
          }}
        >
          <Typography>CLIN 003: </Typography>
          <Typography sx={{ textDecoration: 'underline', ml: 1 }}> 555</Typography>
        </Card>
        <Card
          sx={{
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            flexDirection: { md: 'row' },
          }}
        >
          <Typography>CLIN 004: </Typography>
          <Typography sx={{ textDecoration: 'underline', ml: 1 }} align="center">
            {' '}
            555
          </Typography>
        </Card>
      </Card>
      
    </Card>
  );
};
export default EvaluationPivotSelection;
