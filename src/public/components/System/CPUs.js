import { h } from 'https://unpkg.com/hyperapp';

import { block, systemBlock } from '../utils.js';
import H2 from '../H2.js';
import Progress from '../Progress.js';

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
      h(
        'div',
        { class: { flex: true, 'flex-wrap': true } },
        cpus.map(({ load }) =>
          Progress(load, { 'mr-2': true, 'my-1': true, 'w-2/12': true })
        )
      ),
    ]
  );
