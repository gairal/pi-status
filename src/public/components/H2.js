import { h, text } from 'https://unpkg.com/hyperapp';

export default (str) =>
  h('h2', { class: 'font-bold text-xl mb-2 text-gray-200' }, text(str));
