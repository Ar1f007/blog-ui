import dayjs from '../lib/dayjs';

export {};

export const DEFAULT_TIME_FORMAT = 'DD MMM YYYY';

export function formatTime(time: string, format = DEFAULT_TIME_FORMAT) {
  return dayjs(time).format(format);
}
