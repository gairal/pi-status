import * as Router from "@koa/router";

import { actions } from "./processes";

export const router = new Router().post("/processes/:name/:action", actions);
