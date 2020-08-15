import { h, text } from 'https://unpkg.com/hyperapp';
import H2 from './H2.js';

export default ({ color, name, status }) =>
  h('div', { class: 'flex justify-between items-center' }, [
    H2(name),
    h(
      'span',
      { class: { 'font-bold': true, [`text-${color}-900`]: true } },
      text(status)
    ),
  ]);
