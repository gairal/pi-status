import { h } from 'https://unpkg.com/hyperapp';

import Badge from './Badge.js';
import { block, line } from './utils.js';
import H2 from './H2.js';
import Button from './Button.js';
import Progress from './Progress.js';

const act = (name, action) => (state) => {
  fetch(`/processes/${name}/${action}`, { method: 'POST' });
  return state;
};

export default (props) => {
  const { color, cpu, memory, name, status } = props;

  const isOnline = status === 'online';
  const action = isOnline ? 'stop' : 'restart';

  return h(
    'div',
    {
      class: {
        ...block,
        ...line,
        flex: true,
        'items-center': true,
        [`bg-${color}-700`]: true,
      },
    },
    [
      H2(name, { 'mr-2': true, 'w-32': true }),
      Progress(cpu, { 'flex-1': true }),
      Badge(`${memory}MB`, {
        icon: 'database',
        classes: { 'mr-2': true, 'w-32': true },
      }),
      Button(status, {
        color: isOnline ? 'red' : 'green',
        onclick: act(name, action),
        title: action,
      }),
    ]
  );
};
