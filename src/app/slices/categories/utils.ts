import type { Category } from './types';

type CategoryData = {
  id: string;
  name: string;
  slug: string;
};

export const formatCategoryOptions = (data: CategoryData[]) => {
  const options = data.reduce((acc, option) => {
    const value = option.id;
    const label = option.name;
    const slug = option.slug;

    acc.push({ value, label, slug });

    return acc;
  }, [] as Category[]);

  return options;
};
