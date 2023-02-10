import axios from 'axios';

export type Option = {
  value: string;
  label: string;
  slug: string;
  __is_new__?: boolean;
};

type ApiOptionData = {
  id: string;
  name: string;
  slug: string;
};

export const transformOptions = (data: ApiOptionData[]) => {
  const options = data.reduce((acc, option) => {
    const value = option.id;
    const label = option.name;
    const slug = option.slug;

    acc.push({ value, label, slug });

    return acc;
  }, [] as Option[]);

  return options;
};

export const handleError = (e: unknown) => {
  if (axios.isAxiosError(e)) {
    if (!e.response) {
      throw e;
    }

    return e.response.data;
  }

  throw new Error('Something went wrong!');
};
