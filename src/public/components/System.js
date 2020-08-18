import { h } from 'https://unpkg.com/hyperapp';

import { block, line } from './utils.js';
import Badge from './Badge.js';
import H2 from './H2.js';

const separator = h('div', { class: 'p-2' });

const systemBlock = {
  'border-2': true,
  'border-solid': true,
  'border-white': true,
};

const CPU = ({ cpus = [], currentLoad }) =>
  h(
    'div',
    {
      class: {
        ...block,
        ...systemBlock,
      },
    },
    [
      H2(`CPU Load: ${currentLoad || ''}`),
      ...cpus.map(({ load }, i) => Badge(`CPU ${i + 1}: ${load}`)),
    ]
  );

const Memory = ({ memory = {} }) =>
  h(
    'div',
    {
      class: {
        ...block,
        ...systemBlock,
      },
    },
    [
      H2('Memory'),
      Badge(`Total: ${memory.total || ''}`),
      Badge(`Free: ${memory.free || ''}`),
      Badge(`Used: ${memory.used || ''}`),
    ]
  );

export default (system = {}) =>
  h(
    'div',
    { class: { ...line, 'bg-black': true, sticky: true, 'top-0': true } },
    [h('div', { class: 'flex' }, [CPU(system), separator, Memory(system)])]
  );
