import { Context } from 'koa';

// import { restart, stop } from '../lib/pm2';

// enum Action {
//   Start = 'start',
//   Stop = 'stop',
//   Restart = 'strestartart',
// }

export default async (ctx: Context): Promise<void> => {
  const { action, name } = ctx.params;

  if (!action || !name) {
    ctx.status = 401;
    ctx.body = { error: 'missing param' };
    return;
  }

  switch (action) {
    // case Action.Restart:
    //   await restart(name);
    //   break;
    // case Action.Stop:
    //   await stop(name);
    //   break;
    default:
      break;
  }
};
