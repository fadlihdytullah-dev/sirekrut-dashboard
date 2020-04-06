// @flow

export const numToRem = (num: number): string =>
  `${((num || 0) * 0.1).toFixed(1)}rem`;
