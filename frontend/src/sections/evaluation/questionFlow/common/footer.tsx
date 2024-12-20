import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { Card, Typography } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';

import { useBoolean } from 'src/hooks/use-boolean';

import { HOST_API } from 'src/config-global';
import { useGetFileLists } from 'src/api/filelist';

type Props = {
  handleWorkflowPosition: (step: boolean) => void;
};
const Footer = ({ handleWorkflowPosition }: Props) => {
  const drawer = useBoolean();

  const { fileList } = useGetFileLists();

  const [fileLists, setFileLists] = useState<string[]>([]);

  const [title, setTitle] = useState<string>('Quick Reference');

  const handleClickReference = (titleString: string, fileNumber: number) => {
    const filteredData = fileList
      .map((file) => {
        if (file.fileType === fileNumber) {
          return file.filepath;
        }
        return null;
      })
      .filter((filePath): filePath is string => filePath !== null); // Filter out null values

    console.log(fileList);
    setFileLists(filteredData);

    setTitle(titleString);
    drawer.onTrue();
  };

  console.log(fileLists);

  return (
    <>
      <Card
        sx={{
          mt: 2,
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'row' },
          justifyContent: 'space-between',
          bgcolor: 'background.default',
        }}
      >
        <Grid container sx={{ justifyContent: 'left' }}>
          <Grid item>
            <ButtonGroup variant="text">
              <Button sx={{ width: '150px' }}>Quick Reference</Button>
              <Button sx={{ width: '150px' }} onClick={() => handleClickReference('SOW / PWS', 3)}>
                SOW / PWS
              </Button>
              <Button
                sx={{ width: '150px' }}
                onClick={() => handleClickReference('Basis of Estimate', 0)}
              >
                Basis of Estimate
              </Button>
              <Button
                sx={{ width: '150px' }}
                onClick={() => handleClickReference('Hrs / Labor Cat.', 5)}
              >
                Hrs / Labor Cat.
              </Button>
              <Button sx={{ width: '150px' }} onClick={() => handleClickReference('BOM / CBOM', 1)}>
                BOM / CBOM
              </Button>
              <Button sx={{ width: '150px' }} onClick={() => handleClickReference('Travel', 2)}>
                Travel
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'right', display: 'flex' }}>
          <Button sx={{ mr: 1 }} onClick={() => handleWorkflowPosition(false)}>
            Back
          </Button>
          <Button variant="contained" sx={{ mr: 1 }} onClick={() => handleWorkflowPosition(true)}>
            Next
          </Button>
        </Box>
      </Card>
      <Drawer
        open={drawer.value}
        onClose={drawer.onFalse}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 1, maxWidth: 420 },
        }}
      >
        <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Stack>

        <Divider />

        <Divider />

        <Box sx={{ p: 8 }}>
          {fileLists.map((file, index) => (
            <>
              <Link
                key={index}
                to={`${HOST_API}/${file}`}
                style={{ color: 'white' }} // Sets link color to white
                target="_blank" // Opens the link in a new tab
                rel="noopener noreferrer" // Recommended for security when using target="_blank"
              >
                {HOST_API}/{file}
              </Link>
              <Divider />
            </>
          ))}
        </Box>
      </Drawer>
    </>
  );
};

export default Footer;
