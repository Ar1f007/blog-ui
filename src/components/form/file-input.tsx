import { Box, Button, Stack, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

import Icons from '../../utils/icons';
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
  const { register, setValue, unregister, watch, resetField } = useFormContext();
  const files = watch(name);
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

  const handleCoverImageRemove = () => {
    resetField(name);
    fileRejections.length = 0;
  };

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  return (
    <>
      {files && (
        <Stack alignItems="flex-end">
          <Button
            onClick={() => handleCoverImageRemove()}
            aria-label="remove image"
          >
            Remove
          </Button>
        </Stack>
      )}
      <Box
        {...getRootProps()}
        role="button"
        aria-label="File Upload"
        id={name}
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

          {!!files?.length && (
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
          )}
        </Box>

        {fileRejectionItems?.length > 0 && <ul>{fileRejectionItems}</ul>}
      </Box>
    </>
  );
};
