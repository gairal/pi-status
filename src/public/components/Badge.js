import { h, text } from 'https://unpkg.com/hyperapp';

export default (str) =>
  h(
    'span',
    {
      class:
        'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2',
    },
    text(str)
  );