import { ClientEvents, ServerEvents } from "backend/src/events";
import { Socket as S } from "socket.io-client";

export type Socket = S<ServerEvents, ClientEvents>;

export interface AvailableShip {
  name: string;
  length: number;
  placed: boolean;
  orientation: "horizontal" | "vertical";
}
