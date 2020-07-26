import { Context } from 'koa';

import { logger } from './config';
import getPM2 from './pm2';

export default async (ctx: Context): Promise<void> => {
  try {
    const pm2 = await getPM2();
    await ctx.render('index.pug', { pm2 });
  } catch (err) {
    logger.log(err);
  }
};
