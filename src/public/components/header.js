import { h, text } from 'https://unpkg.com/hyperapp';

export default ({ color, name, status }) =>
  h('div', { class: 'flex justify-between items-center' }, [
    h('h2', { class: 'font-bold text-xl mb-2 text-gray-200' }, text(name)),
    h('span', { class: { 'font-bold': true, [`text-${color}-900`]: true, } }, text(status)),
  ]);
