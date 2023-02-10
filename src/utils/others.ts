type Errors<T> = {
  fieldName: keyof T;
  message: string;
};

export function bytesToMB(bytes: number) {
  return (bytes / 1024 / 1024).toFixed(1) + 'MB';
}

export const attachValidationErrors = <T>(
  errors: Errors<T>[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods: any,
) => {
  errors.forEach((error) => {
    methods.setError(error.fieldName, {
      message: error.message,
      type: 'server',
    });
  });
};
