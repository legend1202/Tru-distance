import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import { Card, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import ButtonGroup from '@mui/material/ButtonGroup';

import SplitterLayout from 'src/components/splitter/splitter-layout';

import Footer from './footer';

const FirstButtonGroupContainer = styled('div')({
  position: 'absolute',
  top: '20%',
  right: '-4.5%',
});

const SecondButtonGroupContainer = styled('div')({
  position: 'absolute',
  top: '20%',
  left: '5.5%',
});

const ThirdButtonGroupContainer = styled('div')({
  position: 'absolute',
  top: '65%',
  right: '-4.5%',
});

const ForthButtonGroupContainer = styled('div')({
  position: 'absolute',
  top: '65%',
  left: '5.5%',
});

export default function EvaluationScopeView() {
  return (
    <Container
      maxWidth={false}
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid container spacing={8}>
        <Grid item xs={6} sx={{ position: 'relative' }}>
          <Card
            sx={{
              height: '80vh',
            }}
          >
            <SplitterLayout vertical>
              <div className="my-pane">
                <h2>1st Pane</h2>
              </div>
              <div className="my-pane">
                <h2>2nd Pane</h2>
              </div>
            </SplitterLayout>
          </Card>
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
        </Grid>
        <Grid item xs={6} sx={{ position: 'relative' }}>
          <Card
            sx={{
              height: '80vh',
            }}
          >
            <SplitterLayout vertical>
              <div className="my-pane">
                <h2>1st Pane</h2>
              </div>
              <div className="my-pane">
                <h2>2nd Pane</h2>
              </div>
            </SplitterLayout>
          </Card>
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
        </Grid>
      </Grid>
      <Footer />

      <Footer />
    </Container>
  );
}
