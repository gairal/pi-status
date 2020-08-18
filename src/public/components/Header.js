import { h } from 'https://unpkg.com/hyperapp';
import H2 from './H2.js';
import Button from './Button.js';

const act = (name, action) => (state) => {
  fetch(`/processes/${name}/${action}`, { method: 'POST' });
  return state;
};

export default ({ name, status }) => {
  const isOnline = status === 'online';
  const action = isOnline ? 'stop' : 'restart';
  const color = isOnline ? 'red' : 'green';

  return h('div', { class: 'flex justify-between items-start' }, [
    H2(name),
    Button(status, { color, onclick: act(name, action), title: action }),
  ]);
};
