import { Box, Button, FormHelperText, Stack, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

import { createSXCollection } from '../../utils/mui';

import type { FC } from 'react';

type Props = {
  name: string;
  isOptional?: boolean;
};

const styles = createSXCollection({
  dropzoneContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    padding: '20px',
    borderWidth: '2px',
    borderRadius: '2px',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    borderColor: 'rgba(0, 0, 0, 0.23)',
    transition: 'border 0.24s ease-in-out',
    '&:active, &:hover': {
      borderColor: 'primary.main',
    },
  },
});

export const FileInput: FC<Props> = ({ name, isOptional = true }) => {
  const {
    register,
    setValue,
    unregister,
    watch,
    resetField,
    formState: { errors },
  } = useFormContext();

  const files = watch(name);

  const hasValidationError = !!errors[name];

  const isCoverImageUploaded = files?.length > 0;

  const onDrop = useCallback(
    (droppedFiles: File[]) => {
      setValue(name, droppedFiles, { shouldValidate: true });
    },
    [setValue, name],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'image/png': [],
      'image/jpeg': [],
      'image/jpg': [],
      'image/webp': [],
      'image/avif': [],
    },
  });

  const handleCoverImageRemove = () => {
    resetField(name);
    fileRejections.length = 0;
  };

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  const invalidFileTypeExists = fileRejectionItems?.length > 0;

  const previewFile = isCoverImageUploaded && (
    <div>
      {files.map((file: File) => (
        <div key={file.name}>
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            style={{
              width: '100%',
            }}
          />
        </div>
      ))}
    </div>
  );

  const showErrorMsg = (
    <FormHelperText
      sx={{ ml: 1.75 }}
      error={hasValidationError}
    >
      {errors[name]?.message?.toString()}
    </FormHelperText>
  );

  const showRemoveBtn = (
    <Stack alignItems="flex-end">
      <Button
        onClick={() => handleCoverImageRemove()}
        aria-label="remove image"
      >
        Remove
      </Button>
    </Stack>
  );

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  return (
    <>
      {files && showRemoveBtn}

      <Box
        {...getRootProps()}
        role="button"
        aria-label="File Upload"
        id={name}
        sx={{ '&:focus-visible': { outlineColor: (t) => t.palette.primary.main } }}
      >
        <input {...getInputProps()} />
        <Box sx={styles.dropzoneContainer}>
          <Box sx={{ position: 'relative', width: '100%' }}>
            <Typography textAlign="center">
              {isDragActive
                ? 'Drop the file here'
                : isCoverImageUploaded
                ? null
                : `Choose a cover image ${isOptional ? '(optional)' : ''}`}
            </Typography>
          </Box>

          {previewFile}
        </Box>

        {invalidFileTypeExists && <ul style={{ marginBottom: 0 }}>{fileRejectionItems}</ul>}
      </Box>

      {hasValidationError && showErrorMsg}
    </>
  );
};
