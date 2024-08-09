import { type Pm2Data, list } from "../lib/pm2";
import { SocketController } from "./SocketController";

export const pm2 = () => SocketController.create<Pm2Data[]>(list, "pm2");
