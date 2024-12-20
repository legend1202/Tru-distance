import { GridCellParams } from '@mui/x-data-grid';
import ListItemText from '@mui/material/ListItemText';

// import { fTime, fDate } from "src/utils/format-time";

import { useTranslate } from 'src/locales';

const fileTypeArray = ['BOE', 'CBOM', 'TRAVEL', 'SOW', 'GR&A'];
// ----------------------------------------------------------------------

type ParamsProps = {
  params: GridCellParams;
};

export function RenderCellFilepath({ params }: ParamsProps) {
  const { t } = useTranslate();
  return (
    <ListItemText
      primary={t(params.row.filepath)}
      primaryTypographyProps={{ typography: 'body2', noWrap: true }}
      secondaryTypographyProps={{
        mt: 0.5,
        component: 'span',
        typography: 'caption',
      }}
    />
  );
}

export function RenderCellProposalName({ params }: ParamsProps) {
  return (
    <ListItemText
      primary={params.row?.proposalDetails[0]?.proposalName || ''}
      primaryTypographyProps={{ typography: 'body2', noWrap: true }}
      secondaryTypographyProps={{
        mt: 0.5,
        component: 'span',
        typography: 'caption',
      }}
    />
  );
}

export function RenderCellFileType({ params }: ParamsProps) {
  console.log('======');
  const fileType = fileTypeArray[params.row.fileType];
  return (
    <ListItemText
      primary={fileType || ''}
      primaryTypographyProps={{ typography: 'body2', noWrap: true }}
      secondaryTypographyProps={{
        mt: 0.5,
        component: 'span',
        typography: 'caption',
      }}
    />
  );
}
