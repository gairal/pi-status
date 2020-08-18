import { h } from 'https://unpkg.com/hyperapp';
import H2 from './H2.js';
import Button from './Button.js';

const act = (name, action) => () =>
  fetch(`/processes/${name}/${action}`, { method: 'POST' });

export default ({ name, status }) => {
  const action = status === 'online' ? 'stop' : 'restart';

  return h('div', { class: 'flex justify-between items-start' }, [
    H2(name),
    Button(status, {
      color: status === 'online' ? 'red' : 'green',
      onclick: act(name, action),
    }),
  ]);
};
