// eslint-disable-next-line import/prefer-default-export
export const round = (num: number, decimal = 2): number =>
  Math.round((num + Number.EPSILON) * 10 ** decimal) / 10 ** decimal;
