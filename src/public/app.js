import { app } from "https://unpkg.com/hyperapp";

import { View } from "./components/View.js";

const init = [
  // state init
  { processes: [], system: {} },
  // effect run at start
  [
    // this is the method run at start
    (dispatch, { onResponse }) =>
      window.socket.on("pm2", (pm2) => dispatch(onResponse, pm2)),
    // this is the 2n param passed to the effect
    { onResponse: (state, msg) => ({ ...state, processes: msg }) },
  ],
  [
    (dispatch, { onResponse }) =>
      window.socket.on("system", (pm2) => dispatch(onResponse, pm2)),
    { onResponse: (state, msg) => ({ ...state, system: msg }) },
  ],
];

app({ init, node: document.getElementById("app"), view: View });
