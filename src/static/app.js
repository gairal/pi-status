import { h, text, app } from "https://unpkg.com/hyperapp"

const processHeader = ({ color, name, status }) =>
  h('div', { class: 'flex justify-between items-center' }, [
    h('h2', { class: 'font-bold text-xl mb-2 text-gray-200' }, text(name)),
    h('span', { class: { 'font-bold': true, [`text-${color}-900`]: true, } }, text(status)),
  ]);

const badge = str => h('span', {
  class: 'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2',
}, text(str));

const process = p => {
  const { color, cpu, memory, restarts, uptime } = p;

  return h('div', {
    class: {
      'w-full': true,
      rounded: true,
      'overflow-hidden': true,
      'py-4': true,
      'px-6': true,
      'mb-2': true,
      [`bg-${color}-500`]: true,
    }
  }, [
    processHeader(p),
    badge(cpu),
    badge(memory),
    badge(uptime),
    badge(restarts),
  ])
}

const view = ({ processes }) => h('div', {}, processes.map(process))
app({ init: { processes: window.PROCESSES }, node: document.getElementById('app'), view });
