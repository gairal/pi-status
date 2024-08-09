import { h } from "https://unpkg.com/hyperapp";

import Badge from "../Badge.js";
import H2 from "../H2.js";
import { block, systemBlock } from "../utils.js";

const MemoryBadge = (str) =>
  Badge(str, { classes: { "mb-2": true, "mr-2": true }, icon: "database" });

export const Memory = ({ memory = {} }) =>
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
      H2("Memory"),
      MemoryBadge(`Total: ${memory.total || ""}`),
      MemoryBadge(`Free: ${memory.free || ""}`),
      MemoryBadge(`Used: ${memory.used || ""}`),
    ],
  );
