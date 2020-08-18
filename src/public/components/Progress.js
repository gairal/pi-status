import { h, text } from 'https://unpkg.com/hyperapp';

export default (percentage, classes = {}) =>
  h(
    'div',
    {
      class: {
        'bg-gray-900': true,
        ...classes,
      },
    },
    [
      h(
        'span',
        {
          class: {
            block: true,
            'p-2': true,
            'bg-gray-700': true,
            'text-xs': true,
          },
          style: { width: `${percentage}%` },
        },
        text(`${percentage}%`)
      ),
    ]
  );
