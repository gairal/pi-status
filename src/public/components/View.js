import { h } from "https://unpkg.com/hyperapp";

import Process from "./Process.js";
import System from "./System/index.js";

export default ({ processes = [], system }) => {
  const procs = processes.reduce(
    (acc, proc) => (proc.name === "status" ? [proc, ...acc] : [...acc, proc]),
    [],
  );

  return h("main", { class: "flex flex-col p-8" }, [
    System(system),
    ...procs.map(Process),
  ]);
};
