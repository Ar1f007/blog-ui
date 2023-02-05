import { FormHelperText, Stack } from '@mui/material';
import JoditEditor from 'jodit-react';
import { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import type { FC } from 'react';

export const joditConfig = {
  toolbar: true,
  hidePoweredByJodit: true,
  spellcheck: true,
  language: 'en',
  toolbarButtonSize: 'medium',
  // toolbarAdaptive: false,
  showCharsCounter: true,
  showWordsCounter: true,
  showXPathInStatusbar: false,
  askBeforePasteHTML: true,
  askBeforePasteFromWord: true,
  tabIndex: 0,
  cleanHTML: {
    fillEmptyParagraph: false,
  },
  uploader: {
    insertImageAsBase64URI: true,
  },
};

type Props = {
  name: string;
};

export const TextEditor: FC<Props> = ({ name }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const config = useMemo(() => joditConfig, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Stack
          tabIndex={0}
          sx={{ '&:focus-visible': { outlineColor: (t) => t.palette.primary.main } }}
        >
          <JoditEditor
            config={config}
            {...field}
            ref={register(name).ref}
          />

          <FormHelperText
            sx={{ ml: 1.75 }}
            error={!!errors[name]}
          >
            {errors[name]?.message?.toString()}
          </FormHelperText>
        </Stack>
      )}
    />
  );
};
