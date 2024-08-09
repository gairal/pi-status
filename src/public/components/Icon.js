import { h } from "https://unpkg.com/hyperapp";

export const Icon = (icon = "question") => h("i", { class: `fa fa-${icon}` });
