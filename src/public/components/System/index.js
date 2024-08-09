import { h } from "https://unpkg.com/hyperapp";

import { Separator } from "../Separator.js";
import { line } from "../utils.js";
import { Cpus } from "./CPUs.js";
import { Memory } from "./Memory.js";

export const System = (system = {}) =>
  h(
    "div",
    { class: { ...line, "bg-black": true, sticky: true, "top-0": true } },
    [h("div", { class: "flex" }, [Cpus(system), Separator(2), Memory(system)])],
  );
