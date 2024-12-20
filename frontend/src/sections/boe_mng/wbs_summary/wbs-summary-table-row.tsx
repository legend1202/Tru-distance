import { GridCellParams } from '@mui/x-data-grid';
import ListItemText from '@mui/material/ListItemText';

// ----------------------------------------------------------------------

type ParamsProps = {
  params: GridCellParams;
};

export function RenderCellName({ params }: ParamsProps) {
  return (
    <ListItemText
      primary={params.row.name}
      primaryTypographyProps={{ typography: 'body2', noWrap: true }}
      secondaryTypographyProps={{
        mt: 0.5,
        component: 'span',
        typography: 'caption',
      }}
    />
  );
}

export function RenderCellHours({ params }: ParamsProps) {
  return (
    <ListItemText
      primary={params.row.hours}
      primaryTypographyProps={{ typography: 'body2', noWrap: true }}
      secondaryTypographyProps={{
        mt: 0.5,
        component: 'span',
        typography: 'caption',
      }}
    />
  );
}

export function RenderCellCosts({ params }: ParamsProps) {
  return (
    <ListItemText
      primary={params.row.cost}
      primaryTypographyProps={{ typography: 'body2', noWrap: true }}
      secondaryTypographyProps={{
        mt: 0.5,
        component: 'span',
        typography: 'caption',
      }}
    />
  );
}
