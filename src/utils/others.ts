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

export function calculateReadingTime(
  htmlString: string,
  wordsPerMinute = 200,
): string {
  const element = document.createElement('div');
  element.innerHTML = htmlString;

  // Extract the text content from the element
  const textContent = element.textContent || '';

  // Calculate the estimated reading time
  const wordCount = textContent.split(/\s+/g).length;
  const readingTimeInMinutes = wordCount / wordsPerMinute;
  const formattedReadingTime = Math.ceil(readingTimeInMinutes).toString();

  return `${formattedReadingTime} min read`;
}
