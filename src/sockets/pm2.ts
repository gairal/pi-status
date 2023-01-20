import { list, PM2Data } from "../lib/pm2";
import { SocketController } from "./SocketController";

export const pm2 = () => SocketController.create<PM2Data[]>(list, "pm2");
