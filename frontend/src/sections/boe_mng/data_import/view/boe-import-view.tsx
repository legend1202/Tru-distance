import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useCallback } from 'react';

import { Stack } from '@mui/system';
import Container from '@mui/material/Container';
import { Card, Grid, Backdrop, Typography, CircularProgress } from '@mui/material';

import { paths } from 'src/routes/paths';

import {
  uploadSow,
  uploadGra,
  uploadBoePdf,
  uploadCbomExcel,
  uploadTravelAny,
} from 'src/api/upload';

import { RHFUpload } from 'src/components/hook-form';
import { useSettingsContext } from 'src/components/settings';
import FormProvider from 'src/components/hook-form/form-provider';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

// ----------------------------------------------------------------------

// Existing imports...

export default function BoeImportView() {
  const settings = useSettingsContext();

  const [fileUploadingStatus, setFileUploadingStatus] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    boe: Yup.array().min(1, 'PDF is required'),
    cbom: Yup.array().min(1, 'Document is required'),
    travel: Yup.array().min(1, 'Document is required'),
    sow: Yup.array().min(1, 'Document is required'),
    gra: Yup.array().min(1, 'Document is required'),
  });

  const defaultValues = useMemo(
    () => ({
      boe: [],
      cbom: [],
      travel: [],
      sow: [],
      gra: [],
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const { reset, watch, setValue, handleSubmit } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar('Create success!');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDropBoe = useCallback(
    async (acceptedFiles: File[]) => {
      setFileUploadingStatus(true);
      const files = values.boe || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('boe', [...files, ...newFiles], { shouldValidate: true });

      const result = await uploadBoePdf(acceptedFiles);
      if (result) {
        setFileUploadingStatus(false);
        enqueueSnackbar('Data Extraction success!');
      } else {
        setFileUploadingStatus(false);
        enqueueSnackbar('Data Extraction failed!', { variant: 'error' });
      }
    },
    [setValue, values.boe, enqueueSnackbar]
  );

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      const filtered = values.boe && values.boe?.filter((file) => file !== inputFile);
      setValue('boe', filtered);
    },
    [setValue, values.boe]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('boe', []);
  }, [setValue]);

  const handleDropCbom = useCallback(
    async (acceptedFiles: File[]) => {
      setFileUploadingStatus(true);
      const files = values.cbom || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('cbom', [...files, ...newFiles], { shouldValidate: true });

      const result = await uploadCbomExcel(acceptedFiles);
      if (result) {
        setFileUploadingStatus(false);
        enqueueSnackbar('Data Extraction success!');
      } else {
        setFileUploadingStatus(false);
        enqueueSnackbar('Data Extraction failed!', { variant: 'error' });
      }
    },
    [setValue, values.cbom, enqueueSnackbar]
  );

  const handleDropTravel = useCallback(
    async (acceptedFiles: File[]) => {
      setFileUploadingStatus(true);
      const files = values.travel || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('travel', [...files, ...newFiles], { shouldValidate: true });

      const result = await uploadTravelAny(acceptedFiles);
      if (result) {
        setFileUploadingStatus(false);
        enqueueSnackbar('Data Extraction success!');
      } else {
        setFileUploadingStatus(false);
        enqueueSnackbar('Data Extraction failed!', { variant: 'error' });
      }
    },
    [setValue, values.travel, enqueueSnackbar]
  );

  const handleDropSow = useCallback(
    async (acceptedFiles: File[]) => {
      setFileUploadingStatus(true);
      const files = values.sow || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('sow', [...files, ...newFiles], { shouldValidate: true });

      const result = await uploadSow(acceptedFiles);
      if (result) {
        setFileUploadingStatus(false);
        enqueueSnackbar('Data Extraction success!');
      } else {
        setFileUploadingStatus(false);
        enqueueSnackbar('Data Extraction failed!', { variant: 'error' });
      }
    },
    [setValue, values.sow, enqueueSnackbar]
  );

  const handleDropGra = useCallback(
    async (acceptedFiles: File[]) => {
      setFileUploadingStatus(true);
      const files = values.gra || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('gra', [...files, ...newFiles], { shouldValidate: true });

      const result = await uploadGra(acceptedFiles);
      if (result) {
        setFileUploadingStatus(false);
        enqueueSnackbar('Data Extraction success!');
      } else {
        setFileUploadingStatus(false);
        enqueueSnackbar('Data Extraction failed!', { variant: 'error' });
      }
    },
    [setValue, values.gra, enqueueSnackbar]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {/* Loading Screen */}
      <Backdrop open={fileUploadingStatus} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <CustomBreadcrumbs
        heading="Data Import"
        links={[
          { name: 'BOE', href: paths.boe_mng.root },
          { name: 'DATA', href: paths.boe_mng.data_import },
          { name: 'IMPORT' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <Stack spacing={3} sx={{ p: 3 }}>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">BOE</Typography>
                  <RHFUpload
                    multiple
                    accept={{ 'application/pdf': [] }}
                    thumbnail
                    name="boe"
                    maxSize={3145728}
                    onDrop={handleDropBoe}
                    onRemove={handleRemoveFile}
                    onRemoveAll={handleRemoveAllFiles}
                    onUpload={() => console.info('ON UPLOAD')}
                  />
                </Stack>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <Stack spacing={3} sx={{ p: 3 }}>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">CBOM</Typography>
                  <RHFUpload
                    multiple
                    accept={{
                      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
                      'application/vnd.ms-excel': [],
                    }}
                    thumbnail
                    name="cbom"
                    maxSize={3145728}
                    onDrop={handleDropCbom}
                    onRemove={handleRemoveFile}
                    onRemoveAll={handleRemoveAllFiles}
                    onUpload={() => console.info('ON UPLOAD')}
                  />
                </Stack>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <Stack spacing={3} sx={{ p: 3 }}>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Travel</Typography>
                  <RHFUpload
                    multiple
                    accept={{
                      'application/*': [],
                    }}
                    thumbnail
                    name="travel"
                    maxSize={3145728}
                    onDrop={handleDropTravel}
                    onRemove={handleRemoveFile}
                    onRemoveAll={handleRemoveAllFiles}
                    onUpload={() => console.info('ON UPLOAD')}
                  />
                </Stack>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <Stack spacing={3} sx={{ p: 3 }}>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">SOW</Typography>
                  <RHFUpload
                    multiple
                    accept={{ 'application/pdf': [] }}
                    thumbnail
                    name="sow"
                    maxSize={3145728}
                    onDrop={handleDropSow}
                    onRemove={handleRemoveFile}
                    onRemoveAll={handleRemoveAllFiles}
                    onUpload={() => console.info('ON UPLOAD')}
                  />
                </Stack>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <Stack spacing={3} sx={{ p: 3 }}>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">GR&A</Typography>
                  <RHFUpload
                    multiple
                    accept={{ 'application/pdf': [] }}
                    thumbnail
                    name="gra"
                    maxSize={3145728}
                    onDrop={handleDropGra}
                    onRemove={handleRemoveFile}
                    onRemoveAll={handleRemoveAllFiles}
                    onUpload={() => console.info('ON UPLOAD')}
                  />
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}
