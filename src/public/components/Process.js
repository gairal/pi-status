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

const classes = { 'mr-2': true, 'w-32': true };

export default (props) => {
  const { color, cpu, memory, name, status } = props;

  const isOnline = status === 'online';
  const title = isOnline ? 'stop' : 'restart';
  const onclick = act(name, title);

  const h2 = H2(name, classes);
  const button = Button(status, {
    color: isOnline ? 'red' : 'green',
    onclick,
    title,
  });

  return h(
    'div',
    {
      class: {
        ...block,
        ...line,
        flex: true,
        'h-12': true,
        'items-center': true,
        [`bg-${color}-700`]: true,
      },
    },
    isOnline
      ? [
          h2,
          Progress(cpu, { 'flex-1': true, 'h-full': true }),
          Badge(`${memory}MB`, { icon: 'database', classes }),
          button,
        ]
      : [h2, button]
  );
};
