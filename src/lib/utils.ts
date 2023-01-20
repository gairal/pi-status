export const round = (num: number, decimal = 2) =>
  Math.round((num + Number.EPSILON) * 10 ** decimal) / 10 ** decimal;
