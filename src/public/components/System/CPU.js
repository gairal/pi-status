import { h } from 'https://unpkg.com/hyperapp';

import { block, systemBlock } from '../utils.js';
import Badge from '../Badge.js';
import H2 from '../H2.js';

export default ({ cpus = [], currentLoad }) =>
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
      ...cpus.map(({ load }, i) =>
        Badge(`${i + 1}: ${load}`, {
          classes: { 'mb-2': true, 'mr-2': true },
          icon: 'microchip',
        })
      ),
    ]
  );
