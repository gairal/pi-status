import type { Middleware } from "@koa/router";
import type { DefaultState } from "koa";

import { restart, stop } from "../lib/pm2";

export const actions: Middleware<
  DefaultState,
  { params: { action?: "restart" | "stop"; name?: string } }
> = async (ctx) => {
  const { action, name } = ctx.params;

  if (!(action && name)) {
    ctx.status = 401;
    ctx.body = { error: "missing param" };
    return;
  }

  switch (action) {
    case "restart":
      await restart(name);
      break;
    case "stop":
      await stop(name);
      break;
    default:
      break;
  }

  ctx.body = { success: true };
};
