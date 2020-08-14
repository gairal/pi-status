import { h } from 'https://unpkg.com/hyperapp';

import Header from './Header.js';
import Badge from './Badge.js';

export default props => {
  const { color, cpu, memory, restarts, uptime } = props;

  return h('div', {
    class: {
      'w-full': true,
      rounded: true,
      'overflow-hidden': true,
      'py-4': true,
      'px-6': true,
      'mb-2': true,
      [`bg-${color}-500`]: true,
    }
  }, [
    Header(props),
    Badge(`cpu: ${cpu}%`),
    Badge(`mem: ${memory}MB`),
    Badge(`uptime: ${uptime}`),
    Badge(`restarts: ${restarts}`),
  ])
}
