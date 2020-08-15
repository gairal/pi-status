import { h } from 'https://unpkg.com/hyperapp';

import Header from './Header.js';
import Badge from './Badge.js';
import { block, line } from './utils.js';

export default (props) => {
  const { color, cpu, memory, restarts, uptime } = props;

  return h(
    'div',
    {
      class: {
        ...block,
        ...line,
        [`bg-${color}-500`]: true,
      },
    },
    [
      Header(props),
      Badge(`cpu: ${cpu}%`),
      Badge(`mem: ${memory}MB`),
      Badge(`uptime: ${uptime}`),
      Badge(`restarts: ${restarts}`),
    ]
  );
};
