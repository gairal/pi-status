import { h, text } from "https://unpkg.com/hyperapp";

export const Button = (str, { color = "blue", onclick, title = "" }) =>
  h(
    "button",
    {
      class: `bg-${color}-500 hover:bg-${color}-700 text-white font-bold py-1 px-2 rounded`,
      onclick,
      title,
    },
    text(str),
  );
