import { h } from 'https://unpkg.com/hyperapp';

import Process from './Process.js';
import System from './System.js';

export default ({ processes = [], system }) =>
  h('div', {}, [System(system), ...processes.map(Process)]);
