import { h, text } from "https://unpkg.com/hyperapp";

export const H2 = (str, classes = {}) =>
  h(
    "h2",
    {
      class: {
        "font-bold": true,
        "text-xl": true,
        "text-gray-200": true,
        ...classes,
      },
    },
    text(str),
  );
