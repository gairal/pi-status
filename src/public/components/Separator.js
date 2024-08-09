import { h } from "https://unpkg.com/hyperapp";

export default (padding = 1, { classes = {} } = {}) =>
  h("div", { class: { [`p-${padding}`]: true, ...classes } });
