import { Box } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

import { createSXCollection } from '../../utils/mui';

import type { FC } from 'react';

type Props = {
  name: string;
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

export const FileInput: FC<Props> = ({ name }) => {
  const { register, setValue, unregister, watch } = useFormContext();
  const files = watch(name);

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
      'image/': ['.png', '.jpg', '.jpeg', '.webp', '.avif'],
      // 'image/jpg': ['.jpg'],
      // 'image/jpeg': ['.jpeg'],
      // 'image/webp': ['.webp'],
      // 'image/avif': ['.avif'],
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

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  return (
    <>
      <div
        {...getRootProps()}
        // type="file"
        role="button"
        aria-label="File Upload"
        id={name}
      >
        <input {...getInputProps()} />
        <div
          style={{ width: '500px', border: 'black solid 2px' }}
          className={' ' + (isDragActive ? ' ' : ' ')}
        >
          <p className=" ">Drop the files here ...</p>

          {!!files?.length && (
            <div className=" ">
              {files.map((file: File) => (
                <div key={file.name}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    style={{
                      height: '200px',
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          <ul>{fileRejectionItems}</ul>
        </div>
      </div>
    </>
  );
};
