import { type System, getSystem } from "../lib/system";
import { SocketController } from "./SocketController";

export const system = () =>
  SocketController.create<System | null>(getSystem, "system");
