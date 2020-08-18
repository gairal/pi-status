import { h, text } from 'https://unpkg.com/hyperapp';
import Icon from './Icon.js';
import Separator from './Separator.js';

export default (str, { icon, classes = {} } = {}) =>
  h(
    'div',
    {
      class: {
        'inline-block': true,
        'bg-gray-200': true,
        'rounded-md': true,
        'px-3': true,
        'py-1': true,
        'text-sm': true,
        'font-semibold': true,
        'text-gray-700': true,
        ...classes,
      },
    },
    [
      h('div', { class: 'flex items-center' }, [
        Icon(icon),
        Separator(),
        h('span', {}, text(str)),
      ]),
    ]
  );
