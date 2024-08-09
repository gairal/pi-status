import { h, text } from "https://unpkg.com/hyperapp";

export default (percentage, classes = {}) =>
  h(
    "div",
    {
      class: {
        "bg-gray-900": true,
        ...classes,
      },
    },
    [
      h(
        "div",
        {
          class: { "h-full": true, "bg-gray-700": true },
          style: { width: `${percentage}%` },
        },
        [
          h(
            "span",
            {
              class: {
                flex: true,
                "items-center": true,
                "h-full": true,
                "px-2": true,
                "text-xs": true,
              },
            },
            text(`${percentage}%`),
          ),
        ],
      ),
    ],
  );
