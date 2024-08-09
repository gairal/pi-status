import { h } from "https://unpkg.com/hyperapp";

export const Separator = (padding = 1, { classes = {} } = {}) =>
  h("div", { class: { [`p-${padding}`]: true, ...classes } });
