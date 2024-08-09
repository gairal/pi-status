import { h } from "https://unpkg.com/hyperapp";

import { H2 } from "../H2.js";
import { Progress } from "../Progress.js";
import { block, systemBlock } from "../utils.js";

export const Cpus = ({ cpus = [], currentLoad }) =>
  h(
    "div",
    {
      class: {
        ...block,
        ...systemBlock,
        "py-1": true,
      },
    },
    [
      H2(`CPU Load: ${currentLoad || ""}%`),
      h(
        "div",
        { class: { flex: true, "flex-wrap": true } },
        cpus.map(({ load }) =>
          Progress(load, {
            "mr-2": true,
            "my-1": true,
            "w-2/12": true,
            "h-8": true,
          }),
        ),
      ),
    ],
  );
