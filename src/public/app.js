import { h, app } from 'https://unpkg.com/hyperapp';

import Process from './components/Process.js';

const init = [
  // state init
  { processes: [] },
  // effect run at start
  [
    // this is the method run at start
    (dispatch, { onResponse }) => window.socket.on('pm2', pm2 => dispatch(onResponse, pm2)),
    // this is the 2n param passed to the effect
    {
      onResponse: (state, msg) => ({ ...state, processes: [...msg] })
    },
  ]
];
const view = ({ processes }) => h('div', {}, processes.map(Process));

app({ init, node: document.getElementById('app'), view });


