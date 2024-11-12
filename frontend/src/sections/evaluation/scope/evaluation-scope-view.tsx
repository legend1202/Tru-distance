import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import { Card, Grid } from '@mui/material';

// import { paths } from 'src/routes/paths';

// import { useSettingsContext } from 'src/components/settings';
// import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { useGlobalData } from 'src/context/global-data/use-global-data';

import SplitterLayout from 'src/components/splitter/splitter-layout';

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

export default function EvaluationScopeView() {
  // const settings = useSettingsContext();

  const { currentStep, nextStep, prevStep } = useGlobalData();
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
        <Grid item xs>
          <Card
            sx={{
              height: '80vh',
            }}
          >
            <SplitterLayout vertical>
              <div className="my-pane">
                <h2>1st Pane</h2>
                <p>This is the 1st pane, and this is the primary pane by default.</p>
                <pre>
                  &lt;SplitterLayout primaryIndex={'{0}'}&gt;{'\n'}
                  &nbsp;&nbsp;<strong>&lt;div&gt;1st&lt;/div&gt;</strong>
                  {'\n'}
                  &nbsp;&nbsp;&lt;div&gt;2nd&lt;/div&gt;{'\n'}
                  &lt;/SplitterLayout&gt;
                </pre>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a orci ac diam
                  pharetra viverra sit amet eget arcu. Ut sit amet efficitur elit. Suspendisse
                  pulvinar pulvinar lectus ac malesuada. Curabitur ac dictum elit. Nam lectus ex,
                  suscipit nec aliquet vel, molestie sed justo. Nullam commodo dui viverra sem
                  hendrerit, eget iaculis nisi commodo. Aliquam at mauris porta libero mattis
                  convallis et posuere leo. Vivamus vehicula libero lacus, ac molestie mi varius eu.
                  Nam vel libero odio. Nulla sollicitudin dignissim pellentesque. Praesent eleifend
                  tortor ac dapibus efficitur. Nunc eleifend augue vel laoreet rutrum.
                </p>
              </div>
              <div className="my-pane">
                <h2>2nd Pane</h2>
                <p>This is the 2nd pane, and this is the secondary pane by default.</p>
                <pre>
                  &lt;SplitterLayout primaryIndex={'{0}'}&gt;{'\n'}
                  &nbsp;&nbsp;&lt;div&gt;1st&lt;/div&gt;{'\n'}
                  &nbsp;&nbsp;<strong>&lt;div&gt;2nd&lt;/div&gt;</strong>
                  {'\n'}
                  &lt;/SplitterLayout&gt;
                </pre>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a orci ac diam
                  pharetra viverra sit amet eget arcu. Ut sit amet efficitur elit. Suspendisse
                  pulvinar pulvinar lectus ac malesuada. Curabitur ac dictum elit. Nam lectus ex,
                  suscipit nec aliquet vel, molestie sed justo. Nullam commodo dui viverra sem
                  hendrerit, eget iaculis nisi commodo. Aliquam at mauris porta libero mattis
                  convallis et posuere leo. Vivamus vehicula libero lacus, ac molestie mi varius eu.
                  Nam vel libero odio. Nulla sollicitudin dignissim pellentesque. Praesent eleifend
                  tortor ac dapibus efficitur. Nunc eleifend augue vel laoreet rutrum.
                </p>
              </div>
            </SplitterLayout>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card
            sx={{
              height: '80vh',
            }}
          >
            <SplitterLayout vertical>
              <div className="my-pane">
                <h2>1st Pane</h2>
                <p>This is the 1st pane, and this is the primary pane by default.</p>
                <pre>
                  &lt;SplitterLayout primaryIndex={'{0}'}&gt;{'\n'}
                  &nbsp;&nbsp;<strong>&lt;div&gt;1st&lt;/div&gt;</strong>
                  {'\n'}
                  &nbsp;&nbsp;&lt;div&gt;2nd&lt;/div&gt;{'\n'}
                  &lt;/SplitterLayout&gt;
                </pre>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a orci ac diam
                  pharetra viverra sit amet eget arcu. Ut sit amet efficitur elit. Suspendisse
                  pulvinar pulvinar lectus ac malesuada. Curabitur ac dictum elit. Nam lectus ex,
                  suscipit nec aliquet vel, molestie sed justo. Nullam commodo dui viverra sem
                  hendrerit, eget iaculis nisi commodo. Aliquam at mauris porta libero mattis
                  convallis et posuere leo. Vivamus vehicula libero lacus, ac molestie mi varius eu.
                  Nam vel libero odio. Nulla sollicitudin dignissim pellentesque. Praesent eleifend
                  tortor ac dapibus efficitur. Nunc eleifend augue vel laoreet rutrum.
                </p>
              </div>
              <div className="my-pane">
                <h2>2nd Pane</h2>
                <p>This is the 2nd pane, and this is the secondary pane by default.</p>
                <pre>
                  &lt;SplitterLayout primaryIndex={'{0}'}&gt;{'\n'}
                  &nbsp;&nbsp;&lt;div&gt;1st&lt;/div&gt;{'\n'}
                  &nbsp;&nbsp;<strong>&lt;div&gt;2nd&lt;/div&gt;</strong>
                  {'\n'}
                  &lt;/SplitterLayout&gt;
                </pre>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a orci ac diam
                  pharetra viverra sit amet eget arcu. Ut sit amet efficitur elit. Suspendisse
                  pulvinar pulvinar lectus ac malesuada. Curabitur ac dictum elit. Nam lectus ex,
                  suscipit nec aliquet vel, molestie sed justo. Nullam commodo dui viverra sem
                  hendrerit, eget iaculis nisi commodo. Aliquam at mauris porta libero mattis
                  convallis et posuere leo. Vivamus vehicula libero lacus, ac molestie mi varius eu.
                  Nam vel libero odio. Nulla sollicitudin dignissim pellentesque. Praesent eleifend
                  tortor ac dapibus efficitur. Nunc eleifend augue vel laoreet rutrum.
                </p>
              </div>
            </SplitterLayout>
          </Card>
        </Grid>
      </Grid>
      <div>
        <Box sx={{ textAlign: 'right' }}>
            <Button disabled={currentStep === 0} onClick={prevStep} sx={{ mr: 1 }}>
              Back
            </Button>
            <Button variant="contained" onClick={nextStep} sx={{ mr: 1 }}>
              {currentStep >= STEPS.length - 1  ? 'Finish' : 'Next'}
            </Button>
          </Box>
      </div>
    </Container>
  );
}
