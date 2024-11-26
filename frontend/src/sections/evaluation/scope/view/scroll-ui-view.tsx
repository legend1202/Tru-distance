import { Card } from '@mui/material';
import { Container } from '@mui/system';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import ScrolUILeftItem from '../scroll-ui-left-item';
import ScrolUIRightItem from '../scroll-ui-right-item';

const text1 = 'text1';
const text2 = 'text2';
const text3 = 'text3';
const text4 = 'text4';

export default function EvaluationScopeView() {
  const settings = useSettingsContext();

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CustomBreadcrumbs
        heading="Evaluation Scope"
        links={[{ name: 'Evaluation', href: paths.dashboard.root }, { name: 'Scope' }]}
        sx={{
          mb: {
            xs: 3,
            md: 5,
          },
        }}
      />
      <Card
        sx={{
          height: { xs: '80vh', md: 2 },

          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'row' },
          justifyContent: 'space-between',
          bgcolor: 'background.default',
        }}
      >
        <ScrolUILeftItem text1={text1} text2={text2} />

        <ScrolUIRightItem text1={text3} text2={text4} />
      </Card>
    </Container>
  );
}
