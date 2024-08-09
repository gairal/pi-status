import { h } from "https://unpkg.com/hyperapp";

export default (icon = "question") => h("i", { class: `fa fa-${icon}` });
