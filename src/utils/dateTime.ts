import dayjs from '../lib/dayjs';

export {};

export const DEFAULT_TIME_FORMAT = 'D MMM, YYYY';

export function formatTime(time: string, format = DEFAULT_TIME_FORMAT) {
  return dayjs(time).format(format);
}

export function formatTimeFromNow(time: string, withOutSuffix = false) {
  return dayjs(time).fromNow(withOutSuffix);
}
