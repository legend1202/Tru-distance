// Stepper packages
import Step from '@mui/material/Step';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stepper from '@mui/material/Stepper';
import IconButton from '@mui/material/IconButton';
import { StepIconProps } from '@mui/material/StepIcon';
import {  styled, useTheme } from '@mui/material/styles';
import StepLabel, { stepLabelClasses } from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks';

import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';
import { useGlobalData } from 'src/context/global-data/use-global-data';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
import { useSettingsContext } from 'src/components/settings';

import Searchbar from '../common/searchbar';
import { NAV, HEADER } from '../config-layout';
import SettingsButton from '../common/settings-button';
import AccountPopover from '../common/account-popover';
import ContactsPopover from '../common/contacts-popover';
/* import LanguagePopover from '../common/language-popover'; */
import NotificationsPopover from '../common/notifications-popover';
import { fontSize } from '@mui/system';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

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

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderRadius: 1,
    borderTopWidth: 3,
    borderColor: theme.palette.divider,
  },
}));

const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
  [`&.${stepLabelClasses.root}`]: {
    [`& .${stepLabelClasses.alternativeLabel}`]: {
      marginTop: 0,
      fontSize:12,
    },
  },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    height: 22,
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.disabled,
    ...(ownerState.active && {
      color: theme.palette.success.main,
    }),
    '& .QontoStepIcon-completedIcon': {
      zIndex: 1,
      fontSize: 10,
      color: theme.palette.success.main,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  })
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Iconify
          icon="eva:checkmark-fill"
          className="QontoStepIcon-completedIcon"
          width={24}
          height={24}
        />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();

  const { currentStep, setStep } = useGlobalData();

  const settings = useSettingsContext();

  const pathname = usePathname();

  const isNavHorizontal = settings.themeLayout === 'horizontal';

  const isNavMini = settings.themeLayout === 'mini';

  const lgUp = useResponsive('up', 'lg');

  const offset = useOffSetTop(HEADER.H_DESKTOP);

  const offsetTop = offset && !isNavHorizontal;

  const renderContent = (
    <>
      {lgUp && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}

      {!lgUp && (
        <IconButton onClick={onOpenNav}>
          <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
        </IconButton>
      )}

      {pathname !== paths.evalation.scope && <Searchbar />}
      {pathname === paths.evalation.scope && (
        <Stepper alternativeLabel activeStep={currentStep} connector={<QontoConnector />}>
          {STEPS.map((label, index) => (
              <Step key={label} onClick={() => setStep(index)}>
                <CustomStepLabel StepIconComponent={QontoStepIcon}>{label}</CustomStepLabel>
              </Step>
          ))}
        </Stepper>
      )}
      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >
        {/* <LanguagePopover /> */}

        <NotificationsPopover />

        <ContactsPopover />

        <AccountPopover />

        <SettingsButton />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
          height: HEADER.H_DESKTOP,
          ...(offsetTop && {
            height: HEADER.H_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: 'background.default',
            height: HEADER.H_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
