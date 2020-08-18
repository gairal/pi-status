import { h } from 'https://unpkg.com/hyperapp';

import { line } from '../utils.js';
import Separator from '../Separator.js';
import CPUs from './CPUs.js';
import Memory from './Memory.js';

export default (system = {}) =>
  h(
    'div',
    { class: { ...line, 'bg-black': true, sticky: true, 'top-0': true } },
    [h('div', { class: 'flex' }, [CPUs(system), Separator(2), Memory(system)])]
  );
