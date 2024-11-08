import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { GridCellParams } from '@mui/x-data-grid';
import ListItemText from '@mui/material/ListItemText';

import { fCurrency } from 'src/utils/format-number';
// import { fTime, fDate } from "src/utils/format-time";

import { useTranslate } from 'src/locales';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

type ParamsProps = {
  params: GridCellParams;
};

export function RenderCellPrice({ params }: ParamsProps) {
  return <>{fCurrency(params.row.price)}</>;
}

export function RenderCellApprove({ params }: ParamsProps) {
  return (
    <Label variant="soft" color={(params.row.approved && 'info') || 'default'}>
      {params.row.approved ? 'Approved' : ''}
    </Label>
  );
}

export function RenderCellRole({ params }: ParamsProps) {
  const { t } = useTranslate();

  return (
    <ListItemText
      primary={t(params.row.role.toString())}
      primaryTypographyProps={{ typography: 'body2', noWrap: true }}
      secondaryTypographyProps={{
        mt: 0.5,
        component: 'span',
        typography: 'caption',
      }}
    />
  );
}

export function RenderCellEmail({ params }: ParamsProps) {
  const { t } = useTranslate();
  return (
    <ListItemText
      primary={t(params.row.email)}
      primaryTypographyProps={{ typography: 'body2', noWrap: true }}
      secondaryTypographyProps={{
        mt: 0.5,
        component: 'span',
        typography: 'caption',
      }}
    />
  );
}

export function RenderCellName({ params }: ParamsProps) {
  return (
    <Stack direction="row" alignItems="center" sx={{ py: 2, width: 1 }}>
      <Avatar
        alt={params.row.name}
        src={params.row.coverUrl}
        variant="rounded"
        sx={{ width: 24, height: 24, mr: 2 }}
      />

      <ListItemText
        disableTypography
        primary={
          <Box component="div" sx={{ typography: 'body2', color: 'text.disabled' }}>
            {params.row.name}
          </Box>
        }
      />
    </Stack>
  );
}
