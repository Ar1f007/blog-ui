type Option = {
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
