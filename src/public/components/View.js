import { h } from 'https://unpkg.com/hyperapp';

import Process from './Process.js';
import System from './System.js';

export default ({ processes = [], system }) =>
  h('main', { class: 'flex flex-col p-8' }, [
    System(system),
    ...processes.map(Process),
  ]);
